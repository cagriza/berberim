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
  ((select id from service_categories where name = 'Ayak bakımı'), 'Pedikür', 850, 40, 0, 1),
  ((select id from service_categories where name = 'Kombin'), 'Atelier Kombin', 1850, 75, 1, 1),
  ((select id from service_categories where name = 'Kombin'), 'El & Ayak Bakımı', 1350, 70, 0, 1),
  ((select id from service_categories where name = 'Kombin'), 'Private Tam Gün', 3200, 120, 1, 1);

insert or ignore into stock_items (name, quantity, unit, minimum_quantity, status) values
  ('Tek kullanımlık havlu', 42, 'adet', 15, 'safe'),
  ('Manikür seti', 9, 'paket', 8, 'low'),
  ('Pedikür hijyen kiti', 5, 'paket', 6, 'critical'),
  ('Sakal bakım yağı', 18, 'şişe', 8, 'safe');

insert or ignore into users (role_id, full_name, email, status) values
  ((select id from roles where code = 'owner'), 'İsmail Gül', 'ismail.gul@berberim.local', 'active'),
  ((select id from roles where code = 'admin'), 'Salon Admini', 'admin@berberim.local', 'active'),
  ((select id from roles where code = 'master'), 'Faruk Usta', 'faruk.usta@berberim.local', 'active'),
  ((select id from roles where code = 'master'), 'Ali Usta', 'ali.usta@berberim.local', 'active'),
  ((select id from roles where code = 'care_specialist'), 'Elif Zeren', 'elif.zeren@berberim.local', 'active'),
  ((select id from roles where code = 'assistant'), 'Yardımcı 1', 'yardimci1@berberim.local', 'active'),
  ((select id from roles where code = 'assistant'), 'Yardımcı 2', 'yardimci2@berberim.local', 'active'),
  ((select id from roles where code = 'assistant'), 'Yardımcı 3', 'yardimci3@berberim.local', 'active'),
  ((select id from roles where code = 'customer'), 'Mehmet A.', 'mehmet.a@berberim.local', 'active');

update users set password_hash = 'demo-pin:53d2dd2504402eec1bc49ad74daf2e90c352f399842f3d5a3606892213c110fc'
where email = 'ismail.gul@berberim.local' and password_hash is null;
update users set password_hash = 'demo-pin:158a323a7ba44870f23d96f1516dd70aa48e9a72db4ebb026b0a89e212a208ab'
where email = 'admin@berberim.local' and password_hash is null;
update users set password_hash = 'demo-pin:0ffe1abd1a08215353c233d6e009613e95eec4253832a761af28ff37ac5a150c'
where email = 'faruk.usta@berberim.local' and password_hash is null;
update users set password_hash = 'demo-pin:edee29f882543b956620b26d0ee0e7e950399b1c4222f5de05e06425b4c995e9'
where email = 'ali.usta@berberim.local' and password_hash is null;
update users set password_hash = 'demo-pin:318aee3fed8c9d040d35a7fc1fa776fb31303833aa2de885354ddf3d44d8fb69'
where email = 'elif.zeren@berberim.local' and password_hash is null;
update users set password_hash = 'demo-pin:6346fc1b001a16dd9e1e8b172d33847c99e6016733cb2fde11baf8d107b364ce'
where email = 'yardimci1@berberim.local' and password_hash is null;
update users set password_hash = 'demo-pin:3b9f84399baa1776bb6ed76ff4095f29d8e8128039d2d23300a3087733cb0a4c'
where email = 'yardimci2@berberim.local' and password_hash is null;
update users set password_hash = 'demo-pin:b74c6293baa71a0cf5aec9b63a98c1f10b2009493e1f8131dcfab0178107a6cc'
where email = 'yardimci3@berberim.local' and password_hash is null;
update users set password_hash = 'demo-pin:c1f330d0aff31c1c87403f1e4347bcc21aff7c179908723535f2b31723702525'
where email = 'mehmet.a@berberim.local' and password_hash is null;

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

insert into customer_profiles (
  user_id,
  full_name,
  phone,
  membership_level,
  membership_status,
  invite_code,
  private_notes
)
select (select id from users where email = 'mehmet.a@berberim.local'), 'Mehmet A.', 'demo-mehmet-a', 'atelier', 'active', 'BC-ATELIER-09', '{"intent":"Saç kesimi ve sakal tasarım","note":"Cuma akşamı seanslarını tercih ediyor."}'
where not exists (select 1 from customer_profiles where phone = 'demo-mehmet-a');

update customer_profiles
set user_id = (select id from users where email = 'mehmet.a@berberim.local')
where phone = 'demo-mehmet-a' and user_id is null;

insert into customer_profiles (
  full_name,
  phone,
  membership_level,
  membership_status,
  invite_code,
  private_notes
)
select 'Mert A.', 'demo-mert-a', 'candidate', 'invited', 'BC-ATELIER-09', '{"intent":"Düzenli saç ve sakal bakımı","note":"Akşam saatlerini tercih ediyor."}'
where not exists (select 1 from customer_profiles where phone = 'demo-mert-a');

insert into customer_profiles (
  full_name,
  phone,
  membership_level,
  membership_status,
  invite_code,
  private_notes
)
select 'Emre K.', 'demo-emre-k', 'candidate', 'review', null, '{"intent":"Manikür ve pedikür bakımı","note":"Bakım uzmanı uygunluğu bekleniyor."}'
where not exists (select 1 from customer_profiles where phone = 'demo-emre-k');

insert into customer_profiles (
  full_name,
  phone,
  membership_level,
  membership_status,
  invite_code,
  private_notes
)
select 'Can B.', 'demo-can-b', 'candidate', 'candidate', null, '{"intent":"Sakal tasarım ve manikür","note":"Davet kodu yok."}'
where not exists (select 1 from customer_profiles where phone = 'demo-can-b');
