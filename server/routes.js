import { createHash, randomBytes } from "node:crypto";
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

function statusLabel(status, inviteCode) {
  const labels = {
    active: "Onaylandı",
    invited: "Davet kodlu",
    review: "İnceleme",
    hold: "Beklemeye alındı",
    candidate: "Ön inceleme",
  };
  if (inviteCode && status === "candidate") return "Davet kodlu";
  return labels[status] || "Ön inceleme";
}

function parseCustomerNotes(notes) {
  if (!notes) return {};
  try {
    const parsed = JSON.parse(notes);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return { note: String(notes) };
  }
}

function customerApplicationFromRow(row) {
  const notes = parseCustomerNotes(row.privateNotes);
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    intent: notes.intent || "Bakım başvurusu",
    note: notes.note || "",
    code: row.inviteCode || "",
    statusCode: row.statusCode,
    status: statusLabel(row.statusCode, row.inviteCode),
    createdAt: row.createdAt,
  };
}

function customerPayloadFromRow(row) {
  const notes = parseCustomerNotes(row.privateNotes);
  return {
    id: row.id,
    userId: row.userId || null,
    name: row.customerName,
    phone: row.phone || "",
    membershipLevel: row.membershipLevel || "candidate",
    membershipStatus: row.membershipStatus || "candidate",
    inviteCode: row.inviteCode || "",
    intent: notes.intent || "",
    note: notes.note || "",
    createdAt: row.createdAt,
  };
}

function statusText(status) {
  const labels = {
    open: "içeride",
    in_progress: "içeride",
    planned: "bekliyor",
    completed: "tamamlandı",
    cancelled: "iptal",
    no_show: "gelmedi",
    reschedule: "yeniden planlanacak",
  };
  return labels[status] || "takipte";
}

function addServiceBreakdown(summary, serviceName, quantity = 1) {
  const name = String(serviceName || "").toLocaleLowerCase("tr-TR");
  const count = Number(quantity || 1);
  if (name.includes("imza") || name.includes("saç") || name.includes("private") || name.includes("atelier")) summary.haircut += count;
  if (name.includes("sakal") || name.includes("private") || name.includes("atelier")) summary.beard += count;
  if (name.includes("manikür") || name.includes("el & ayak") || name.includes("private") || name.includes("atelier")) summary.manicure += count;
  if (name.includes("pedikür") || name.includes("el & ayak") || name.includes("private")) summary.pedicure += count;
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

function ensureCustomerByPhone(db, fullName, phone, options = {}) {
  const name = String(fullName || "").trim();
  const normalizedPhone = String(phone || slugPhoneFromName(name || "musteri")).trim();
  const existing = get(db, "select * from customer_profiles where phone = ? order by id desc limit 1", [normalizedPhone]);
  if (existing) return existing;

  const result = run(
    db,
    `insert into customer_profiles (full_name, phone, membership_level, membership_status, invite_code, private_notes)
     values (?, ?, ?, ?, ?, ?)`,
    [
      name,
      normalizedPhone,
      options.membershipLevel || "atelier",
      options.membershipStatus || "active",
      options.inviteCode || null,
      options.privateNotes || null,
    ]
  );
  return get(db, "select * from customer_profiles where id = ?", [result.lastInsertRowid]);
}

const priceServiceMap = {
  haircut: "İmza kesim",
  beard: "Sakal tasarım",
  manicure: "Manikür",
  pedicure: "Pedikür",
  atelier: "Atelier Kombin",
  handsFeet: "El & Ayak Bakımı",
  privateDay: "Private Tam Gün",
};

function priceKeyFromServiceName(name) {
  return Object.entries(priceServiceMap).find(([, serviceName]) => serviceName === name)?.[0] || null;
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

function demoRoleFromRoleCode(roleCode) {
  if (roleCode === "owner" || roleCode === "admin" || roleCode === "customer") return roleCode;
  return "master";
}

function roleNameFromRoleCode(roleCode, fallback) {
  const labels = {
    owner: "Patron",
    admin: "Admin",
    master: "Usta",
    care_specialist: "Bakım uzmanı",
    assistant: "Yardımcı personel",
    customer: "Müşteri",
  };
  return labels[roleCode] || fallback || "Kullanıcı";
}

function accessNoteFromRoleCode(roleCode) {
  const notes = {
    owner: "Tüm kasa, personel hesabı ve mahrem müşteri bilgileri açık.",
    admin: "Operasyon, üyelik ve ayar ekranları açık; patron net kasası kapalı.",
    master: "Kendi seansı, ödeme kapatma ve kendi hak ediş özeti açık.",
    care_specialist: "El-ayak bakım seansları, ödeme kapatma ve kendi hak ediş özeti açık.",
    assistant: "Destek ve operasyon akışı açık; maaş, borç ve patron kasası kapalı.",
    customer: "Sadece kendi üyelik, bakım ve seans bilgileri açık.",
  };
  return notes[roleCode] || "Rolüne uygun ekranlar açık.";
}

function demoUserPayload(user) {
  return {
    id: String(user.id),
    name: user.name,
    roleCode: user.roleCode,
    roleName: roleNameFromRoleCode(user.roleCode, user.roleName),
    demoRole: demoRoleFromRoleCode(user.roleCode),
    accessNote: accessNoteFromRoleCode(user.roleCode),
  };
}

function hashDemoPin(pin) {
  return `demo-pin:${createHash("sha256").update(String(pin || "")).digest("hex")}`;
}

function verifyDemoPin(pin, storedHash) {
  return Boolean(storedHash && storedHash === hashDemoPin(pin));
}

function createSession(db, user) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString();
  const payload = {
    token,
    user: demoUserPayload(user),
    signedAt: new Date().toISOString(),
    expiresAt,
  };
  run(db, "insert into user_sessions (token, user_id, expires_at) values (?, ?, ?)", [token, user.id, expiresAt]);
  return payload;
}

function readBearerToken(req) {
  const header = String(req.headers.authorization || "");
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : "";
}

function sessionFromRequest(req) {
  const token = readBearerToken(req);
  if (!token) return null;
  const session = get(
    req.app.locals.db,
    `select
      user_sessions.token,
      user_sessions.created_at as signedAt,
      user_sessions.expires_at as expiresAt,
      users.id,
      users.full_name as name,
      roles.code as roleCode,
      roles.name as roleName
    from user_sessions
    join users on users.id = user_sessions.user_id
    join roles on roles.id = users.role_id
    where user_sessions.token = ?
      and user_sessions.revoked_at is null
      and user_sessions.expires_at > datetime('now')
      and users.status = 'active'
    limit 1`,
    [token]
  );
  if (!session) return null;
  return {
    token: session.token,
    user: demoUserPayload(session),
    signedAt: session.signedAt,
    expiresAt: session.expiresAt,
  };
}

function requireRoles(req, res, roles) {
  const session = sessionFromRequest(req);
  if (!session) {
    res.status(401).json({ error: "Oturum gerekli." });
    return null;
  }

  if (!roles.includes(session.user.roleCode)) {
    res.status(403).json({ error: "Bu ekran için yetkin yok." });
    return null;
  }

  return session;
}

function sessionScope(session) {
  if (!session) return { where: "", params: [], role: null };
  const role = session.user.roleCode;
  if (role === "owner" || role === "admin") return { where: "", params: [], role };
  if (role === "master" || role === "care_specialist" || role === "assistant") {
    return { where: " and users.id = ?", params: [Number(session.user.id)], role };
  }
  if (role === "customer") {
    return { where: " and customer_profiles.user_id = ?", params: [Number(session.user.id)], role };
  }
  return { where: " and 1 = 0", params: [], role };
}

function customerScope(session) {
  if (!session) return { where: "", params: [], role: null };
  const role = session.user.roleCode;
  if (role === "owner" || role === "admin" || role === "master" || role === "care_specialist" || role === "assistant") {
    return { where: "", params: [], role };
  }
  if (role === "customer") {
    return { where: " where customer_profiles.user_id = ?", params: [Number(session.user.id)], role };
  }
  return { where: " where 1 = 0", params: [], role };
}

function calendarDateParts(date) {
  const parts = new Intl.DateTimeFormat("tr-TR", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const part = (type) => parts.find((item) => item.type === type)?.value || "";
  return {
    label: new Intl.DateTimeFormat("tr-TR", { timeZone: "Europe/Istanbul", weekday: "short" }).format(date),
    date: new Intl.DateTimeFormat("tr-TR", { timeZone: "Europe/Istanbul", day: "numeric", month: "short" }).format(date),
    key: `${part("year")}-${part("month")}-${part("day")}`,
  };
}

function parseSessionDate(value) {
  if (!value) return null;
  const normalized = String(value).replace(" ", "T");
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatSessionTime(value) {
  if (!value) return "Saat yok";
  const match = String(value).match(/\b(\d{2}:\d{2})/);
  return match ? match[1] : value;
}

function sessionDateKey(value) {
  return String(value || "").slice(0, 10);
}

export function registerRoutes(app, db) {
  app.locals.db = db;

  app.get("/api/health", (req, res) => {
    const tableCount = get(db, "select count(*) as count from sqlite_master where type = 'table'");
    res.json({ ok: true, database: "sqlite", tables: tableCount.count });
  });

  app.get("/api/roles", (req, res) => {
    res.json(all(db, "select id, code, name, description from roles order by id"));
  });

  app.get("/api/demo-users", (req, res) => {
    const users = all(
      db,
      `select
        users.id,
        users.full_name as name,
        roles.code as roleCode,
        roles.name as roleName
      from users
      join roles on roles.id = users.role_id
      where users.status = 'active'
      order by
        case roles.code
          when 'owner' then 1
          when 'admin' then 2
          when 'master' then 3
          when 'care_specialist' then 4
          when 'assistant' then 5
          else 6
        end,
        users.full_name`
    ).map(demoUserPayload);

    res.json(users);
  });

  app.post("/api/auth/pin-login", (req, res) => {
    const userId = Number(req.body?.userId || 0);
    const pin = String(req.body?.pin || "").trim();
    const user = get(
      db,
      `select
        users.id,
        users.full_name as name,
        users.password_hash as passwordHash,
        roles.code as roleCode,
        roles.name as roleName
      from users
      join roles on roles.id = users.role_id
      where users.id = ? and users.status = 'active'
      limit 1`,
      [userId]
    );

    if (!user) {
      res.status(404).json({ error: "Aktif kullanıcı bulunamadı." });
      return;
    }

    if (!verifyDemoPin(pin, user.passwordHash)) {
      res.status(401).json({ error: "PIN hatalı." });
      return;
    }

    res.json({ ok: true, ...createSession(db, user) });
  });

  app.get("/api/auth/session", (req, res) => {
    const session = sessionFromRequest(req);
    if (!session) {
      res.status(401).json({ error: "Oturum bulunamadı." });
      return;
    }

    res.json({ ok: true, ...session });
  });

  app.post("/api/auth/logout", (req, res) => {
    const token = readBearerToken(req);
    if (token) {
      run(db, "update user_sessions set revoked_at = datetime('now') where token = ?", [token]);
    }
    res.json({ ok: true });
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

  app.get("/api/service-prices", (req, res) => {
    const rows = all(db, "select name, default_price as defaultPrice from services where active = 1 order by id");
    const prices = {};

    rows.forEach((row) => {
      const key = priceKeyFromServiceName(row.name);
      if (key) prices[key] = Number(row.defaultPrice || 0);
    });

    res.json(prices);
  });

  app.put("/api/service-prices", (req, res) => {
    if (!requireRoles(req, res, ["owner", "admin"])) return;

    const prices = req.body || {};

    db.exec("begin");
    try {
      Object.entries(priceServiceMap).forEach(([key, serviceName]) => {
        if (!Object.hasOwn(prices, key)) return;
        const amount = parseAmount(prices[key]);
        run(db, "update services set default_price = ?, updated_at = datetime('now') where name = ?", [amount, serviceName]);
      });
      db.exec("commit");
    } catch (error) {
      db.exec("rollback");
      throw error;
    }

    const rows = all(db, "select name, default_price as defaultPrice from services where active = 1 order by id");
    const updatedPrices = {};
    rows.forEach((row) => {
      const key = priceKeyFromServiceName(row.name);
      if (key) updatedPrices[key] = Number(row.defaultPrice || 0);
    });
    res.json(updatedPrices);
  });

  app.get("/api/services/breakdown", (req, res) => {
    const rows = all(
      db,
      `select
        services.name,
        coalesce(sum(service_session_items.quantity), 0) as quantity
      from service_session_items
      join services on services.id = service_session_items.service_id
      join service_sessions on service_sessions.id = service_session_items.session_id
      where service_sessions.status in ('open', 'planned', 'completed')
      group by services.id, services.name`
    );
    const summary = {
      haircut: 0,
      beard: 0,
      manicure: 0,
      pedicure: 0,
    };
    rows.forEach((row) => addServiceBreakdown(summary, row.name, row.quantity));
    res.json(summary);
  });

  app.get("/api/applications", (req, res) => {
    res.json(
      all(
        db,
        `select
          id,
          full_name as name,
          phone,
          membership_status as statusCode,
          invite_code as inviteCode,
          private_notes as privateNotes,
          created_at as createdAt
        from customer_profiles
        where membership_status in ('candidate', 'review', 'invited', 'hold', 'active')
          and id in (
            select max(id)
            from customer_profiles
            where membership_status in ('candidate', 'review', 'invited', 'hold', 'active')
            group by phone
          )
        order by
          case membership_status
            when 'review' then 1
            when 'invited' then 2
            when 'candidate' then 3
            when 'hold' then 4
            when 'active' then 5
            else 6
          end,
          id desc`
      ).map(customerApplicationFromRow)
    );
  });

  app.post("/api/applications", (req, res) => {
    const name = String(req.body.name || "").trim();
    const phone = String(req.body.phone || "").trim();
    const intent = String(req.body.intent || "Bakım başvurusu").trim();
    const note = String(req.body.note || "").trim();
    const code = String(req.body.code || "").trim();

    if (!name || !phone) {
      res.status(400).json({ error: "Ad soyad ve telefon zorunlu." });
      return;
    }

    const status = code ? "invited" : "review";
    const notes = JSON.stringify({ intent, note });
    const existing = get(db, "select * from customer_profiles where phone = ? order by id desc limit 1", [phone]);

    if (existing) {
      run(
        db,
        `update customer_profiles
         set full_name = ?,
           membership_status = ?,
           invite_code = ?,
           private_notes = ?,
           updated_at = datetime('now')
         where id = ?`,
        [name, status, code || null, notes, existing.id]
      );
    } else {
      run(
        db,
        `insert into customer_profiles (full_name, phone, membership_level, membership_status, invite_code, private_notes)
         values (?, ?, ?, ?, ?, ?)`,
        [name, phone, "candidate", status, code || null, notes]
      );
    }

    const application = get(
      db,
      `select
        id,
        full_name as name,
        phone,
        membership_status as statusCode,
        invite_code as inviteCode,
        private_notes as privateNotes,
        created_at as createdAt
      from customer_profiles
      where phone = ?
      limit 1`,
      [phone]
    );
    res.status(201).json(customerApplicationFromRow(application));
  });

  app.patch("/api/applications/:id/status", (req, res) => {
    const id = Number(req.params.id);
    const status = String(req.body.status || "").trim();
    const allowedStatuses = new Set(["active", "hold", "review", "invited", "candidate"]);

    if (!allowedStatuses.has(status)) {
      res.status(400).json({ error: "Geçerli başvuru durumu zorunlu." });
      return;
    }

    const customer = get(db, "select * from customer_profiles where id = ?", [id]);
    if (!customer) {
      res.status(404).json({ error: "Başvuru bulunamadı." });
      return;
    }

    run(
      db,
      `update customer_profiles
       set membership_status = ?, membership_level = ?, updated_at = datetime('now')
       where id = ?`,
      [status, status === "active" ? "atelier" : "candidate", id]
    );

    const application = get(
      db,
      `select
        id,
        full_name as name,
        phone,
        membership_status as statusCode,
        invite_code as inviteCode,
        private_notes as privateNotes,
        created_at as createdAt
      from customer_profiles
      where id = ?`,
      [id]
    );
    res.json(customerApplicationFromRow(application));
  });

  app.get("/api/customers", (req, res) => {
    if (!requireRoles(req, res, ["owner", "admin"])) return;

    res.json(
      all(
        db,
        `select
          id,
          user_id as userId,
          full_name as customerName,
          phone,
          membership_level as membershipLevel,
          membership_status as membershipStatus,
          invite_code as inviteCode,
          private_notes as privateNotes,
          created_at as createdAt
        from customer_profiles
        order by
          case membership_status
            when 'active' then 1
            when 'invited' then 2
            when 'review' then 3
            when 'candidate' then 4
            when 'hold' then 5
            else 6
          end,
          full_name`
      ).map(customerPayloadFromRow)
    );
  });

  app.put("/api/customers/:id", (req, res) => {
    if (!requireRoles(req, res, ["owner", "admin"])) return;

    const id = Number(req.params.id);
    const existing = get(db, "select * from customer_profiles where id = ?", [id]);
    if (!existing) {
      res.status(404).json({ error: "Müşteri bulunamadı." });
      return;
    }

    const name = String(req.body.name || "").trim();
    const phone = String(req.body.phone || "").trim();
    const membershipLevel = String(req.body.membershipLevel || "candidate").trim();
    const membershipStatus = String(req.body.membershipStatus || "candidate").trim();
    const intent = String(req.body.intent || "").trim();
    const note = String(req.body.note || "").trim();
    const inviteCode = String(req.body.inviteCode || "").trim();

    if (!name || !phone) {
      res.status(400).json({ error: "Müşteri adı ve telefon zorunlu." });
      return;
    }

    run(
      db,
      `update customer_profiles
       set full_name = ?,
           phone = ?,
           membership_level = ?,
           membership_status = ?,
           invite_code = ?,
           private_notes = ?,
           updated_at = datetime('now')
       where id = ?`,
      [name, phone, membershipLevel, membershipStatus, inviteCode || null, JSON.stringify({ intent, note }), id]
    );

    const customer = get(
      db,
      `select
        id,
        user_id as userId,
        full_name as customerName,
        phone,
        membership_level as membershipLevel,
        membership_status as membershipStatus,
        invite_code as inviteCode,
        private_notes as privateNotes,
        created_at as createdAt
      from customer_profiles
      where id = ?`,
      [id]
    );
    res.json(customerPayloadFromRow(customer));
  });

  app.get("/api/sessions/upcoming", (req, res) => {
    const session = sessionFromRequest(req);
    const scope = sessionScope(session);
    res.json(
      all(
        db,
        `select
          service_sessions.id,
          service_sessions.starts_at as startsAt,
          service_sessions.status,
          service_sessions.total_amount as totalAmount,
          customer_profiles.full_name as customerName,
          coalesce(group_concat(services.name, ' + '), service_sessions.note) as serviceSummary
        from service_sessions
        join customer_profiles on customer_profiles.id = service_sessions.customer_id
        left join service_session_items on service_session_items.session_id = service_sessions.id
        left join services on services.id = service_session_items.service_id
        left join staff_profiles on staff_profiles.id = service_sessions.primary_staff_id
        left join users on users.id = staff_profiles.user_id
        where service_sessions.status in ('planned', 'open')${scope.where}
        group by service_sessions.id
        order by service_sessions.starts_at is null, service_sessions.starts_at, service_sessions.id
        limit 12`,
        scope.params
      )
    );
  });

  app.get("/api/calendar/week", (req, res) => {
    const session = sessionFromRequest(req);
    const scope = sessionScope(session);
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return { ...calendarDateParts(date), items: [] };
    });
    const byKey = new Map(days.map((day) => [day.key, day]));

    const sessionRows = all(
      db,
      `select
        service_sessions.id,
        service_sessions.starts_at as startsAt,
        service_sessions.status,
        customer_profiles.full_name as customerName,
        users.full_name as staffName,
        roles.code as roleCode,
        coalesce(group_concat(services.name, ' + '), service_sessions.note) as serviceSummary
      from service_sessions
      join customer_profiles on customer_profiles.id = service_sessions.customer_id
      left join staff_profiles on staff_profiles.id = service_sessions.primary_staff_id
      left join users on users.id = staff_profiles.user_id
      left join roles on roles.id = users.role_id
      left join service_session_items on service_session_items.session_id = service_sessions.id
      left join services on services.id = service_session_items.service_id
      where service_sessions.status in ('planned', 'open', 'in_progress', 'completed')${scope.where}
      group by service_sessions.id
      order by service_sessions.starts_at is null, service_sessions.starts_at, service_sessions.id
      limit 40`,
      scope.params
    );

    sessionRows.forEach((row) => {
      const key = sessionDateKey(row.startsAt);
      const targetDay = byKey.get(key) || days[days.length - 1];
      targetDay.items.push({
        time: formatSessionTime(row.startsAt),
        title: row.customerName,
        subtitle: row.serviceSummary || "Bakım seansı",
        meta: `${row.staffName || "Usta atanmadı"} · ${statusText(row.status)}`,
        kind: "session",
      });
    });

    const occupiedSlots = new Set(sessionRows.map((row) => `${sessionDateKey(row.startsAt)} ${formatSessionTime(row.startsAt)}`));
    const privateBlocks =
      scope.role === "customer"
        ? []
        : [
      { dayIndex: 1, time: "16:00", title: "Private blok", subtitle: "İsmail Gül", meta: "Müşteriye kapalı", kind: "private" },
      { dayIndex: 6, time: "Kapalı", title: "Korunan saat", subtitle: "Private üyeler", meta: "Genel görünmez", kind: "private" },
    ];
    const openSlots = [
      { dayIndex: 2, label: days[2]?.label || "Çar", time: "14:00", service: "El ve ayak bakımı", note: "Bakım uzmanı uygun" },
      { dayIndex: 5, label: days[5]?.label || "Cum", time: "19:30", service: "Saç + manikür + pedikür", note: "Atelier üyeye açıldı" },
      { dayIndex: 6, label: days[6]?.label || "Cmt", time: "11:00", service: "Pedikür kontrolü", note: "Onay bekliyor" },
    ].filter((slot) => !occupiedSlots.has(`${days[slot.dayIndex]?.key} ${slot.time}`));

    privateBlocks.forEach((block) => {
      days[block.dayIndex]?.items.push(block);
    });
    openSlots.forEach((slot) => {
      days[slot.dayIndex]?.items.push({
        time: slot.time,
        title: "Açılabilir slot",
        subtitle: slot.service,
        meta: slot.note,
        kind: "open",
      });
    });

    res.json({
      summary: {
        plannedSessions: sessionRows.length,
        privateBlocks: privateBlocks.length,
        openSlots: openSlots.length,
      },
      days,
      openSlots: openSlots.map(({ label, time, service, note }) => ({ label, time, service, note })),
    });
  });

  app.get("/api/member-cards/today", (req, res) => {
    const session = sessionFromRequest(req);
    const scope = sessionScope(session);
    const sessionRows = all(
      db,
      `select
        service_sessions.id,
        service_sessions.status,
        service_sessions.note as sessionNote,
        customer_profiles.full_name as customerName,
        customer_profiles.membership_level as membershipLevel,
        customer_profiles.private_notes as privateNotes,
        coalesce(group_concat(services.name, ' + '), service_sessions.note) as serviceSummary,
        payments.payment_type as paymentType
      from service_sessions
      join customer_profiles on customer_profiles.id = service_sessions.customer_id
      left join service_session_items on service_session_items.session_id = service_sessions.id
      left join services on services.id = service_session_items.service_id
      left join payments on payments.session_id = service_sessions.id
      left join staff_profiles on staff_profiles.id = service_sessions.primary_staff_id
      left join users on users.id = staff_profiles.user_id
      where 1 = 1${scope.where}
      group by service_sessions.id
      order by service_sessions.id desc
      limit 8`,
      scope.params
    );

    if (sessionRows.length) {
      res.json(
        sessionRows.map((row) => {
          const notes = parseCustomerNotes(row.privateNotes);
          return {
            id: row.id,
            customerName: row.customerName,
            membershipLevel: row.membershipLevel || "atelier",
            status: statusText(row.status),
            serviceSummary: row.serviceSummary || "Bakım seansı",
            note:
              row.paymentType && row.status === "completed"
                ? `Tahsilat: ${row.paymentType.toLocaleLowerCase("tr-TR")} ile kapandı`
                : notes.note || row.sessionNote || "Özel not yok",
          };
        })
      );
      return;
    }

    const customerProfileScope = customerScope(session);
    res.json(
      all(
        db,
        `select
          id,
          full_name as customerName,
          membership_level as membershipLevel,
          membership_status as membershipStatus,
          private_notes as privateNotes
        from customer_profiles
        ${customerProfileScope.where}
        order by id desc
        limit 5`,
        customerProfileScope.params
      ).map((row) => {
        const notes = parseCustomerNotes(row.privateNotes);
        return {
          id: row.id,
          customerName: row.customerName,
          membershipLevel: row.membershipLevel || "candidate",
          status: row.membershipStatus === "active" ? "bekliyor" : "aday",
          serviceSummary: notes.intent || "Bakım başvurusu",
          note: notes.note || "Özel not yok",
        };
      })
    );
  });

  app.post("/api/sessions/open-demo", (req, res) => {
    const customer = ensureCustomerByPhone(db, "Çağrı Z.", "demo-cagri-z", {
      privateNotes: JSON.stringify({ intent: "Saç + manikür + pedikür", note: "Private kombin için uygun." }),
    });
    const staffContext = ensureDemoStaff(db, "employee");
    const services = ["İmza kesim", "Manikür", "Pedikür"].map((name) => ensureService(db, name));
    const totalAmount = services.reduce((sum, service) => sum + Number(service.default_price || 0), 0);
    const startsAt = String(req.body?.startsAt || "2026-09-25 19:30:00");

    db.exec("begin");
    try {
      const sessionResult = run(
        db,
        `insert into service_sessions (customer_id, primary_staff_id, status, starts_at, total_amount, note)
         values (?, ?, ?, ?, ?, ?)`,
        [customer.id, staffContext.staff.id, "open", startsAt, totalAmount, "Demo kontrollü seans"]
      );
      const sessionId = sessionResult.lastInsertRowid;
      services.forEach((service) => {
        const price = Number(service.default_price || 0);
        run(
          db,
          `insert into service_session_items (session_id, service_id, quantity, unit_price, line_total)
           values (?, ?, ?, ?, ?)`,
          [sessionId, service.id, 1, price, price]
        );
      });
      db.exec("commit");

      res.status(201).json({
        id: sessionId,
        startsAt,
        status: "open",
        customerName: customer.full_name,
        serviceSummary: "İmza kesim + Manikür + Pedikür",
        totalAmount,
      });
    } catch (error) {
      db.exec("rollback");
      throw error;
    }
  });

  app.post("/api/sessions/request", (req, res) => {
    const session = sessionFromRequest(req);
    if (!session) {
      res.status(401).json({ error: "Oturum gerekli." });
      return;
    }

    const startsAt = String(req.body.startsAt || "").trim();
    const serviceName = String(req.body.serviceName || "").trim();
    const note = String(req.body.note || "").trim();

    if (!startsAt || !serviceName) {
      res.status(400).json({ error: "Gün, saat ve hizmet seçimi zorunlu." });
      return;
    }

    let customer;
    if (session.user.roleCode === "customer") {
      customer = get(db, "select * from customer_profiles where user_id = ? order by id desc limit 1", [
        Number(session.user.id),
      ]);
    } else if (session.user.roleCode === "owner" || session.user.roleCode === "admin") {
      const customerName = String(req.body.customerName || "").trim();
      const phone = String(req.body.phone || slugPhoneFromName(customerName || "musteri")).trim();
      customer = ensureCustomerByPhone(db, customerName || "Müşteri", phone);
    }

    if (!customer) {
      res.status(404).json({ error: "Müşteri profili bulunamadı." });
      return;
    }

    const service = ensureService(db, serviceName);
    const amount = Number(req.body.amount || service.default_price || 0);

    db.exec("begin");
    try {
      const sessionResult = run(
        db,
        `insert into service_sessions (customer_id, status, starts_at, total_amount, note, created_by)
         values (?, ?, ?, ?, ?, ?)`,
        [customer.id, "planned", startsAt, amount, note ? `Müşteri talebi: ${note}` : "Müşteri randevu talebi", Number(session.user.id)]
      );
      const sessionId = sessionResult.lastInsertRowid;
      run(
        db,
        `insert into service_session_items (session_id, service_id, quantity, unit_price, line_total)
         values (?, ?, ?, ?, ?)`,
        [sessionId, service.id, 1, amount, amount]
      );
      db.exec("commit");

      res.status(201).json({
        id: sessionId,
        startsAt,
        status: "planned",
        customerName: customer.full_name,
        serviceSummary: service.name,
        totalAmount: amount,
        note,
      });
    } catch (error) {
      db.exec("rollback");
      throw error;
    }
  });

  app.get("/api/sessions/exceptions", (req, res) => {
    const rows = all(
      db,
      `select status, count(*) as count
       from service_sessions
       where status in ('cancelled', 'no_show', 'reschedule')
       group by status`
    );
    const summary = {
      cancelled: 0,
      noShow: 0,
      reschedule: 0,
    };

    rows.forEach((row) => {
      if (row.status === "cancelled") summary.cancelled = Number(row.count || 0);
      if (row.status === "no_show") summary.noShow = Number(row.count || 0);
      if (row.status === "reschedule") summary.reschedule = Number(row.count || 0);
    });

    res.json(summary);
  });

  app.post("/api/sessions/exceptions/demo", (req, res) => {
    const demoRows = [
      {
        name: "Mert A.",
        phone: "demo-mert-a",
        service: "Sakal tasarım",
        status: "cancelled",
        startsAt: "2026-09-25 18:15:00",
        note: "Son dakika iptal",
      },
      {
        name: "Emre K.",
        phone: "demo-emre-k",
        service: "Manikür",
        status: "no_show",
        startsAt: "2026-09-25 17:30:00",
        note: "Gelmedi",
      },
      {
        name: "Can B.",
        phone: "demo-can-b",
        service: "İmza kesim",
        status: "reschedule",
        startsAt: "2026-09-25 20:45:00",
        note: "Yeniden planlanacak",
      },
    ];

    db.exec("begin");
    try {
      demoRows.forEach((demo) => {
        const customer = ensureCustomerByPhone(db, demo.name, demo.phone);
        const staffContext = ensureDemoStaff(db, "employee");
        const service = ensureService(db, demo.service);
        const existing = get(
          db,
          "select * from service_sessions where customer_id = ? and status = ? and starts_at = ? limit 1",
          [customer.id, demo.status, demo.startsAt]
        );
        if (existing) return;

        const price = Number(service.default_price || 0);
        const sessionResult = run(
          db,
          `insert into service_sessions (customer_id, primary_staff_id, status, starts_at, total_amount, note)
           values (?, ?, ?, ?, ?, ?)`,
          [customer.id, staffContext.staff.id, demo.status, demo.startsAt, price, demo.note]
        );
        run(
          db,
          `insert into service_session_items (session_id, service_id, quantity, unit_price, line_total)
           values (?, ?, ?, ?, ?)`,
          [sessionResult.lastInsertRowid, service.id, 1, price, price]
        );
      });
      db.exec("commit");
    } catch (error) {
      db.exec("rollback");
      throw error;
    }

    const rows = all(
      db,
      `select status, count(*) as count
       from service_sessions
       where status in ('cancelled', 'no_show', 'reschedule')
       group by status`
    );
    const summary = { cancelled: 0, noShow: 0, reschedule: 0 };
    rows.forEach((row) => {
      if (row.status === "cancelled") summary.cancelled = Number(row.count || 0);
      if (row.status === "no_show") summary.noShow = Number(row.count || 0);
      if (row.status === "reschedule") summary.reschedule = Number(row.count || 0);
    });
    res.status(201).json(summary);
  });

  app.get("/api/floor/status", (req, res) => {
    const inside = get(
      db,
      "select count(*) as count from service_sessions where status in ('in_progress', 'open')"
    );
    const waiting = get(
      db,
      "select count(*) as count from service_sessions where status in ('planned')"
    );
    const completed = get(db, "select count(*) as count from service_sessions where status = 'completed'");
    const openPayment = get(
      db,
      `select count(*) as count
       from service_sessions
       left join payments on payments.session_id = service_sessions.id
       where service_sessions.status = 'completed' and payments.id is null`
    );

    res.json({
      inside: Number(inside.count || 0),
      waiting: Number(waiting.count || 0),
      completed: Number(completed.count || 0),
      openPayment: Number(openPayment.count || 0),
    });
  });

  app.get("/api/capacity/today", (req, res) => {
    const maxSessions = 8;
    const reservedBlocks = 2;
    const used = get(
      db,
      "select count(*) as count from service_sessions where status in ('planned', 'open', 'in_progress', 'completed')"
    );
    const usedSessions = Number(used.count || 0);

    res.json({
      usedSessions,
      maxSessions,
      reservedBlocks,
      percent: Math.min(Math.round((usedSessions / maxSessions) * 100), 100),
      note: `Private üyeler için ${reservedBlocks} kapalı saat korunuyor.`,
    });
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
    if (!requireRoles(req, res, ["owner", "admin"])) return;

    const name = String(req.body.name || "").trim();
    const role = String(req.body.role || "Usta").trim();
    const shift = String(req.body.shift || "").trim();
    const status = String(req.body.status || "Aktif").trim();
    const pin = String(req.body.pin || "").trim();
    const staffType = roleCodeFromStaffRole(role);
    const roleRow = get(db, "select * from roles where code = ? limit 1", [staffType === "care_specialist" ? "care_specialist" : staffType]);

    if (!name || !shift || pin.length < 4) {
      res.status(400).json({ error: "Çalışan adı, vardiya ve en az 4 haneli PIN zorunlu." });
      return;
    }

    const email = `${slugPhoneFromName(name)}-${Date.now()}@berberim.local`;
    db.exec("begin");
    try {
      const userResult = run(db, "insert into users (role_id, full_name, email, password_hash, status) values (?, ?, ?, ?, ?)", [
        roleRow?.id || 3,
        name,
        email,
        hashDemoPin(pin),
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

  app.put("/api/staff/:id", (req, res) => {
    if (!requireRoles(req, res, ["owner", "admin"])) return;

    const staff = get(
      db,
      `select
        staff_profiles.*,
        users.id as userId,
        users.full_name as currentName
      from staff_profiles
      join users on users.id = staff_profiles.user_id
      where staff_profiles.id = ?`,
      [Number(req.params.id)]
    );
    if (!staff) {
      res.status(404).json({ error: "Çalışan bulunamadı." });
      return;
    }

    const name = String(req.body.name || "").trim();
    const role = String(req.body.role || "Usta").trim();
    const shift = String(req.body.shift || "").trim();
    const status = String(req.body.status || "Aktif").trim();
    const pin = String(req.body.pin || "").trim();
    const staffType = roleCodeFromStaffRole(role);
    const roleRow = get(db, "select * from roles where code = ? limit 1", [staffType]);

    if (!name || !shift) {
      res.status(400).json({ error: "Çalışan adı ve vardiya zorunlu." });
      return;
    }
    if (pin && pin.length < 4) {
      res.status(400).json({ error: "PIN değiştirilecekse en az 4 haneli olmalı." });
      return;
    }

    db.exec("begin");
    try {
      run(
        db,
        `update users
         set role_id = ?, full_name = ?, password_hash = coalesce(?, password_hash), status = ?, updated_at = datetime('now')
         where id = ?`,
        [roleRow?.id || staff.role_id || 3, name, pin ? hashDemoPin(pin) : null, status === "Pasif" ? "inactive" : "active", staff.userId]
      );
      run(
        db,
        `update staff_profiles
         set staff_type = ?,
             shift_label = ?,
             work_status = ?,
             commission_rate = ?,
             can_close_payment = ?,
             can_view_private_finance = ?,
             updated_at = datetime('now')
         where id = ?`,
        [
          staffType,
          shift,
          status,
          staffType === "care_specialist" ? 40 : staffType === "assistant" ? 0 : 50,
          staffType === "assistant" ? 0 : 1,
          staffType === "owner" ? 1 : 0,
          staff.id,
        ]
      );
      run(
        db,
        `update user_sessions
         set revoked_at = datetime('now')
         where user_id = ? and revoked_at is null`,
        [staff.userId]
      );
      db.exec("commit");

      res.json({
        id: staff.id,
        userId: staff.userId,
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
    if (!requireRoles(req, res, ["owner", "admin"])) return;

    const staff = get(db, "select * from staff_profiles where id = ?", [Number(req.params.id)]);
    if (!staff) {
      res.status(404).json({ error: "Çalışan bulunamadı." });
      return;
    }

    run(db, "update users set status = 'inactive', updated_at = datetime('now') where id = ?", [staff.user_id]);
    run(db, "update staff_profiles set work_status = 'İzinli', updated_at = datetime('now') where id = ?", [staff.id]);
    res.json({ ok: true, id: staff.id });
  });

  app.get("/api/staff-finance", (req, res) => {
    const session = sessionFromRequest(req);
    if (!session) {
      res.status(401).json({ error: "Oturum gerekli." });
      return;
    }
    if (session.user.roleCode === "customer") {
      res.status(403).json({ error: "Bu ekran için yetkin yok." });
      return;
    }
    const staffFinanceWhere =
      session.user.roleCode === "owner" || session.user.roleCode === "admin" ? "" : " and users.id = ?";
    const staffFinanceParams =
      session.user.roleCode === "owner" || session.user.roleCode === "admin" ? [] : [Number(session.user.id)];

    res.json(
      all(
        db,
        `select
          staff_profiles.id,
          users.full_name as name,
          staff_profiles.staff_type as staffType,
          staff_profiles.salary_amount as salaryAmount,
          coalesce(earnings.total_earned, 0) as earnedAmount,
          coalesce(account.advances, 0) as advanceDebt,
          coalesce(account.payments, 0) as paidAmount,
          coalesce(account.bonuses, 0) as bonusAmount,
          (
            coalesce(earnings.total_earned, 0)
            + coalesce(account.bonuses, 0)
            - coalesce(account.advances, 0)
            - coalesce(account.payments, 0)
          ) as remainingAmount
        from staff_profiles
        join users on users.id = staff_profiles.user_id
        left join (
          select staff_id, sum(staff_share) as total_earned
          from staff_earnings
          group by staff_id
        ) earnings on earnings.staff_id = staff_profiles.id
        left join (
          select
            staff_id,
            sum(case when movement_type in ('advance', 'debt') then amount else 0 end) as advances,
            sum(case when movement_type = 'payment' then amount else 0 end) as payments,
            sum(case when movement_type in ('bonus', 'salary_adjustment') then amount else 0 end) as bonuses
          from staff_account_movements
          group by staff_id
        ) account on account.staff_id = staff_profiles.id
        where users.status = 'active'${staffFinanceWhere}
        order by staff_profiles.id`,
        staffFinanceParams
      ).map((row) => ({
        ...row,
        role: staffTypeLabel(row.staffType),
      }))
    );
  });

  app.post("/api/staff/:id/account-movements", (req, res) => {
    if (!requireRoles(req, res, ["owner", "admin"])) return;

    const staff = get(db, "select * from staff_profiles where id = ?", [Number(req.params.id)]);
    if (!staff) {
      res.status(404).json({ error: "Çalışan bulunamadı." });
      return;
    }

    const allowedTypes = new Set(["advance", "debt", "payment", "bonus", "salary_adjustment"]);
    const movementType = String(req.body.movementType || "advance");
    const amount = parseAmount(req.body.amount);
    const note = String(req.body.note || "").trim();

    if (!allowedTypes.has(movementType) || amount <= 0) {
      res.status(400).json({ error: "Geçerli hareket tipi ve tutar zorunlu." });
      return;
    }

    const result = run(
      db,
      `insert into staff_account_movements (staff_id, movement_type, amount, note)
       values (?, ?, ?, ?)`,
      [staff.id, movementType, amount, note]
    );

    res.status(201).json({ id: result.lastInsertRowid, staffId: staff.id, movementType, amount, note });
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
    if (!requireRoles(req, res, ["owner", "admin"])) return;

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
    if (!requireRoles(req, res, ["owner", "admin"])) return;

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

  app.get("/api/cash/details", (req, res) => {
    if (!requireRoles(req, res, ["owner", "admin"])) return;

    const summary = get(
      db,
      `select
        coalesce(sum(payments.amount), 0) as grossAmount,
        count(*) as paymentCount,
        coalesce(avg(payments.amount), 0) as averageTicket
       from payments`
    );
    const paymentTotals = all(
      db,
      `select payment_type as paymentType, coalesce(sum(amount), 0) as amount
       from payments
       group by payment_type`
    );
    const staffShares = get(db, "select coalesce(sum(staff_share), 0) as amount from staff_earnings");
    const staffDebt = get(
      db,
      `select coalesce(sum(case when movement_type in ('advance', 'debt') then amount else 0 end), 0) as amount
       from staff_account_movements`
    );
    const movements = all(
      db,
      `select
        payments.id,
        payments.paid_at as paidAt,
        payments.payment_type as paymentType,
        payments.amount,
        customer_profiles.full_name as customerName,
        services.name as serviceName,
        coalesce(staff_earnings.staff_share, 0) as staffShare,
        coalesce(staff_earnings.business_share, payments.amount) as businessShare
      from payments
      join service_sessions on service_sessions.id = payments.session_id
      join customer_profiles on customer_profiles.id = service_sessions.customer_id
      left join service_session_items on service_session_items.session_id = service_sessions.id
      left join services on services.id = service_session_items.service_id
      left join staff_earnings on staff_earnings.payment_id = payments.id
      order by payments.id desc
      limit 10`
    );

    const totals = {
      card: 0,
      cash: 0,
      online: 0,
    };
    paymentTotals.forEach((row) => {
      const paymentType = String(row.paymentType || "").toLocaleLowerCase("tr-TR");
      if (paymentType.includes("kart")) totals.card += Number(row.amount || 0);
      else if (paymentType.includes("nakit")) totals.cash += Number(row.amount || 0);
      else totals.online += Number(row.amount || 0);
    });

    res.json({
      grossAmount: Number(summary.grossAmount || 0),
      paymentCount: Number(summary.paymentCount || 0),
      averageTicket: Number(summary.averageTicket || 0),
      staffShares: Number(staffShares.amount || 0),
      staffDebt: Number(staffDebt.amount || 0),
      netAmount: Number(summary.grossAmount || 0) - Number(staffShares.amount || 0),
      totals,
      movements,
    });
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
