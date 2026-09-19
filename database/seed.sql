insert or ignore into roles (code, name, description) values
  ('owner', 'Patron', 'Tum sisteme ve mahrem finans bilgilerine erisir.'),
  ('admin', 'Admin', 'Sistem, kullanici, hizmet, fiyat ve stok ayarlarini yonetir.'),
  ('master', 'Usta', 'Kendi seanslarini, odeme kapatmayi ve kendi hak edisini gorur.'),
  ('care_specialist', 'Bakim uzmani', 'Manikur, pedikur ve bakim seanslarini yonetir.'),
  ('assistant', 'Yardimci personel', 'Destek ve operasyon gorevlerine erisir.'),
  ('customer', 'Musteri', 'Kendi uyelik ve bakim bilgilerini gorur.');

insert or ignore into service_categories (name) values
  ('Sac'),
  ('Sakal'),
  ('El bakimi'),
  ('Ayak bakimi'),
  ('Kombin');

insert or ignore into services (
  category_id,
  name,
  default_price,
  duration_minutes,
  requires_master,
  requires_care_specialist
) values
  ((select id from service_categories where name = 'Sac'), 'Imza kesim', 900, 45, 1, 0),
  ((select id from service_categories where name = 'Sakal'), 'Sakal tasarim', 450, 25, 1, 0),
  ((select id from service_categories where name = 'El bakimi'), 'Manikur', 650, 30, 0, 1),
  ((select id from service_categories where name = 'Ayak bakimi'), 'Pedikur', 850, 40, 0, 1);

insert or ignore into stock_items (name, quantity, unit, minimum_quantity, status) values
  ('Tek kullanimlik havlu', 42, 'adet', 15, 'safe'),
  ('Manikur seti', 9, 'paket', 8, 'low'),
  ('Pedikur hijyen kiti', 5, 'paket', 6, 'critical'),
  ('Sakal bakim yagi', 18, 'sise', 8, 'safe');
