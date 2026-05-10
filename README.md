# 📸 AF Studio — Company Profile Website

Website company profile modern untuk AF Studio. Dibangun dengan React + Vite + Tailwind · Express · Prisma + PostgreSQL · Docker.

## 🚀 Setup Development (Langkah per Langkah)

### 1. Install dependencies

```bash
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..
```

### 2. Setup environment

```bash
# Windows PowerShell
Copy-Item .env.example .env

# Isi .env:
# DATABASE_URL="postgresql://postgres:password@localhost:5432/af_studio"
# VITE_GA_ID=G-XXXXXXXXXX (dari Google Analytics)
```

### 3. Jalankan PostgreSQL

Pastikan PostgreSQL sudah terinstall dan running, lalu:

```bash
# Buat database
psql -U postgres -c "CREATE DATABASE af_studio;"
```

Atau pakai Docker untuk database saja:

```bash
docker run -d --name af-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=af_studio -p 5432:5432 postgres:16-alpine
```

### 4. Migrate & Seed database

```bash
cd server
npx prisma migrate dev --name init
node prisma/seed.js
cd ..
```

### 5. Jalankan

```bash
npm run dev
# → http://localhost:3000
```

---

## 🐳 Docker (Production)

```bash
Copy-Item .env.example .env
# Edit .env sesuai kebutuhan

docker compose up --build -d
# → http://localhost:5000
```

---

## 📁 Struktur Project

```
af-studio/
├── client/src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── CookieBanner.jsx       ← Cookie consent + GA
│   │   └── sections/
│   │       ├── Hero.jsx           ← Banner + slideshow
│   │       ├── Services.jsx       ← 3 layanan
│   │       ├── Rooms.jsx          ← 4 ruangan studio
│   │       ├── GalleryPreview.jsx ← Inspirasi pose (preview)
│   │       ├── Testimonials.jsx   ← Review klien
│   │       └── Locations.jsx      ← 4 lokasi + maps
│   └── pages/
│       ├── Home.jsx
│       ├── ServiceDetail.jsx      ← Halaman harga per layanan
│       └── GalleryPage.jsx        ← Galeri + filter kategori
│
├── server/
│   ├── prisma/
│   │   ├── schema.prisma          ← Model DB
│   │   └── seed.js                ← Data awal
│   └── index.js                   ← Express API
│
├── docker-compose.yml             ← PostgreSQL + App
└── Dockerfile
```

## 🔗 API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/services` | Semua layanan + paket harga |
| GET | `/api/services/:slug` | Detail layanan |
| GET | `/api/testimonials` | Semua testimoni |
| GET | `/api/gallery` | Galeri/pose inspirasi |
| POST | `/api/track` | Page view tracking |

## ✏️ Cara Update Konten

Semua konten disimpan di PostgreSQL. Untuk update:

```bash
# Buka Prisma Studio (GUI database)
npm run db:studio
```

Atau edit langsung via `seed.js` dan jalankan ulang:
```bash
npm run db:seed
```

## 📊 Google Analytics Setup

1. Buat akun di analytics.google.com
2. Buat Property baru → Web
3. Copy Measurement ID (format: G-XXXXXXXXXX)
4. Isi di `.env`: `VITE_GA_ID=G-XXXXXXXXXX`
5. Cookie consent sudah terintegrasi — GA hanya load setelah user klik "OK"
