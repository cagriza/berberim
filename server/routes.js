import { all, get, run } from "./db.js";

function parseAmount(value) {
  const amount = Number(value);
  return Number.isFinite(amount) && amount >= 0 ? amount : 0;
}

function updateStockStatus(quantity, minimumQuantity) {
  if (quantity <= minimumQuantity) return "critical";
  if (quantity <= minimumQuantity * 1.5) return "low";
  return "safe";
}

function slugPhoneFromName(name) {
  return `demo-${name.toLocaleLowerCase("tr-TR").replace(/[^a-z0-9ığüşöçİĞÜŞÖÇ]+/g, "-")}`;
}

function ensureCustomer(db, fullName) {
  const name = String(fullName || "").trim();
  const phone = slugPhoneFromName(name || "musteri");
  const existing = get(db, "select * from customer_profiles where full_name = ? or phone = ? limit 1", [name, phone]);
  if (existing) return existing;

  const result = run(db, "insert into customer_profiles (full_name, phone, membership_level, membership_status) values (?, ?, ?, ?)", [
    name,
    phone,
    "demo",
    "active",
  ]);
  return get(db, "select * from customer_profiles where id = ?", [result.lastInsertRowid]);
}

function ensureService(db, serviceName, amount = 0) {
  const name = String(serviceName || "").trim();
  const existing = get(db, "select * from services where name = ? limit 1", [name]);
  if (existing) return existing;

  const category = get(db, "select id from service_categories where name = 'Kombin' limit 1");
  const result = run(
    db,
    `insert into services (category_id, name, default_price, duration_minutes, requires_master, requires_care_specialist)
     values (?, ?, ?, ?, ?, ?)`,
    [category?.id || null, name, amount, 60, 1, 0]
  );
  return get(db, "select * from services where id = ?", [result.lastInsertRowid]);
}

function ensureDemoStaff(db, masterType) {
  const roleCode = masterType === "care" ? "care_specialist" : masterType === "owner" ? "owner" : "master";
  const fullName = masterType === "care" ? "Elif Zeren" : masterType === "owner" ? "İsmail Gül" : "Faruk Usta";
  const role = get(db, "select id from roles where code = ? limit 1", [roleCode]);
  let user = get(db, "select * from users where full_name = ? limit 1", [fullName]);

  if (!user) {
    const userResult = run(db, "insert into users (role_id, full_name, status) values (?, ?, ?)", [
      role?.id || 1,
      fullName,
      "active",
    ]);
    user = get(db, "select * from users where id = ?", [userResult.lastInsertRowid]);
  }

  let staff = get(db, "select * from staff_profiles where user_id = ? limit 1", [user.id]);
  if (!staff) {
    const staffResult = run(
      db,
      `insert into staff_profiles
        (user_id, staff_type, shift_label, commission_rate, can_close_payment, can_view_private_finance)
       values (?, ?, ?, ?, ?, ?)`,
      [user.id, roleCode, "Demo vardiya", masterType === "care" ? 40 : 50, 1, masterType === "owner" ? 1 : 0]
    );
    staff = get(db, "select * from staff_profiles where id = ?", [staffResult.lastInsertRowid]);
  }

  return { user, staff };
}

function roleCodeFromStaffRole(role) {
  const normalized = String(role || "").toLocaleLowerCase("tr-TR");
  if (normalized.includes("bakım")) return "care_specialist";
  if (normalized.includes("destek") || normalized.includes("yardım")) return "assistant";
  if (normalized.includes("patron")) return "owner";
  return "master";
}

function staffTypeLabel(type) {
  const labels = {
    owner: "Patron + usta",
    master: "Usta",
    care_specialist: "Bakım uzmanı",
    assistant: "Destek",
  };
  return labels[type] || type || "Usta";
}

export function registerRoutes(app, db) {
  app.get("/api/health", (req, res) => {
    const tableCount = get(db, "select count(*) as count from sqlite_master where type = 'table'");
    res.json({ ok: true, database: "sqlite", tables: tableCount.count });
  });

  app.get("/api/roles", (req, res) => {
    res.json(all(db, "select id, code, name, description from roles order by id"));
  });

  app.get("/api/services", (req, res) => {
    res.json(
      all(
        db,
        `select
          services.id,
          services.name,
          services.default_price as defaultPrice,
          services.duration_minutes as durationMinutes,
          services.requires_master as requiresMaster,
          services.requires_care_specialist as requiresCareSpecialist,
          service_categories.name as category
        from services
        left join service_categories on service_categories.id = services.category_id
        where services.active = 1
        order by services.id`
      )
    );
  });

  app.get("/api/staff", (req, res) => {
    res.json(
      all(
        db,
        `select
          staff_profiles.id,
          users.id as userId,
          users.full_name as name,
          staff_profiles.staff_type as staffType,
          staff_profiles.shift_label as shift,
          staff_profiles.work_status as status,
          staff_profiles.salary_amount as salaryAmount,
          staff_profiles.commission_rate as commissionRate,
          staff_profiles.can_close_payment as canClosePayment,
          staff_profiles.can_view_private_finance as canViewPrivateFinance
        from staff_profiles
        join users on users.id = staff_profiles.user_id
        where users.status = 'active'
        order by staff_profiles.id`
      ).map((staff) => ({
        ...staff,
        role: staffTypeLabel(staff.staffType),
      }))
    );
  });

  app.post("/api/staff", (req, res) => {
    const name = String(req.body.name || "").trim();
    const role = String(req.body.role || "Usta").trim();
    const shift = String(req.body.shift || "").trim();
    const status = String(req.body.status || "Aktif").trim();
    const staffType = roleCodeFromStaffRole(role);
    const roleRow = get(db, "select * from roles where code = ? limit 1", [staffType === "care_specialist" ? "care_specialist" : staffType]);

    if (!name || !shift) {
      res.status(400).json({ error: "Çalışan adı ve vardiya zorunlu." });
      return;
    }

    const email = `${slugPhoneFromName(name)}-${Date.now()}@berberim.local`;
    db.exec("begin");
    try {
      const userResult = run(db, "insert into users (role_id, full_name, email, status) values (?, ?, ?, ?)", [
        roleRow?.id || 3,
        name,
        email,
        "active",
      ]);
      const staffResult = run(
        db,
        `insert into staff_profiles
          (user_id, staff_type, shift_label, work_status, commission_rate, can_close_payment, can_view_private_finance)
         values (?, ?, ?, ?, ?, ?, ?)`,
        [
          userResult.lastInsertRowid,
          staffType,
          shift,
          status,
          staffType === "care_specialist" ? 40 : staffType === "assistant" ? 0 : 50,
          staffType === "assistant" ? 0 : 1,
          staffType === "owner" ? 1 : 0,
        ]
      );
      db.exec("commit");

      res.status(201).json({
        id: staffResult.lastInsertRowid,
        userId: userResult.lastInsertRowid,
        name,
        role: staffTypeLabel(staffType),
        staffType,
        shift,
        status,
      });
    } catch (error) {
      db.exec("rollback");
      throw error;
    }
  });

  app.delete("/api/staff/:id", (req, res) => {
    const staff = get(db, "select * from staff_profiles where id = ?", [Number(req.params.id)]);
    if (!staff) {
      res.status(404).json({ error: "Çalışan bulunamadı." });
      return;
    }

    run(db, "update users set status = 'inactive', updated_at = datetime('now') where id = ?", [staff.user_id]);
    run(db, "update staff_profiles set work_status = 'İzinli', updated_at = datetime('now') where id = ?", [staff.id]);
    res.json({ ok: true, id: staff.id });
  });

  app.get("/api/special-prices", (req, res) => {
    res.json(
      all(
        db,
        `select
          customer_special_prices.id,
          customer_profiles.full_name as customerName,
          services.name as serviceName,
          customer_special_prices.special_price as amount,
          customer_special_prices.note
        from customer_special_prices
        join customer_profiles on customer_profiles.id = customer_special_prices.customer_id
        join services on services.id = customer_special_prices.service_id
        where customer_special_prices.active = 1
        order by customer_special_prices.id desc`
      )
    );
  });

  app.post("/api/special-prices", (req, res) => {
    const customerName = String(req.body.customerName || "").trim();
    const serviceName = String(req.body.serviceName || "").trim();
    const amount = parseAmount(req.body.amount);
    const note = String(req.body.note || "").trim();

    if (!customerName || !serviceName || amount <= 0) {
      res.status(400).json({ error: "Müşteri, hizmet ve tutar zorunlu." });
      return;
    }

    const customer = ensureCustomer(db, customerName);
    const service = ensureService(db, serviceName, amount);
    run(
      db,
      `insert into customer_special_prices (customer_id, service_id, special_price, note)
       values (?, ?, ?, ?)
       on conflict(customer_id, service_id)
       do update set special_price = excluded.special_price, note = excluded.note, active = 1, updated_at = datetime('now')`,
      [customer.id, service.id, amount, note]
    );

    const specialPrice = get(
      db,
      `select
        customer_special_prices.id,
        customer_profiles.full_name as customerName,
        services.name as serviceName,
        customer_special_prices.special_price as amount,
        customer_special_prices.note
      from customer_special_prices
      join customer_profiles on customer_profiles.id = customer_special_prices.customer_id
      join services on services.id = customer_special_prices.service_id
      where customer_special_prices.customer_id = ? and customer_special_prices.service_id = ?`,
      [customer.id, service.id]
    );
    res.status(201).json(specialPrice);
  });

  app.delete("/api/special-prices/:id", (req, res) => {
    const price = get(db, "select * from customer_special_prices where id = ? and active = 1", [Number(req.params.id)]);
    if (!price) {
      res.status(404).json({ error: "Özel fiyat bulunamadı." });
      return;
    }
    run(db, "update customer_special_prices set active = 0, updated_at = datetime('now') where id = ?", [price.id]);
    res.json({ ok: true, id: price.id });
  });

  app.post("/api/payments/checkout", (req, res) => {
    const customerName = String(req.body.customerName || "").trim();
    const serviceName = String(req.body.serviceName || "").trim();
    const paymentType = String(req.body.paymentType || "Nakit").trim();
    const masterType = String(req.body.masterType || "employee");
    const amount = parseAmount(req.body.amount);

    if (!customerName || !serviceName || amount <= 0) {
      res.status(400).json({ error: "Müşteri, hizmet ve tahsilat tutarı zorunlu." });
      return;
    }

    const customer = ensureCustomer(db, customerName);
    const service = ensureService(db, serviceName, amount);
    const staffContext = ensureDemoStaff(db, masterType);
    const staffShare = masterType === "owner" ? 0 : masterType === "care" ? Math.round(amount * 0.4) : Math.round(amount / 2);
    const businessShare = amount - staffShare;

    db.exec("begin");
    try {
      const sessionResult = run(
        db,
        `insert into service_sessions
          (customer_id, primary_staff_id, status, ended_at, total_amount, note)
         values (?, ?, ?, datetime('now'), ?, ?)`,
        [customer.id, staffContext.staff.id, "completed", amount, "Demo ödeme kapatma"]
      );
      const sessionId = sessionResult.lastInsertRowid;
      run(
        db,
        `insert into service_session_items (session_id, service_id, quantity, unit_price, line_total)
         values (?, ?, ?, ?, ?)`,
        [sessionId, service.id, 1, amount, amount]
      );
      const paymentResult = run(
        db,
        `insert into payments (session_id, collected_by, payment_type, amount, manual_amount, note)
         values (?, ?, ?, ?, ?, ?)`,
        [sessionId, staffContext.user.id, paymentType, amount, 1, "Demo ödeme"]
      );
      run(
        db,
        `insert into staff_earnings (staff_id, session_id, payment_id, gross_amount, staff_share, business_share)
         values (?, ?, ?, ?, ?, ?)`,
        [staffContext.staff.id, sessionId, paymentResult.lastInsertRowid, amount, staffShare, businessShare]
      );
      run(
        db,
        `insert into cash_movements (payment_id, movement_type, amount, payment_type, note, created_by)
         values (?, ?, ?, ?, ?, ?)`,
        [paymentResult.lastInsertRowid, "income", amount, paymentType, "Ödeme kapatma", staffContext.user.id]
      );
      db.exec("commit");

      res.status(201).json({
        sessionId,
        paymentId: paymentResult.lastInsertRowid,
        amount,
        paymentType,
        staffShare,
        businessShare,
      });
    } catch (error) {
      db.exec("rollback");
      throw error;
    }
  });

  app.get("/api/stock", (req, res) => {
    res.json(
      all(
        db,
        `select id, name, quantity, unit, minimum_quantity as minimumQuantity, status
         from stock_items
         where active = 1
         order by name`
      )
    );
  });

  app.post("/api/stock", (req, res) => {
    const name = String(req.body.name || "").trim();
    const unit = String(req.body.unit || "adet").trim();
    const quantity = parseAmount(req.body.quantity);
    const minimumQuantity = parseAmount(req.body.minimumQuantity);

    if (!name) {
      res.status(400).json({ error: "Malzeme adı zorunlu." });
      return;
    }

    const status = updateStockStatus(quantity, minimumQuantity);
    const result = run(
      db,
      `insert into stock_items (name, quantity, unit, minimum_quantity, status)
       values (?, ?, ?, ?, ?)`,
      [name, quantity, unit, minimumQuantity, status]
    );

    res.status(201).json({ id: result.lastInsertRowid, name, quantity, unit, minimumQuantity, status });
  });

  app.post("/api/stock/:id/movements", (req, res) => {
    const stockItem = get(db, "select * from stock_items where id = ? and active = 1", [Number(req.params.id)]);
    if (!stockItem) {
      res.status(404).json({ error: "Malzeme bulunamadı." });
      return;
    }

    const movementType = req.body.movementType === "in" ? "in" : "out";
    const quantity = parseAmount(req.body.quantity);
    const note = String(req.body.note || "").trim();

    if (quantity <= 0) {
      res.status(400).json({ error: "Hareket miktarı sıfırdan büyük olmalı." });
      return;
    }

    const nextQuantity =
      movementType === "in" ? Number(stockItem.quantity) + quantity : Math.max(Number(stockItem.quantity) - quantity, 0);
    const status = updateStockStatus(nextQuantity, Number(stockItem.minimum_quantity));

    db.exec("begin");
    try {
      run(db, "insert into stock_movements (stock_item_id, movement_type, quantity, note) values (?, ?, ?, ?)", [
        stockItem.id,
        movementType,
        quantity,
        note,
      ]);
      run(db, "update stock_items set quantity = ?, status = ?, updated_at = datetime('now') where id = ?", [
        nextQuantity,
        status,
        stockItem.id,
      ]);
      db.exec("commit");
    } catch (error) {
      db.exec("rollback");
      throw error;
    }

    res.json({ id: stockItem.id, name: stockItem.name, quantity: nextQuantity, unit: stockItem.unit, status });
  });

  app.delete("/api/stock/:id", (req, res) => {
    const stockItem = get(db, "select * from stock_items where id = ? and active = 1", [Number(req.params.id)]);
    if (!stockItem) {
      res.status(404).json({ error: "Malzeme bulunamadı." });
      return;
    }

    run(db, "update stock_items set active = 0, updated_at = datetime('now') where id = ?", [stockItem.id]);
    res.json({ ok: true, id: stockItem.id });
  });

  app.get("/api/stock-movements", (req, res) => {
    res.json(
      all(
        db,
        `select
          stock_movements.id,
          stock_items.name,
          stock_movements.movement_type as movementType,
          stock_movements.quantity,
          stock_movements.note,
          stock_movements.created_at as createdAt
        from stock_movements
        join stock_items on stock_items.id = stock_movements.stock_item_id
        order by stock_movements.id desc
        limit 50`
      )
    );
  });

  app.get("/api/cash/summary", (req, res) => {
    const summary = get(
      db,
      `select
        coalesce(sum(amount), 0) as totalAmount,
        count(*) as paymentCount
       from payments`
    );
    res.json(summary);
  });
}
