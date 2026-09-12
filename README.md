# 🌟 Rasfalz Studio — Digital OS Web Portfolio

<div align="center">

![Rasfalz Studio Banner](https://files.catbox.moe/stbl4b.png)

### **Personal Digital Operating System & Creative Hub**
*Karya portofolio interaktif berbasis Web OS yang memadukan pengalaman Desktop OS & Mobile Android Material You.*

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![CSS3](https://img.shields.io/badge/Style-Vanilla%20CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Lucide Icons](https://img.shields.io/badge/Icons-Lucide%20React-F56565?style=for-the-badge)](https://lucide.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

[🌐 Demo Live](https://github.com/farisganteng220) • [💬 Hubungi Kreator](https://wa.me/6288803293497) • [📄 Unduh CV](https://drive.google.com/file/d/1WCW7GBNgD8fTE4eE0Ecg-xU8GeqFVF4m/view?usp=sharing)

</div>

---

## 📖 Tentang Proyek

**Rasfalz Studio OS** adalah aplikasi web portofolio generasi baru milik **Raihan Salman Alfarisy** (Motion & Graphic Designer). Dibangun dengan arsitektur web modern yang mensimulasikan sistem operasi digital multifungsi:

- 💻 **Mode Desktop OS**: Dilengkapi dock shelf dinamis, multitasking window manager (minimize, maximize, close), widget desktop (jam analog/digital, kalender, catatan, berita, pemutar musik), dan quick settings.
- 📱 **Mode Mobile Android**: Menghadirkan antarmuka khas Android Material You / Pixel UI lengkap dengan status bar interaktif, at-a-glance card, gesture nav-pill, bottom dock, serta modal drawer aplikasi.
- 🎨 **Design System Solid & Clean**: Mengusung estetika visual modern dengan palet warna solid, tipografi tajam, kontras tinggi, dan tanpa efek gradient/glow berlebihan demi kenyamanan mata.

---

## ✨ Fitur Utama

### 🖥️ 1. Lingkungan Dual OS (Adaptive Web OS)
- **Otomatis Deteksi Perangkat**: Menyesuaikan tampilan secara cerdas antara mode Desktop atau Mobile berdasarkan resolusi layar.
- **Window Management**: Jendela aplikasi interaktif dengan transisi halus, kontrol ukuran (fullscreen/restore), dan penutupan multi-instance.
- **Quick Settings & Control Center**: Pengaturan tema (Dark/Light mode), efek suara UI, volume audio latar, serta pintasan cepat.

### 🚀 2. Ekosistem Aplikasi Terpadu
| Aplikasi | Deskripsi |
| :--- | :--- |
| **👤 About Creator** | Profil lengkap, bio, riwayat karier, preview interaktif Curriculum Vitae (CV) PDF, workstation, dan pilar keahlian. |
| **🎨 Portfolio** | Katalog karya motion graphic, poster anime (GFX), video editing dengan filter kategori dan mode Grid/Compact. |
| **🖼️ Gallery** | Showcase visual resolusi tinggi dengan filter kategori dinamis dan fitur lightbox zoom. |
| **🛍️ Online Shop** | Hub toko resmi terverifikasi yang mengarah ke Shopee Mall, Tokopedia, dan TikTok Shop. |
| **💎 Premium Apps** | Marketplace lisensi akun aplikasi editing premium (Alight Motion, CapCut, dll.) dengan stok terverifikasi. |
| **⚡ Commission Services** | Daftar paket jasa desain, animasi, dan editing video dengan jaminan SLA dan estimasi pengerjaan. |
| **💖 Donation Hub** | Dukungan apresiasi kreator dengan scan **Universal QRIS**, Saweria, Trakteer, Sociabuzz, dan PayPal. |
| **👥 Community** | Akses langsung ke grup & saluran resmi WhatsApp serta Telegram dengan data member terkini. |
| **📰 News & Updates** | Artikel berita studio, pengumuman event, patch notes, dan durasi membaca otomatis. |
| **📁 File Explorer** | Peramban file terintegrasi dengan Google Drive untuk mengunduh asset, preset LUTs, dan master project. |
| **🎯 Visual Identity** | Pedoman brand resmi (logo guidelines, kode hex warna, dan tipografi). |
| **📷 Studio Camera** | Simulasi kamera web interaktif dengan live photo/video filter dan mode aspect ratio. |
| **🎵 Music Player** | Pemutar musik floating dengan playlist custom, audio visualizer canvas, dan kontrol volume. |
| **🕹️ Retro Mini Games** | Game santai Snake Arcade dan Tic-Tac-Toe dengan AI Smart Bot terintegrasi. |
| **♿ Accessibility Suite** | Fitur aksesibilitas ramah pengguna: kontras tinggi, penyesuaian ukuran font, pengurangan animasi, dan screen reader helper. |

---

## 🛠️ Teknologi yang Digunakan

- **Frontend Core**: [React 18](https://reactjs.org/) & [React DOM](https://reactjs.org/)
- **Bundler & Dev Server**: [Vite 5](https://vitejs.dev/)
- **Styling**: Vanilla CSS3 (CSS Variables, Flexbox, Grid, Glassmorphism, BEM Modular Architecture)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio & Media**: HTML5 Audio API & Web Audio Visualizer Canvas
- **Video Embeds**: [React YouTube](https://github.com/tjallingt/react-youtube)
- **Visual Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 📁 Struktur Folder

```text
Website Rasfalz Studio/
├── public/                  # Aset publik statis (favicon, audio, images)
├── src/
│   ├── components/          # Komponen modular UI
│   │   ├── audio/           # Player musik floating & canvas audio visualizer
│   │   ├── common/          # WindowFrame, Lightbox, Toast, Brand Icons, dll.
│   │   ├── desktop/         # Desktop Shelf, Calendar, Clock, Notes, QuickSettings
│   │   ├── games/           # Mini-game Tic-Tac-Toe & Snake
│   │   └── mobile/          # Android Dock, Status Bar, App Grid, Nav Pill
│   ├── config/
│   │   └── siteConfig.js    # ⚙️ PUSAT PENGATURAN DATA (Profil, Portofolio, Toko, Donasi)
│   ├── context/             # State Management (OS, Audio, Theme, Accessibility)
│   ├── pages/               # Tampilan halaman utama aplikasi
│   │   ├── AboutPage.jsx
│   │   ├── PortfolioPage.jsx
│   │   ├── GalleryPage.jsx
│   │   ├── OnlineShopPage.jsx
│   │   ├── PremiumAppsPage.jsx
│   │   ├── CommissionPage.jsx
│   │   ├── DonationPage.jsx
│   │   ├── CommunityPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── NewsPage.jsx
│   │   ├── FileExplorerPage.jsx
│   │   ├── VisualIdentityPage.jsx
│   │   ├── CameraPage.jsx
│   │   ├── MusicPage.jsx
│   │   └── GamesPage.jsx
│   ├── styles/              # Modul stylesheet CSS terorganisir
│   │   ├── variables.css    # Palet warna, tema Dark/Light, token desain
│   │   ├── components.css   # Tombol, badge, pill, kartu, dan input
│   │   ├── desktop-os.css   # Styling khusus mode desktop
│   │   ├── mobile-android.css # Styling khusus mode mobile Android
│   │   ├── animations.css   # Keyframe transisi dan efek interaksi
│   │   └── accessibility.css # Aturan aksesibilitas
│   ├── App.jsx              # Routing dan orchestrator aplikasi
│   ├── main.jsx             # Entrypoint React
│   └── index.css            # Reset & global styles
├── index.html               # Dokumen HTML utama
├── package.json             # Dependensi & skrip proyek
├── vite.config.js           # Konfigurasi bundler Vite
└── README.md                # Dokumentasi repositori
```

---

## ⚡ Panduan Instalasi & Menjalankan Lokal

Pastikan Anda telah menginstal **Node.js** (versi 18 ke atas disarankan) dan **npm** di komputer Anda.

### 1. Klon Repositori
```bash
git clone https://github.com/farisganteng220/personal-digital-os-portfolio.git
cd personal-digital-os-portfolio
```

### 2. Instal Dependensi
```bash
npm install
```

### 3. Jalankan Mode Pengembangan
```bash
npm run dev
```
Buka browser dan akses alamat `http://localhost:5173`.

### 4. Build untuk Produksi
```bash
npm run build
```
Hasil build yang telah dioptimasi akan berada di folder `dist/`.

### 5. Pratinjau Hasil Build
```bash
npm run preview
```

---

## ⚙️ Kustomisasi Konten (`siteConfig.js`)

Seluruh data portofolio, profil kreator, nomor WhatsApp, tautan donasi, produk toko, hingga daftar lagu dapat diubah dengan mudah hanya pada satu file:

👉 **[`src/config/siteConfig.js`](src/config/siteConfig.js)**

Beberapa konfigurasi penting yang dapat disesuaikan:
- **`profile`**: Nama, tagline, bio singkat, bio lengkap, avatar, link CV Google Drive, status komisi.
- **`contact`**: Nomor WhatsApp dan username Telegram untuk pemesanan otomatis.
- **`socials`**: Tautan Instagram, TikTok, YouTube, Facebook, GitHub, dll.
- **`portfolios`**: Daftar portofolio gambar/video, kategori, deskripsi, dan link proyek.
- **`onlineShops`**: Tautan toko Shopee, Tokopedia, dan TikTok Shop.
- **`donationPlatforms`**: Gambar QRIS universal dan link platform saweria/trakteer.
- **`premiumApps`**: Katalog produk akun aplikasi digital, harga diskon, dan fitur.
- **`commissionServices`**: Layanan jasa, spesifikasi pengerjaan, dan rentang harga.
- **`musicPlaylist`**: Daftar playlist lagu lokal/streaming.

---

## 👨‍💻 Kreator

**Raihan Salman Alfarisy (Rasfalz Studio)**
* *Motion Designer • Graphic Designer • Video Editor*
* 📍 Sidoarjo, Jawa Timur, Indonesia
* 📧 Email: [raihanalfarisy354@gmail.com](mailto:raihanalfarisy354@gmail.com)
* 💬 WhatsApp: [+62 888-0329-3497](https://wa.me/6288803293497)
* 📸 Instagram: [@rasfalz.std](https://instagram.com/rasfalz.std)
* 🎬 TikTok: [@rasfalz.std](https://tiktok.com/@rasfalz.std)
* 🎥 YouTube: [Raihan (Rasfalz Studio)](https://www.youtube.com/@rasfalz-std)

---

## 📄 Lisensi

Proyek ini didistribusikan di bawah lisensi **MIT License**. Lihat berkas [LICENSE](LICENSE) untuk informasi lebih lanjut.

---

<div align="center">
  <sub>Didesain dan dikembangkan dengan penuh dedikasi oleh <b>Rasfalz Studio</b>. © 2026 Seluruh Hak Cipta Dilindungi.</sub>
</div>
