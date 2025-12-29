# Smart PTUR - Sistem Penilaian Karyawan

Aplikasi web untuk penilaian karyawan terbaik menggunakan metode Weighted Product (WP). Dibangun dengan **Next.js 16**, **React 19**, **Drizzle ORM**, dan **TailwindCSS 4**.

---

## Daftar Isi

- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Setup Database](#setup-database)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Perintah yang Tersedia](#perintah-yang-tersedia)
- [Struktur Proyek](#struktur-proyek)
- [Troubleshooting](#troubleshooting)

---

## Prasyarat

Pastikan sistem Anda sudah terinstall software berikut:

### 1. Bun (Runtime JavaScript)

Proyek ini menggunakan **Bun** sebagai runtime dan package manager. Install Bun dengan salah satu cara berikut:

**Windows (PowerShell):**
```powershell
irm bun.sh/install.ps1 | iex
```

**macOS/Linux:**
```bash
curl -fsSL https://bun.sh/install | bash
```

Verifikasi instalasi:
```bash
bun --version
```

### 2. MySQL Server

Untuk development lokal, Anda bisa menggunakan salah satu dari:

- **XAMPP** (Rekomendasi untuk Windows) - Download di [apachefriends.org](https://www.apachefriends.org/)
- **MySQL Community Server** - Download di [mysql.com](https://dev.mysql.com/downloads/)
- **Docker** - Jalankan image MySQL resmi

**Pastikan MySQL berjalan di port `3306` (default).**

### 3. Git (Opsional)

Untuk clone repository:
```bash
git --version
```

---

## Instalasi

### 1. Clone Repository

```bash
git clone <repository-url>
cd smart-ptur
```

Atau jika sudah memiliki folder proyek, langsung masuk ke direktori:
```bash
cd smart-ptur
```

### 2. Install Dependencies

```bash
bun install
```

Proses ini akan menginstall semua package yang diperlukan, termasuk:
- Next.js 16 dengan Turbopack
- React 19
- Drizzle ORM
- TailwindCSS 4
- shadcn/ui components
- Dan lainnya

---

## Konfigurasi Environment

### 1. Buat File Environment

Salin file `.env.example` menjadi `.env.local`:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env.local

# macOS/Linux
cp .env.example .env.local
```

### 2. Edit File `.env.local`

Buka file `.env.local` dan sesuaikan konfigurasi:

```env
# ===========================================
# Pengaturan Database
# ===========================================

# Untuk Development Lokal (MySQL/XAMPP)
DATABASE_URL=mysql://root:@localhost:3306/smart_ptur

# Untuk Production (TiDB Cloud)
# DATABASE_URL=mysql://user:password@gateway.region.shared.aws.tidbcloud.com:4000/database?ssl={"rejectUnauthorized":true}

# ===========================================
# Pengaturan Aplikasi
# ===========================================

# Environment: "development" atau "production"
NODE_ENV=development

# Session Secret (WAJIB diubah untuk production!)
# Generate dengan: openssl rand -base64 32
SESSION_SECRET=your-secret-key-here
```

### Penjelasan Variabel Environment

| Variabel | Deskripsi | Contoh Nilai |
|----------|-----------|--------------|
| `DATABASE_URL` | URL koneksi database MySQL | `mysql://root:@localhost:3306/smart_ptur` |
| `NODE_ENV` | Mode environment aplikasi | `development` atau `production` |
| `SESSION_SECRET` | Kunci rahasia untuk enkripsi session | String acak minimal 32 karakter |

---

## Setup Database

### 1. Buat Database di MySQL

Buka MySQL client (phpMyAdmin, MySQL Workbench, atau CLI) dan buat database baru:

```sql
CREATE DATABASE smart_ptur CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**Menggunakan XAMPP (phpMyAdmin):**
1. Buka browser dan akses `http://localhost/phpmyadmin`
2. Klik tab "Databases"
3. Masukkan nama database: `smart_ptur`
4. Pilih collation: `utf8mb4_unicode_ci`
5. Klik "Create"

### 2. Push Schema Database

Jalankan perintah berikut untuk membuat tabel-tabel di database:

```bash
bun run db:push
```

Perintah ini akan membuat tabel-tabel berikut:
- `users` - Data pengguna sistem
- `employees` - Data karyawan
- `criteria` - Kriteria penilaian
- `periods` - Periode penilaian
- `scores` - Nilai karyawan per periode

### 3. Seed Data Awal (Opsional)

Untuk mengisi database dengan data contoh:

```bash
bun run db:seed
```

Data yang akan dibuat:
- **User Admin:** username `admin`, password `admin123`
- **4 Kriteria:** Disiplin, Kehadiran, Prestasi, Tanggung Jawab (masing-masing 25%)
- **5 Karyawan Contoh:** C1-C5
- **1 Periode Penilaian:** Oktober 2025
- **Nilai Contoh:** Untuk semua karyawan

---

## Menjalankan Aplikasi

### Development Mode

Jalankan server development dengan hot-reload:

```bash
bun run dev
```

Aplikasi akan berjalan di: **http://localhost:3000**

### Production Mode

1. Build aplikasi:
```bash
bun run build
```

2. Jalankan server production:
```bash
bun run start
```

---

## Perintah yang Tersedia

| Perintah | Deskripsi |
|----------|-----------|
| `bun run dev` | Jalankan server development dengan Turbopack |
| `bun run build` | Build aplikasi untuk production |
| `bun run start` | Jalankan server production |
| `bun run lint` | Jalankan linter (Biome) |
| `bun run format` | Format kode sumber |
| `bun run typecheck` | Cek error TypeScript |
| `bun run db:generate` | Generate file migrasi database |
| `bun run db:migrate` | Jalankan migrasi database |
| `bun run db:push` | Push schema ke database (sync langsung) |
| `bun run db:studio` | Buka Drizzle Studio (GUI database) |
| `bun run db:seed` | Isi database dengan data contoh |

---

## Struktur Proyek

```
smart-ptur/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Route grup autentikasi (login, dll)
│   ├── (dashboard)/       # Route grup dashboard utama
│   ├── _actions/          # Server Actions
│   ├── globals.css        # Style global
│   └── layout.tsx         # Layout utama aplikasi
├── components/            # Komponen React
│   └── ui/               # Komponen UI (shadcn/ui)
├── db/                    # Konfigurasi database
│   ├── index.ts          # Koneksi database
│   ├── schema.ts         # Schema tabel (Drizzle)
│   ├── seed.ts           # Script seed data
│   └── validation.ts     # Validasi schema (Zod)
├── hooks/                 # Custom React hooks
├── lib/                   # Utility dan helper functions
├── public/               # Asset statis
├── .env.example          # Template environment variables
├── .env.local            # Environment variables (lokal)
├── biome.json            # Konfigurasi Biome (linter/formatter)
├── drizzle.config.ts     # Konfigurasi Drizzle Kit
├── next.config.ts        # Konfigurasi Next.js
├── package.json          # Dependencies dan scripts
├── postcss.config.mjs    # Konfigurasi PostCSS
├── tailwind.config.ts    # Konfigurasi TailwindCSS (jika ada)
└── tsconfig.json         # Konfigurasi TypeScript
```

---

## Troubleshooting

### Error: "DATABASE_URL environment variable is not set"

**Penyebab:** File `.env.local` tidak ada atau `DATABASE_URL` tidak dikonfigurasi.

**Solusi:**
1. Pastikan file `.env.local` ada di root proyek
2. Pastikan variabel `DATABASE_URL` sudah diisi dengan benar

### Error: "Connection refused" atau tidak bisa konek ke database

**Penyebab:** MySQL server tidak berjalan atau konfigurasi salah.

**Solusi:**
1. Pastikan MySQL/XAMPP sudah berjalan
2. Cek apakah MySQL berjalan di port 3306
3. Verifikasi username dan password di `DATABASE_URL`

### Error: "Unknown database 'smart_ptur'"

**Penyebab:** Database belum dibuat.

**Solusi:**
Buat database terlebih dahulu:
```sql
CREATE DATABASE smart_ptur CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Error saat `bun install`

**Solusi:**
1. Hapus folder `node_modules` dan file `bun.lock`:
```bash
# Windows (PowerShell)
Remove-Item -Recurse -Force node_modules
Remove-Item bun.lock

# macOS/Linux
rm -rf node_modules bun.lock
```

2. Install ulang:
```bash
bun install
```

### Port 3000 sudah digunakan

**Solusi:**
Jalankan di port lain:
```bash
bun run dev -- -p 3001
```

### Lupa password admin setelah seed

**Solusi:**
- **Username:** `admin`
- **Password:** `admin123`

Atau reset database dan seed ulang:
```bash
bun run db:push
bun run db:seed
```

---

## Login Default

Setelah menjalankan seed, gunakan kredensial berikut untuk login:

| Field | Nilai |
|-------|-------|
| Username | `admin` |
| Password | `admin123` |

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) dengan App Router
- **Runtime:** [Bun](https://bun.sh/)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [TailwindCSS 4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Database:** MySQL / TiDB Serverless
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Linter/Formatter:** [Biome](https://biomejs.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## Deployment

### Vercel (Rekomendasi)

1. Push kode ke GitHub/GitLab/Bitbucket
2. Import proyek di [Vercel](https://vercel.com/new)
3. Tambahkan environment variables:
   - `DATABASE_URL` (gunakan TiDB Serverless untuk production)
   - `SESSION_SECRET`
   - `NODE_ENV=production`
4. Deploy!

### Self-Hosted

1. Build aplikasi:
```bash
bun run build
```

2. Jalankan dengan process manager (PM2, systemd, dll):
```bash
bun run start
```

---

## Lisensi

Proyek ini bersifat privat dan tidak memiliki lisensi publik.
