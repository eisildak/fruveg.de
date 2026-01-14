# Fruveg Market - E-Ticaret Platformu

Modern, full-stack bir meyve & sebze e-ticaret platformu. Wasp framework kullanılarak geliştirilmiştir.

## 🚀 Özellikler

- ✅ Kullanıcı kayıt ve giriş sistemi (Email + Şifre)
- 🛒 Sepet yönetimi
- 📦 Sipariş sistemi
- 💳 Ödeme entegrasyonu (Kredi Kartı, Havale, Kapıda Ödeme)
- 👨‍💼 Admin paneli (Ürün & Sipariş yönetimi)
- 📱 Responsive tasarım
- 🎨 Modern UI/UX (TailwindCSS)

## 📋 Gereksinimler

- Node.js (v18 veya üzeri)
- PostgreSQL
- Wasp CLI

## 🛠️ Kurulum

### 1. Wasp CLI'yi yükleyin

```bash
curl -sSL https://get.wasp.sh/installer.sh | sh
```

### 2. Bağımlılıkları yükleyin

```bash
wasp install
```

### 3. PostgreSQL veritabanı oluşturun

Yerel bir PostgreSQL sunucunuz yoksa Docker ile çalıştırabilirsiniz:

```bash
docker run --name fruveg-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=fruveg -p 5432:5432 -d postgres
```

### 4. Ortam değişkenlerini ayarlayın

`.env.server` dosyası oluşturun:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/fruveg
```

### 5. Veritabanını migrate edin

```bash
wasp db migrate-dev
```

### 6. Uygulamayı çalıştırın

```bash
wasp start
```

Uygulama şu adreste çalışacaktır: http://localhost:3000

## 📊 Veritabanı Yapısı

- **User** - Kullanıcılar (müşteriler ve adminler)
- **Product** - Ürünler (meyve & sebze)
- **Cart** - Alışveriş sepetleri
- **CartItem** - Sepet içindeki ürünler
- **Order** - Tamamlanmış siparişler
- **OrderItem** - Sipariş içindeki ürünler

## 👨‍💼 Admin Kullanımı

İlk admin kullanıcısını manuel olarak veritabanından oluşturmanız gerekir:

```sql
UPDATE "User" SET "isAdmin" = true WHERE email = 'admin@fruveg.de';
```

Admin paneline `/admin` rotasından erişebilirsiniz.

## 🎯 Kullanım

1. **Kayıt Olun**: `/signup` sayfasından yeni hesap oluşturun
2. **Ürünleri İnceleyin**: Ana sayfada veya `/urunler` sayfasında ürünleri görüntüleyin
3. **Sepete Ekleyin**: İstediğiniz ürünleri sepete ekleyin
4. **Sipariş Verin**: Sepetten ödeme sayfasına geçin ve teslimat bilgilerinizi girin
5. **Siparişlerinizi Takip Edin**: `/siparislerim` sayfasından siparişlerinizi görüntüleyin

## 🏗️ Proje Yapısı

```
fruveg.de/
├── main.wasp              # Wasp yapılandırması
├── schema.prisma          # Veritabanı şeması
├── src/
│   ├── client/           # Frontend (React)
│   │   ├── components/   # Yeniden kullanılabilir bileşenler
│   │   ├── pages/        # Sayfa bileşenleri
│   │   └── App.tsx       # Root component
│   └── server/           # Backend (Node.js)
│       ├── queries.ts    # Veri okuma fonksiyonları
│       └── actions.ts    # Veri yazma fonksiyonları
├── package.json
├── tailwind.config.js
└── README.md
```

## 🚢 Deployment

### Fly.io'ya Deploy

```bash
wasp deploy fly launch fruveg-market
```

### Manuel Deploy

```bash
wasp build
cd .wasp/build
npm install
npm run db-migrate-prod
npm start
```

## 🔧 Geliştirme

### Test Ürünleri Ekleme

Admin panelinden veya Prisma Studio ile test ürünleri ekleyebilirsiniz:

```bash
wasp db studio
```

### Veritabanı Şemasını Güncelleme

1. `schema.prisma` dosyasını düzenleyin
2. Migration oluşturun:
   ```bash
   wasp db migrate-dev
   ```

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır. Büyük değişiklikler için lütfen önce bir issue açın.

## 📧 İletişim

Sorularınız için: info@fruveg.de

---

Made with ❤️ using Wasp
