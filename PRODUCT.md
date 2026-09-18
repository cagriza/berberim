# Berberim Club Ürün Kurgusu

## Truthmode notları

- Bu projede şu an gerçek backend, canlı üyelik verisi, ödeme sistemi, SMS servisi veya yönetici hesabı yoktur.
- Sunucu tarafı için daha önceki projelerde cagriza.com altında Caddy ve systemd düzeni kullanılmıştı; bu bilgi yeniden doğrulanmadan canlı deploy yapılmamalıdır.
- `berber.cagriza.com` hedef subdomain olarak kabul edildi, fakat DNS ve Caddy kaydı canlıda kontrol edilmedi.

## Ürün ilkesi

Berberim Club herkese açık saat listesi mantığıyla çalışmaz. Kullanıcının önüne tüm saatleri açmak yerine işletmenin kapasitesini ve müşteri kalitesini koruyan üyelik kapısı vardır. Saç, sakal, manikür ve pedikür aynı üye hafızasında takip edilir. Üye tek bir hizmetle sınırlı kalmaz; bir seans içinde birden fazla bakım seti birlikte seçilebilir.

## Roller

1. Aday üye
   - Başvuru yapar.
   - Davet kodu girer.
   - Onay durumunu takip eder.
   - Başvuru, inceleme, davet ve üyelik adımlarını görür.

2. Onaylı üye
   - Kendisine açılan seansları görür.
   - Saç, sakal, manikür ve pedikür geçmişini takip eder.
   - Bir seans için birden fazla bakım seti seçebilir.
   - Gerekirse seans talebi bırakır.

3. İşletme
   - Başvuruları değerlendirir.
   - Üye segmentlerini yönetir.
   - Seansları belirli üyelere veya segmentlere açar.
   - Usta ve bakım uzmanı uygunluğunu yönetir.
   - Davet kodu ve günlük kapasiteyi yönetir.
   - Günlük işlem sayısı, hasılat, çalışan ekip, gelen kişi sayısı ve hizmet kırılımını izler.

## Üyelik seviyeleri

1. Essential
   - Düzenli saç ve sakal bakımı.
   - Temel bakım notları.
   - İşletme tarafından açılan standart seanslar.
   - Çoklu set kullanımında temel kombinasyonlar: saç + sakal.

2. Atelier
   - Saç, sakal ve manikür kombinasyonları.
   - Öncelikli seans erişimi.
   - Stil ve bakım geçmişi.
   - Çoklu set kullanımında önerilen kombinasyonlar: saç + sakal + manikür veya saç + manikür + pedikür.

3. Private
   - Saç, sakal, manikür ve pedikür paketleri.
   - Kapalı saatler için özel talep.
   - Kişisel bakım ritmi ve özel gün hazırlığı.
   - Çoklu set kullanımında tam bakım günü ve özel gün hazırlığı.

## Hizmet kategorileri

- İmza kesim
- Sakal tasarım
- Manikür
- Pedikür

## Fiyatlandırma ve paketler

Başlangıç fiyat kurgusu örnek olarak şöyledir:

- İmza kesim: 900 TL
- Sakal tasarım: 450 TL
- Manikür: 650 TL
- Pedikür: 850 TL
- Atelier Kombin: saç kesimi + sakal + manikür, 1.850 TL
- El & Ayak Bakımı: manikür + pedikür, 1.350 TL
- Private Tam Gün: saç + sakal + manikür + pedikür, 3.200 TL

İşletme sahibi bu fiyatları yönetim panelinden değiştirebilmelidir. Web prototipinde fiyatlar tarayıcı hafızasında saklanır; canlı üründe fiyat değişiklikleri veritabanında, değişiklik tarihi ve yapan kullanıcıyla birlikte tutulmalıdır.

## Bakım seti mantığı

Bakım seti, üyelik seviyesinden bağımsız seçilebilir hizmet kombinasyonudur. Üyelik seviyesi hangi setlere, hangi öncelikle ve hangi saatlerde erişilebileceğini belirler.

İşletme tarafında her set kombinasyonu süre ve uzman ihtiyacı üretir. Örneğin saç kesimi + manikür + pedikür, tek usta ve tek bakım uzmanı gerektiren yaklaşık 115 dakikalık bir blok olarak planlanır.

Kapasite tarafında sistem yalnızca boş saat var mı diye bakmaz. Aynı anda gerekli usta, bakım uzmanı ve üyelik önceliği uygun mu diye kontrol eder. Private üyeler için belirli kapalı saatler korunabilir.

Örnek kombinasyonlar:

- Saç kesimi + sakal tasarım
- Saç kesimi + manikür
- Saç kesimi + el ve ayak bakımı
- Private tam bakım günü: saç, sakal, manikür, pedikür ve özel gün hazırlığı

## Ekip kurgusu

- Yasin Kılıç: baş usta, klasik kesim ve sakal formu.
- Emir Arman: stil uzmanı, modern kesim ve özel gün hazırlığı.
- Deniz Nur: bakım uzmanı, manikür ve pedikür.

## Yönetici göstergeleri

Yönetici veya berber ustası günlük operasyonu tek panelden görmelidir:

- Bugünkü toplam işlem sayısı
- Saç/sakal ve bakım seti ayrımı
- Günlük hasılat
- Bakım setlerinden gelen hasılat
- İşletme sahibi tarafından düzenlenebilir günlük rakamlar
- İşletme sahibi tarafından düzenlenebilir hizmet ve paket fiyatları
- Kart, nakit ve online ödeme kırılımı
- Ortalama sepet
- O gün çalışan kişi sayısı
- Çalışan adı, rolü, vardiyası ve aktif/izinli durumu
- Usta ve bakım uzmanı bazlı işlem/hasılat
- Dükkâna gelen toplam kişi
- Üye, aday ve ziyaretçi ayrımı
- İçeride, bekleyen, tamamlanan ve tahsilatı açık kişi sayıları
- Bugünkü üyeler için hızlı bakım kartları
- Sıradaki üyeler
- İptal, gelmedi ve yeniden planlanacak seanslar
- Gün kapasitesi ve korunan Private saatler
- Sarf malzeme stoku ve günlük tüketim

## MVP kapsamı

- Başvuru formu
- Başvuru kuyruğu
- Başvuru durum hattı
- Onay/bekletme aksiyonları
- Üye paneli demo görünümü
- Üye bakım geçmişi
- Davet kodu gösterimi
- Gün kapasitesi göstergesi
- Günlük işlem ve hasılat özeti
- İşletme sahibi metrik düzenleme paneli
- İşletme sahibi fiyat düzenleme paneli
- İşletme sahibi çalışan ve vardiya düzenleme paneli
- Çalışan ekip ve hizmet kırılımı
- Kasa ödeme kırılımı
- Gün akışı, iptal ve gelmedi takibi
- Anlık dükkân durumu
- Üye hızlı kartları
- Fiyat ve paket kartları
- Stok ve sarf malzeme takibi
- Kontrollü seans açma örneği
- Hizmet kategorileri
- Çoklu bakım seti seçimi
- Üyelik seviyesi kartları
- Set kombinasyonu süre/uzman planı
- Usta ve bakım uzmanı kartları
- Mobil uyumlu PWA başlangıcı

## İkinci aşama önerisi

Backend için sade ve bakımı kolay bir yapı önerilir:

- ASP.NET Core veya Node.js API
- PostgreSQL veya SQLite başlangıç veritabanı
- Sunucu taraflı oturum ve rol yönetimi
- Caddy ile `berber.cagriza.com` reverse proxy
- Admin için ayrı giriş ekranı
- Üye tarafı için tek kullanımlık davet bağlantısı
