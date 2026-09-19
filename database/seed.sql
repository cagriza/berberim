insert or ignore into roles (code, name, description) values
  ('owner', 'Patron', 'Tüm sisteme ve mahrem finans bilgilerine erişir.'),
  ('admin', 'Admin', 'Sistem, kullanıcı, hizmet, fiyat ve stok ayarlarını yönetir.'),
  ('master', 'Usta', 'Kendi seanslarını, ödeme kapatmayı ve kendi hak edişini görür.'),
  ('care_specialist', 'Bakım uzmanı', 'Manikür, pedikür ve bakım seanslarını yönetir.'),
  ('assistant', 'Yardımcı personel', 'Destek ve operasyon görevlerine erişir.'),
  ('customer', 'Müşteri', 'Kendi üyelik ve bakım bilgilerini görür.');

insert or ignore into service_categories (name) values
  ('Saç'),
  ('Sakal'),
  ('El bakımı'),
  ('Ayak bakımı'),
  ('Kombin');

insert or ignore into services (
  category_id,
  name,
  default_price,
  duration_minutes,
  requires_master,
  requires_care_specialist
) values
  ((select id from service_categories where name = 'Saç'), 'İmza kesim', 900, 45, 1, 0),
  ((select id from service_categories where name = 'Sakal'), 'Sakal tasarım', 450, 25, 1, 0),
  ((select id from service_categories where name = 'El bakımı'), 'Manikür', 650, 30, 0, 1),
  ((select id from service_categories where name = 'Ayak bakımı'), 'Pedikür', 850, 40, 0, 1);

insert or ignore into stock_items (name, quantity, unit, minimum_quantity, status) values
  ('Tek kullanımlık havlu', 42, 'adet', 15, 'safe'),
  ('Manikür seti', 9, 'paket', 8, 'low'),
  ('Pedikür hijyen kiti', 5, 'paket', 6, 'critical'),
  ('Sakal bakım yağı', 18, 'şişe', 8, 'safe');

insert or ignore into users (role_id, full_name, email, status) values
  ((select id from roles where code = 'owner'), 'İsmail Gül', 'ismail.gul@berberim.local', 'active'),
  ((select id from roles where code = 'master'), 'Faruk Usta', 'faruk.usta@berberim.local', 'active'),
  ((select id from roles where code = 'master'), 'Ali Usta', 'ali.usta@berberim.local', 'active'),
  ((select id from roles where code = 'care_specialist'), 'Elif Zeren', 'elif.zeren@berberim.local', 'active'),
  ((select id from roles where code = 'assistant'), 'Yardımcı 1', 'yardimci1@berberim.local', 'active'),
  ((select id from roles where code = 'assistant'), 'Yardımcı 2', 'yardimci2@berberim.local', 'active'),
  ((select id from roles where code = 'assistant'), 'Yardımcı 3', 'yardimci3@berberim.local', 'active');

insert or ignore into staff_profiles (
  user_id,
  staff_type,
  shift_label,
  work_status,
  salary_amount,
  commission_rate,
  can_close_payment,
  can_view_private_finance
) values
  ((select id from users where email = 'ismail.gul@berberim.local'), 'owner', '10:00-21:00', 'Aktif', 0, 100, 1, 1),
  ((select id from users where email = 'faruk.usta@berberim.local'), 'master', '10:00-19:00', 'Aktif', 38000, 50, 1, 0),
  ((select id from users where email = 'ali.usta@berberim.local'), 'master', '12:00-21:00', 'Aktif', 35000, 50, 1, 0),
  ((select id from users where email = 'elif.zeren@berberim.local'), 'care_specialist', '11:00-20:00', 'Aktif', 32000, 40, 1, 0),
  ((select id from users where email = 'yardimci1@berberim.local'), 'assistant', '10:00-18:00', 'Aktif', 24000, 0, 0, 0),
  ((select id from users where email = 'yardimci2@berberim.local'), 'assistant', '11:00-19:00', 'Aktif', 24000, 0, 0, 0),
  ((select id from users where email = 'yardimci3@berberim.local'), 'assistant', '13:00-21:00', 'Aktif', 24000, 0, 0, 0);
