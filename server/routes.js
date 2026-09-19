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
