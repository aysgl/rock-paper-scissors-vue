# 🎮 Taş Kağıt Makas - Vue 3

Vue 3, TypeScript ve Pinia ile geliştirilmiş modern, interaktif Taş Kağıt Makas oyunu. Bilgisayara karşı oynayın ve skorlarınızı lider tablosunda takip edin!

## 🚀 Demo

**Canlı Demo:** [https://rock-paper-scissors-vue-seven.vercel.app/](https://rock-paper-scissors-vue-seven.vercel.app/)

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

### Node.js Kurulumu ve Sürüm Kontrolü

#### 1. Node.js Sürümünüzü Kontrol Edin

```bash
node --version
```

Eğer Node.js kurulu değilse veya sürüm `v20.19.0`'dan düşükse (veya `v22.12.0`'dan düşükse), aşağıdaki adımları takip edin.

#### 2. Node.js Kurulumu

**Seçenek A: Resmi Web Sitesinden İndirme**

1. [Node.js resmi web sitesine](https://nodejs.org/) gidin
2. LTS (Long Term Support) sürümünü indirin (önerilen: v20.x veya v22.x)
3. İndirilen dosyayı çalıştırıp kurulum adımlarını tamamlayın
4. Kurulumu doğrulayın:
   ```bash
   node --version
   npm --version
   ```

**Seçenek B: NVM (Node Version Manager) ile Kurulum (Önerilen)**

NVM ile farklı Node.js sürümlerini yönetebilirsiniz.

**macOS/Linux:**

```bash
# NVM'i kurun
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Terminal'i yeniden başlatın veya şunu çalıştırın:
source ~/.bashrc  # veya ~/.zshrc

# Node.js v20'yi kurun
nvm install 20

# Kurulu sürümü kullanın
nvm use 20

# Varsayılan sürüm olarak ayarlayın
nvm alias default 20
```

**Windows:**

```bash
# Windows için nvm-windows kullanın
# https://github.com/coreybutler/nvm-windows/releases adresinden indirin

# Kurulumdan sonra:
nvm install 20
nvm use 20
```

#### 3. Sürüm Yükseltme

Eğer mevcut Node.js sürümünüz uygun değilse:

**NVM ile:**

```bash
nvm install 20
nvm use 20
```

**Manuel Güncelleme:**

- [Node.js resmi web sitesinden](https://nodejs.org/) yeni sürümü indirip kurun

### Klonlama ve Kurulum

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
│   └── ui/           # Yeniden kullanılabilir UI komponentleri
│       ├── BaseModal.vue
│       ├── BaseButton.vue
│       ├── LeaderBoard.vue
│       ├── RulesModal.vue
│       ├── ScoreBoard.vue
│       └── ErrorNotification.vue  # Hata bildirim komponenti
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

### Seçenekler (Choices)

```json
{
  "id": "rock" | "paper" | "scissors",
  "name": "Rock" | "Paper" | "Scissors"
}
```

### Kurallar (Rules)

```json
{
  "id": "rule-id",
  "winner": "rock" | "paper" | "scissors",
  "loser": "rock" | "paper" | "scissors",
  "verb": "crushes" | "covers" | "cuts"
}
```

### Oyunlar (Games - Loglama)

```json
{
  "id": "unique-id",
  "playerId": "timestamp-based-id",
  "playerChoice": "rock" | "paper" | "scissors",
  "houseChoice": "rock" | "paper" | "scissors",
  "result": "win" | "lose" | "tie",
  "timestamp": "ISO-8601-format"
}
```

### Skor Tablosu (Scoreboard)

```json
{
  "id": "player-id",
  "username": "Player",
  "score": 15,
  "gamesPlayed": 30,
  "wins": 15,
  "losses": 10,
  "ties": 5,
  "winRate": 50
}
```

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

## 🎨 Özellik Vurguları

### State Yönetimi (Pinia)

- **gameStore**: Oyun durumu, seçenekler ve kuralları yönetir
- **scoreStore**: Lider tablosu ve skor güncellemelerini yönetir

### Modern Composition API

Proje, modern Vue 3 Composition API pattern'lerini kullanır:

- **Provide/Inject Pattern**: Modal ve notification yönetimi için merkezi state
- **Custom Composables**: Yeniden kullanılabilir mantık parçaları (`useModal`, `useGame`, vb.)
- **TypeScript Integration**: Güçlü tip güvenliği ile gelişmiş composable'lar

#### 🎯 Composable'lar

**`useModal()`** - Modal state yönetimi

```typescript
const rulesModal = useModal({
  onOpen: () => console.log('Modal açıldı'),
  onClose: () => console.log('Modal kapandı'),
})

rulesModal.open() // Modal'ı aç
rulesModal.close() // Modal'ı kapat
rulesModal.toggle() // Modal durumunu değiştir
```

**`useProvideInject()`** - Merkezi state paylaşımı

```typescript
// Parent komponentte
const rulesModal = useModal()
provideModal(MODAL_INJECTION_KEYS.RULES, rulesModal)

// Child komponentte
const rulesModal = injectModal(MODAL_INJECTION_KEYS.RULES)
rulesModal.open()
```

**`useGame()`** - Oyun mantığı

- `handlePick()`: Oyuncu seçimini işle
- `getRandom()`: Rastgele seçim üret
- `getResultText()`: Sonucu metne çevir (switch-case pattern)

**Avantajları:**

- ✅ **Emit Yerine Inject**: Prop drilling'den kaçınma
- ✅ **Merkezi State**: Tüm modal'lar tek yerden yönetilir
- ✅ **Tip Güvenliği**: TypeScript ile tam tip desteği
- ✅ **Yeniden Kullanılabilirlik**: Composable'lar her yerde kullanılabilir

### Yeniden Kullanılabilir Komponentler

- **BaseModal**: Responsive davranışa sahip genel modal
- **BaseButton**: Varyantlı stillendirilmiş buton komponenti
- **GamePlayer**: Oyuncu seçim gösterim komponenti

### Responsive Tasarım

- **Desktop**: Sabit genişlikte ortalanmış modaller
- **Mobile**: Optimize edilmiş düzene sahip tam ekran modaller
- **Uyarlanabilir UI**: Close butonu pozisyonu değişir (header → footer)

### Ölçeklenebilirlik

- **Backend:** Kurallar ve seçenekler veritabanından dinamik yüklenir
- **Yeni Seçenek Ekleme:** Lizard, Spock gibi yeni seçenekler için:
  - `db.json`'a yeni choice ve rule eklenir
  - SVG komponenti oluşturulur
  - `game.types.ts` ve `gameIcons.ts` güncellenir
- **Modüler Tasarım:** Komponent bazlı mimari kolay değişiklik sağlar

### Error Handling (Hata Yönetimi)

Proje, güçlü ve kullanıcı dostu bir hata yönetim sistemi içerir:

#### 🛡️ Hata Yönetim Özellikleri

- **Merkezi Hata Yönetimi**: Tüm API hataları merkezi bir sistem ile yönetilir
- **Kullanıcı Bildirimleri**: Hatalar kullanıcıya anlaşılır mesajlarla gösterilir
- **Loading State**: API çağrıları sırasında yükleme durumu takibi
- **Error State**: Her store kendi hata durumunu yönetir
- **Error Types**: Network, validation, server ve unknown hata tipleri
- **Auto-hide Notifications**: Hata bildirimleri 5 saniye sonra otomatik kapanır
- **Error Recovery**: Hata durumunda oyun durumu güvenli şekilde sıfırlanır

#### 📁 Hata Yönetim Dosyaları

```
src/
├── types/
│   └── error.types.ts           # Hata tipleri
├── utils/
│   └── errorHandler.ts          # Merkezi hata yönetim utility'leri
├── components/ui/
│   └── ErrorNotification.vue    # Hata bildirim komponenti
└── composables/
    └── useErrorNotification.ts  # Hata bildirim composable'ı
```

#### 🔧 Hata Yönetimi Kullanımı

**Store'larda:**

```typescript
try {
  const { data } = await api.get('/endpoint')
  this.data = data
} catch (error) {
  const apiError = handleError('contextName', error, true)
  this.error = {
    hasError: true,
    message: apiError.message,
    code: apiError.code,
  }
  throw error
} finally {
  this.isLoading = false
}
```

**Komponentlerde:**

```vue
<ErrorNotification :error="currentError" :show="showNotification" @close="closeNotification" />
```

#### 🔍 Hata Tipleri

| Tip          | Açıklama                    | Örnek Mesaj                                    |
| ------------ | --------------------------- | ---------------------------------------------- |
| `network`    | İnternet bağlantı hataları  | "Network error. Please check your internet..." |
| `validation` | Geçersiz istek/veri         | "Validation error: Invalid input"              |
| `server`     | Sunucu tarafı hatalar (5xx) | "Server error. Please try again later"         |
| `unknown`    | Bilinmeyen hatalar          | "An unexpected error occurred"                 |

#### 🎯 Hata Önleme

- **Divide by Zero**: `calculateWinRate()` fonksiyonunda sıfıra bölme kontrolü
- **Null Checks**: Data olmadan işlem yapılmaz
- **Try-Catch**: Tüm async işlemlerde hata yakalama
- **API Timeout**: 10 saniye timeout ile sonsuz bekleme engellenir

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

### Local Development

Root dizinde `.env` dosyası oluşturun:

```env
VITE_API_URL=http://localhost:5001
```

### Production

Vercel'de environment variable olarak ayarlanmış:

```env
VITE_API_URL=https://rock-paper-scissors-api-hz7y.onrender.com
```

## 🏗 Mimari Kararlar

- **Composition API**: `<script setup>` ile modern Vue 3 yaklaşımı
- **BEM Metodolojisi**: Sürdürülebilir ve ölçeklenebilir CSS yapısı
- **TypeScript**: Uygulama genelinde tip güvenliği
- **Modüler Tasarım**: Yeni özelliklerle kolayca genişletilebilir
- **Merkezi State**: Pinia ile tek doğruluk kaynağı
- **Hata Yönetimi**: Debug için API interceptor'lar

## 🎨 Kod Kalitesi & Best Practices

### CSS/Styling Best Practices

**✅ Tutarlı Color Model**

- Tüm projede **rgba** kullanımı (hsla yerine)
- CSS Variables ile merkezi renk yönetimi
- Hard-coded renk değerleri yok

```scss
// ❌ Önce: Tutarsız ve hard-coded
color: hsla(160, 100%, 37%, 1);
background: #3b4262;

// ✅ Sonra: Tutarlı ve değişken
color: var(--rps-green);
background: var(--rps-text-dark);
```

**✅ Scoped Styles**

- Inline CSS kullanımı yok
- Tüm stiller scoped `<style>` bloklar içinde
- CSS Variables ile dinamik değerler

```vue
<!-- ❌ Önce: Inline CSS -->
<span style="font-size: 12px">Text</span>

<!-- ✅ Sonra: Scoped style -->
<span class="text-label">Text</span>
<style scoped>
.text-label {
  font-size: var(--font-xs);
}
</style>
```

### Algoritmik Programlama

Proje, gelişmiş algoritmalar ve veri yapıları içerir:

#### 📊 Aggregation Algorithm (O(n))

```typescript
// Reduce pattern ile istatistik hesaplama
export const calculateAggregateStats = (players: LeaderboardAPI[]) => {
  return players.reduce(
    (acc, player) => ({
      totalGames: acc.totalGames + player.gamesPlayed,
      totalWins: acc.totalWins + player.wins,
      highestScore: Math.max(acc.highestScore, player.score),
      // ...
    }),
    initialValue,
  )
}
```

#### 🔀 Multi-Level Sorting (O(n log n))

```typescript
// Primary, secondary, tertiary sorting
export const getTopPlayers = (players: LeaderboardAPI[], count: number) => {
  return [...players]
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score // Primary
      if (b.winRate !== a.winRate) return b.winRate - a.winRate // Secondary
      return b.gamesPlayed - a.gamesPlayed // Tertiary
    })
    .slice(0, count)
}
```

#### 🎯 Classification Algorithm

```typescript
// Oyuncuları performans seviyelerine göre gruplandırma
export const groupPlayersByPerformance = (players: LeaderboardAPI[]) => {
  return players.reduce(
    (groups, player) => {
      if (player.gamesPlayed < 5) groups.beginner.push(player)
      else if (player.winRate >= 70) groups.expert.push(player)
      else if (player.winRate >= 50) groups.advanced.push(player)
      else groups.intermediate.push(player)
      return groups
    },
    { expert: [], advanced: [], intermediate: [], beginner: [] },
  )
}
```

#### 📈 Predictive Algorithm

```typescript
// Linear extrapolation ile kazanma oranı tahmini
export const predictWinRate = (
  player: LeaderboardAPI,
  additionalGames: number,
  expectedWins: number,
): number => {
  const totalFutureGames = player.gamesPlayed + additionalGames
  const totalFutureWins = player.wins + expectedWins
  return Math.round((totalFutureWins / totalFutureGames) * 100)
}
```

#### ⚡ Pattern Matching Algorithm

```typescript
// Streak potential calculation
export const calculateStreakPotential = (wins: number, losses: number): number => {
  const winRatio = wins / (wins + losses)
  return Math.round(winRatio * 100)
}
```

**Algoritma Kompleksite Analizi:**

- `calculateAggregateStats`: **O(n)** - Linear time
- `getTopPlayers`: **O(n log n)** - Linearithmic (sorting)
- `groupPlayersByPerformance`: **O(n)** - Linear time with classification
- `predictWinRate`: **O(1)** - Constant time
- `calculateStreakPotential`: **O(1)** - Constant time

## 📝 Lisans

Bu proje teknik değerlendirme için oluşturulmuştur.

---

Vue 3 + TypeScript ile ❤️ ile geliştirildi
