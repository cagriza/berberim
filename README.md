# Berberim Club

Berberim Club, onaylı üyelik ve kontrollü seans erişimiyle çalışan web tabanlı saç, sakal, manikür ve pedikür bakım kulübü uygulamasıdır.

## İlk kurgu

- Aday müşteri üyelik başvurusu yapar.
- İşletme başvuruyu onaylar, bekletir veya reddeder.
- Onaylı üye yalnızca kendisine açılan seansları, bakım notlarını ve hizmet ayrıcalıklarını görür.
- Üye tek seans içinde saç kesimi, sakal, manikür ve pedikür gibi birden fazla bakım setini birlikte seçebilir.
- İşletme, kapasiteyi ve üye segmentlerini yönetir.
- Admin, patron, usta ve müşteri ekranları birbirinden ayrılır.
- İsmail Gül patron ve usta olarak tüm kasa, maaş, alacak-borç ve mahrem üye bilgilerini görebilir.
- Çalışan usta işlem bitince ödeme tipini seçip tahsilatı kapatır; kasa ve hak ediş otomatik oluşur.

## Mevcut durum

Bu depo şu anda bağımlılıksız çalışan bir web prototipi içerir. `index.html` dosyası doğrudan tarayıcıda açılabilir.

Canlı ürün için sonraki adımlar:

- Kalıcı veritabanı ve kimlik doğrulama
- Yönetici paneli yetkilendirmesi
- Personel maaş, avans, alacak ve borç veritabanı
- Kasa hareketleri ve ödeme entegrasyonu
- SMS/WhatsApp bildirimleri
- Üyelik segmentleri ve ödeme entegrasyonu
- `berber.cagriza.com` için sunucu ve Caddy yapılandırması

## Yerel önizleme

Dosyayı doğrudan açabilirsiniz:

```text
/Users/cagriza/Downloads/REIN-Sertifika 5/berberim/index.html
```
