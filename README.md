# 🎮 Taş Kağıt Makas - Vue 3

Vue 3, TypeScript ve Pinia ile geliştirilmiş modern, interaktif Taş Kağıt Makas oyunu. Bilgisayara karşı oynayın ve skorlarınızı lider tablosunda takip edin!

## 🚀 Demo

**Canlı Demo:** [https://rock-paper-scissors-vue-six.vercel.app/](https://rock-paper-scissors-vue-six.vercel.app/)

## ✨ Özellikler

- 🎯 **Dinamik Oyun Mantığı** - Seçenekler ve kurallar veritabanından yüklenir
- 📊 **Canlı Lider Tablosu** - Birden fazla oyuncu için gerçek zamanlı skor takibi
- 🎨 **Responsive Tasarım** - Masaüstü ve mobil cihazlar için optimize edilmiş
- 🏆 **Skor Sistemi** - Kazanma, kaybetme, berabere ve kazanma oranlarını takip edin
- 💾 **Oyun Geçmişi** - Her oyun detaylı bilgilerle kaydedilir
- 🎭 **Akıcı Animasyonlar** - Modal geçişleri ve oyun efektleri
- 🔄 **Durum Yönetimi** - Pinia ile merkezi state yönetimi
- 📱 **Mobil Öncelikli** - Mobil cihazlarda tam ekran modaller

## 🛠 Teknoloji Yığını

- **Framework:** Vue 3 (Composition API)
- **Dil:** TypeScript
- **State Yönetimi:** Pinia
- **Stil:** SCSS (BEM Metodolojisi)
- **HTTP İstemcisi:** Axios
- **Veritabanı:** JSON Server
- **Build Aracı:** Vite
- **Deploy:** Vercel

## 📦 Kurulum

### Ön Gereksinimler

- Node.js (v20.19.0 veya >=22.12.0)
- npm veya yarn

> **Not:** Uygun Node.js sürümü yüklü değilse [Node.js resmi web sitesinden](https://nodejs.org/) LTS sürümünü indirebilirsiniz.

### Kurulum

```bash
# Projeyi klonlayın
git clone https://github.com/aysgl/rock-paper-scissors-vue.git
cd rock-paper-scissors-vue

# Bağımlılıkları yükleyin
npm install
```

## 🚀 Uygulamayı Çalıştırma

### Geliştirme Modu

**İki sunucuyu** aynı anda çalıştırmanız gerekir:

#### 1. JSON Server'ı Başlatın (Backend)

```bash
npm run server
```

Mock API sunucusunu `http://localhost:5001` adresinde başlatır

#### 2. Vite Dev Server'ı Başlatın (Frontend)

```bash
npm run dev
```

Vue uygulamasını `http://localhost:5173` adresinde başlatır

### Production Build

```bash
# Type kontrolü ve build
npm run build

# Production build'i önizleme
npm run preview
```

## 📁 Proje Yapısı

```
src/
├── api/              # API client konfigürasyonu
│   └── api.ts        # Axios instance ve interceptor'lar
├── assets/           # Global stiller ve varlıklar
│   └── styles/       # SCSS dosyaları (BEM metodolojisi)
├── components/       # Vue komponentleri
│   ├── game/         # Oyuna özel komponentler
│   ├── svg/          # SVG ikon komponentleri
│   └── ui/           # Yeniden kullanılabilir UI
├── composables/      # Vue composable fonksiyonları
│   ├── useGame.ts               # Oyun mantığı composable'ı
│   ├── useModal.ts              # Modal state yönetimi
│   ├── useProvideInject.ts      # Provide/Inject pattern utilities
│   └── useErrorNotification.ts  # Hata bildirim yönetimi
├── constants/        # Sabit değerler ve konfigürasyonlar
│   └── gameIcons.ts  # Oyun ikonu mapping'leri
├── router/           # Vue Router konfigürasyonu
├── store/            # Pinia store'lar
│   ├── gameStore.ts  # Oyun state'i ve mantığı
│   └── scoreStore.ts # Lider tablosu state'i ve mantığı
├── types/            # TypeScript tip tanımlamaları
│   ├── api.types.ts   # API ile ilgili tipler
│   ├── game.types.ts  # Oyun ile ilgili tipler
│   └── error.types.ts # Hata yönetimi tipleri
├── utils/            # Yardımcı fonksiyonlar
│   ├── scoreHelpers.ts   # Skor hesaplama fonksiyonları
│   └── errorHandler.ts   # Hata yönetim utility'leri
└── views/            # Sayfa komponentleri
```

## 🎮 Nasıl Oynanır

1. **Taş**, **Kağıt** veya **Makas**'a tıklayarak seçiminizi yapın
2. Bilgisayar rastgele seçimini yapacak
3. Sonucu ve güncellenmiş skorunuzu görün
4. **Lider Tablosu modal'ı** otomatik açılır ve şunları gösterir:
   - Sonucunuz (Kazandınız/Kaybettiniz/Berabere)
   - Güncel sıralamalar
   - Oyuncu istatistikleri
5. Yeni bir tur başlatmak için **Tekrar Oyna**'ya tıklayın
6. Lider tablosunu istediğiniz zaman görmek için **Score**'a tıklayın

## 📊 Veritabanı Şeması

JSON Server ile dinamik veritabanı yapısı:

- **Choices**: Oyun seçenekleri (rock, paper, scissors)
- **Rules**: Oyun kuralları (winner, loser, verb)
- **Games**: Oyun geçmişi (playerChoice, houseChoice, result)
- **Scoreboard**: Oyuncu istatistikleri (score, wins, losses, winRate)

## 🔌 API Endpoint'leri

**Local Development:** `http://localhost:5001`  
**Production:** `https://rock-paper-scissors-api-hz7y.onrender.com`

| Method | Endpoint          | Açıklama                       |
| ------ | ----------------- | ------------------------------ |
| GET    | `/choices`        | Oyun seçeneklerini getir       |
| GET    | `/rules`          | Oyun kurallarını getir         |
| GET    | `/scoreboard`     | Lider tablosu verilerini getir |
| POST   | `/games`          | Oyun sonucunu kaydet           |
| PUT    | `/scoreboard/:id` | Oyuncu skorunu güncelle        |

> **⚠️ Not:** Production API Render'ın ücretsiz tier'ında host ediliyor. 15 dakika inaktivite sonrası "uyur" ve ilk istekte 30-60 saniye sürebilir (cold start). Demo öncesi [API'yi ziyaret ederek](https://rock-paper-scissors-api-hz7y.onrender.com) ısıtmanız önerilir.

## 🎨 Özellik Vurguları

### State Yönetimi (Pinia)

- **gameStore**: Oyun durumu, seçenekler ve kuralları yönetir
- **scoreStore**: Lider tablosu ve skor güncellemelerini yönetir

### Modern Composition API

Proje, modern Vue 3 Composition API pattern'lerini kullanır:

- **Provide/Inject Pattern**: Modal ve notification yönetimi için merkezi state
- **Custom Composables**: Yeniden kullanılabilir mantık parçaları (`useModal`, `useGame`, `useErrorNotification`)
- **TypeScript Integration**: Güçlü tip güvenliği

### Yeniden Kullanılabilir Komponentler

- **BaseModal**: Responsive davranışa sahip genel modal
- **BaseButton**: Varyantlı stillendirilmiş buton komponenti
- **GamePlayer**: Oyuncu seçim gösterim komponenti

### Responsive Tasarım

- **Desktop**: Sabit genişlikte ortalanmış modaller
- **Mobile**: Optimize edilmiş düzene sahip tam ekran modaller
- **Uyarlanabilir UI**: Close butonu pozisyonu değişir (header → footer)

### Ölçeklenebilirlik

- **Dinamik Veri**: Kurallar ve seçenekler veritabanından yüklenir
- **Yeni Seçenek Ekleme**: `db.json`, SVG komponenti ve tip tanımlamaları güncellenerek genişletilebilir
- **Modüler Yapı**: Komponent bazlı mimari

### Error Handling (Hata Yönetimi)

- **Merkezi Hata Yönetimi**: Tüm API hataları merkezi bir sistem ile yönetilir
- **Kullanıcı Bildirimleri**: Hatalar kullanıcıya anlaşılır mesajlarla gösterilir
- **Error Types**: Network, validation, server ve unknown hata tipleri
- **Auto-hide**: Hata bildirimleri 5 saniye sonra otomatik kapanır
- **Error Recovery**: Hata durumunda oyun durumu güvenli şekilde sıfırlanır

## 📜 Kullanılabilir Scriptler

```bash
npm run dev        # Geliştirme sunucusunu başlat
npm run server     # JSON server'ı başlat (backend)
npm run build      # Production için build al
npm run preview    # Production build'i önizle
npm run lint       # Kodu lint'le ve düzelt
npm run format     # Prettier ile kodu formatla
npm run type-check # TypeScript tip kontrolü
```

## 🌍 Environment Variables

Root dizinde `.env` dosyası oluşturun:

```env
VITE_API_URL=http://localhost:5001  # Local development
# VITE_API_URL=https://rock-paper-scissors-api-hz7y.onrender.com  # Production
```

## 🏗 Mimari Kararlar

- **Composition API**: `<script setup>` ile modern Vue 3 yaklaşımı
- **BEM Metodolojisi**: Sürdürülebilir ve ölçeklenebilir CSS yapısı
- **TypeScript**: Uygulama genelinde tip güvenliği
- **Modüler Tasarım**: Yeni özelliklerle kolayca genişletilebilir
- **Merkezi State**: Pinia ile tek doğruluk kaynağı
- **Hata Yönetimi**: Debug için API interceptor'lar

## 🎨 Kod Kalitesi & Best Practices

### CSS/Styling

- **Tutarlı Color Model**: Tüm projede `rgba` kullanımı, CSS Variables ile merkezi renk yönetimi
- **Scoped Styles**: Inline CSS kullanımı yok, tüm stiller scoped `<style>` bloklarda
- **CSS Variables**: Hard-coded değerler yerine değişkenler

### Algoritmik Yaklaşım

Proje, verimli algoritmalar ve veri yapıları kullanır:

- **Aggregation**: Oyuncu istatistiklerini hesaplama (O(n))
- **Multi-Level Sorting**: Skor, kazanma oranı ve oyun sayısına göre sıralama (O(n log n))
- **Classification**: Oyuncuları performans seviyelerine göre gruplandırma
- **Prediction**: Kazanma oranı tahmini

## 📝 Lisans

Bu proje teknik değerlendirme için oluşturulmuştur.

---

Vue 3 + TypeScript ile ❤️ ile geliştirildi
