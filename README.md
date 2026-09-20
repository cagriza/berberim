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

Bu depo şu anda web prototipi ve ilk Node.js + Express + SQLite backend iskeletini içerir. Stok, özel fiyat, ödeme, personel ve personel hesap hareketleri SQLite API'ye bağlanmıştır.

Canlı ürün için sonraki adımlar:

- Kimlik doğrulama ve rol bazlı gerçek giriş akışı
- Yönetici paneli yetkilendirmesi
- Kasa hareketleri ve ödeme entegrasyonu
- SMS/WhatsApp bildirimleri
- Üyelik segmentleri ve ödeme entegrasyonu
- `berber.cagriza.com` için sunucu ve Caddy yapılandırması

## Yerel önizleme

Frontend dosyasını doğrudan açabilirsiniz:

```text
/Users/cagriza/Downloads/REIN-Sertifika 5/berberim/index.html
```

Backend API'yi yerelde başlatmak için:

```bash
npm install
npm run db:init
npm start
```

Node.js 22+ gerekir. Canlı sunucuda SQLite dosyası release klasöründen ayrı tutulmalıdır:

```bash
BERBERIM_DB_PATH=/opt/berberim/data/berberim.sqlite
PORT=3002
```

Varsayılan API adresi:

```text
http://localhost:3000/api/health
```

Canlı yayında `berber.cagriza.com/api/*` istekleri Node.js servisine, diğer istekler statik web arayüzüne yönlendirilir. Böylece ekranlar aynı domain altında gerçek SQLite verisini kullanır.

İlk eklenen API uçları:

- `GET /api/health`
- `GET /api/roles`
- `GET /api/demo-users`
- `POST /api/auth/pin-login`
- `GET /api/auth/session`
- `GET /api/services`
- `GET /api/service-prices`
- `PUT /api/service-prices`
- `GET /api/services/breakdown`
- `GET /api/applications`
- `POST /api/applications`
- `PATCH /api/applications/:id/status`
- `GET /api/sessions/upcoming`
- `GET /api/calendar/week`
- `POST /api/sessions/open-demo`
- `GET /api/sessions/exceptions`
- `POST /api/sessions/exceptions/demo`
- `GET /api/floor/status`
- `GET /api/capacity/today`
- `GET /api/member-cards/today`
- `GET /api/staff`
- `POST /api/staff`
- `DELETE /api/staff/:id`
- `GET /api/staff-finance`
- `POST /api/staff/:id/account-movements`
- `GET /api/special-prices`
- `POST /api/special-prices`
- `DELETE /api/special-prices/:id`
- `POST /api/payments/checkout`
- `GET /api/stock`
- `POST /api/stock`
- `POST /api/stock/:id/movements`
- `DELETE /api/stock/:id`
- `GET /api/stock-movements`
- `GET /api/cash/details`
- `GET /api/cash/summary`

Frontend stok bölümü API açıksa SQLite veritabanını kullanır. API kapalıysa demo akışının bozulmaması için tarayıcı hafızasına düşer.
Frontend personel bölümü de API açıksa SQLite veritabanını kullanır. API kapalıysa demo çalışan hafızasıyla çalışmayı sürdürür.
