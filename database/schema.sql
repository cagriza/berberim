-- Berberim Club baslangic veritabani semasi
-- Hedef veritabani: SQLite

pragma foreign_keys = on;

create table if not exists roles (
  id integer primary key autoincrement,
  code text not null unique,
  name text not null unique,
  description text,
  created_at text not null default (datetime('now'))
);

create table if not exists users (
  id integer primary key autoincrement,
  role_id integer not null references roles(id),
  full_name text not null,
  phone text,
  email text unique,
  password_hash text,
  status text not null default 'active',
  created_at text not null default (datetime('now')),
  updated_at text not null default (datetime('now'))
);

create table if not exists staff_profiles (
  id integer primary key autoincrement,
  user_id integer not null unique references users(id),
  staff_type text not null,
  shift_label text,
  salary_amount real not null default 0,
  commission_rate real,
  can_close_payment integer not null default 0,
  can_view_private_finance integer not null default 0,
  created_at text not null default (datetime('now')),
  updated_at text not null default (datetime('now'))
);

create table if not exists customer_profiles (
  id integer primary key autoincrement,
  user_id integer references users(id),
  full_name text not null,
  phone text not null,
  membership_level text not null default 'candidate',
  membership_status text not null default 'candidate',
  invite_code text,
  private_notes text,
  created_at text not null default (datetime('now')),
  updated_at text not null default (datetime('now'))
);

create table if not exists service_categories (
  id integer primary key autoincrement,
  name text not null unique,
  created_at text not null default (datetime('now'))
);

create table if not exists services (
  id integer primary key autoincrement,
  category_id integer references service_categories(id),
  name text not null unique,
  default_price real not null default 0,
  duration_minutes integer not null default 30,
  requires_master integer not null default 1,
  requires_care_specialist integer not null default 0,
  active integer not null default 1,
  created_at text not null default (datetime('now')),
  updated_at text not null default (datetime('now'))
);

create table if not exists customer_special_prices (
  id integer primary key autoincrement,
  customer_id integer not null references customer_profiles(id),
  service_id integer not null references services(id),
  special_price real not null,
  note text,
  active integer not null default 1,
  created_by integer references users(id),
  created_at text not null default (datetime('now')),
  updated_at text not null default (datetime('now')),
  unique (customer_id, service_id)
);

create table if not exists service_sessions (
  id integer primary key autoincrement,
  customer_id integer not null references customer_profiles(id),
  primary_staff_id integer references staff_profiles(id),
  care_staff_id integer references staff_profiles(id),
  status text not null default 'planned',
  starts_at text,
  ended_at text,
  total_amount real not null default 0,
  note text,
  created_by integer references users(id),
  created_at text not null default (datetime('now')),
  updated_at text not null default (datetime('now'))
);

create table if not exists service_session_items (
  id integer primary key autoincrement,
  session_id integer not null references service_sessions(id) on delete cascade,
  service_id integer not null references services(id),
  quantity real not null default 1,
  unit_price real not null,
  line_total real not null,
  created_at text not null default (datetime('now'))
);

create table if not exists payments (
  id integer primary key autoincrement,
  session_id integer not null references service_sessions(id),
  collected_by integer references users(id),
  payment_type text not null,
  amount real not null,
  manual_amount integer not null default 0,
  note text,
  paid_at text not null default (datetime('now')),
  created_at text not null default (datetime('now'))
);

create table if not exists staff_earnings (
  id integer primary key autoincrement,
  staff_id integer not null references staff_profiles(id),
  session_id integer references service_sessions(id),
  payment_id integer references payments(id),
  gross_amount real not null,
  staff_share real not null,
  business_share real not null,
  earning_status text not null default 'open',
  created_at text not null default (datetime('now'))
);

create table if not exists staff_account_movements (
  id integer primary key autoincrement,
  staff_id integer not null references staff_profiles(id),
  movement_type text not null,
  amount real not null,
  note text,
  created_by integer references users(id),
  created_at text not null default (datetime('now'))
);

create table if not exists cash_movements (
  id integer primary key autoincrement,
  payment_id integer references payments(id),
  movement_type text not null,
  amount real not null,
  payment_type text,
  note text,
  created_by integer references users(id),
  created_at text not null default (datetime('now'))
);

create table if not exists stock_items (
  id integer primary key autoincrement,
  name text not null unique,
  quantity real not null default 0,
  unit text not null default 'adet',
  minimum_quantity real not null default 0,
  status text not null default 'safe',
  active integer not null default 1,
  created_at text not null default (datetime('now')),
  updated_at text not null default (datetime('now'))
);

create table if not exists stock_movements (
  id integer primary key autoincrement,
  stock_item_id integer not null references stock_items(id),
  movement_type text not null,
  quantity real not null,
  note text,
  created_by integer references users(id),
  created_at text not null default (datetime('now'))
);

create table if not exists audit_logs (
  id integer primary key autoincrement,
  actor_user_id integer references users(id),
  entity_type text not null,
  entity_id integer,
  action text not null,
  before_data text,
  after_data text,
  created_at text not null default (datetime('now'))
);

create index if not exists idx_users_role_id on users(role_id);
create index if not exists idx_customer_profiles_phone on customer_profiles(phone);
create index if not exists idx_service_sessions_customer_id on service_sessions(customer_id);
create index if not exists idx_service_sessions_primary_staff_id on service_sessions(primary_staff_id);
create index if not exists idx_payments_session_id on payments(session_id);
create index if not exists idx_staff_earnings_staff_id on staff_earnings(staff_id);
create index if not exists idx_staff_account_movements_staff_id on staff_account_movements(staff_id);
create index if not exists idx_cash_movements_created_at on cash_movements(created_at);
create index if not exists idx_stock_movements_stock_item_id on stock_movements(stock_item_id);
