# Berberim Club Gercek Uygulama Plani

Bu dokuman demo arayuzunu canli, veritabani kullanan ve rol bazli calisan urune donusturmek icin hazirlandi.

## Hedef

Berberim Club; patron, admin, usta, yardimci personel, bakim uzmani ve musteri ekranlari ayrilmis bir isletme yonetim sistemi olacak. Hassas finans ve uye bilgileri yalnizca yetkili kullanicilara gorunecek.

## Rol ve yetki modeli

1. Patron
   - Tum sisteme erisir.
   - Kasa, personel maaslari, avans, borc, alacak, ozel fiyat, stok, musteri notlari ve raporlari gorur.
   - Fiyat, personel, hizmet, komisyon ve yetki ayarlarini degistirir.

2. Admin
   - Kullanici, rol, hizmet, fiyat, stok ve sistem ayarlarini yonetir.
   - Patronun mahrem finans ozetlerine yalnizca yetki verilirse erisir.

3. Usta
   - Kendi islerini, musterilerini ve odeme kapatma ekranini gorur.
   - Kendi hak edisini, alacagini ve borcunu gorur.
   - Diger personelin maas, borc ve hak edis bilgilerini goremez.

4. Bakim uzmani
   - Manikur, pedikur ve bakim seanslarini gorur.
   - Kendi odeme kapatma ve hak edis ekranina erisir.

5. Yardimci personel
   - Gunluk gorev, hazirlik, karşilama ve stok kullanimi gibi sinirli ekranlara erisir.

6. Musteri
   - Kendi uyelik durumunu, bakim gecmisini, kendisine acilan seanslari ve ozel notlarini gorur.

## Modul sirasi

### Faz 1: Temel backend ve veritabani

- Kullanici tablolari
- Rol ve yetki tablolari
- Personel kayitlari
- Musteri ve uyelik kayitlari
- Hizmet ve fiyat listesi
- Ozel musteri fiyatlari
- Kasa hareketleri
- Stok ve stok hareketleri

### Faz 2: Giris ve rol bazli panel

- Patron girisi
- Admin girisi
- Usta girisi
- Musteri girisi
- Rol bazli menu ve sayfa korumasi
- Oturum ve parola guvenligi

### Faz 3: Operasyon

- Uye basvuru ve onay sureci
- Seans acma ve seans kapatma
- Odeme alma
- Manuel tahsilat tutari
- Odeme tipi: nakit, kredi karti, EFT/havale
- Islem sonu usta hak edisi ve isletme payi

### Faz 4: Patron finansi

- Personel maaslari
- Avans ve borc kayitlari
- Hak edis hesaplari
- Iceride kalan para
- Tarih bazli kasa detayi
- Usta bazli gunluk kazanc raporu
- Net kasa ve isletme payi

### Faz 5: Stok

- Malzeme listesi
- Malzeme ekleme, silme, guncelleme
- Stok girisi
- Stok cikisi
- Kritik seviye uyarisi
- Hangi kullanici hangi hareketi yapti kaydi

### Faz 6: Bildirim ve olgunlastirma

- WhatsApp/SMS bildirimleri
- Musteriye acilan seans bildirimi
- Personel gun sonu raporu
- Yedekleme
- Log ve denetim kayitlari

## Teknik tercih

Baslangic icin sade ve bakimi kolay yapi:

- Backend: Node.js API veya ASP.NET Core API
- Veritabani: SQLite
- Oturum: sunucu tarafli session veya guvenli token
- Frontend: mevcut demo tasarimini rol bazli gercek panel sayfalarina bolmek
- Sunucu: mevcut `berber.cagriza.com` Caddy yayini uzerinden reverse proxy

## Ilk kodlanacak ekranlar

1. Giris ekrani
2. Patron ana panel
3. Personel yonetimi
4. Hizmet ve fiyat yonetimi
5. Ozel musteri fiyatlari
6. Odeme kapatma ekrani
7. Kasa hareketleri
8. Stok yonetimi

## Demo ile gercek urun farki

Demo tek sayfada rol seciciyle anlatim yapar. Gercek uygulamada kullanici giris yaptiginda yalnizca kendi rolune ait sayfalar ve veriler yuklenir. Hassas veriler frontend tarafinda saklanmaz; veritabani ve backend yetki kontrolleriyle korunur.
