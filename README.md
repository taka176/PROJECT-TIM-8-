# Todolist

Aplikasi Todo List berbasis web yang dibangun dengan Next.js, mengintegrasikan autentikasi JWT dan database PostgreSQL melalui Drizzle ORM. Aplikasi ini dirancang untuk membantu pengguna mengelola tugas harian dengan antarmuka yang bersih dan minimalis.

Semua operasi data — termasuk autentikasi, pembuatan, pembacaan, pembaruan, dan penghapusan todo — dilakukan melalui Next.js Server Actions yang terhubung langsung ke database. Setiap pengguna memiliki data todo terpisah berdasarkan akun yang terautentikasi.

## Features

- [x] Registrasi akun baru (nama, email, password)
- [x] Login dengan email dan password
- [x] Logout (hapus session)
- [x] Create todo baru
- [x] Read / melihat daftar todo
- [x] Update text todo (edit)
- [x] Toggle status todo (in progress / done)
- [x] Soft delete todo (status → deleted)
- [x] Filter todo berdasarkan status (in progress / done)
- [x] Loading state pada setiap operasi
- [x] Error handling dan validasi input
- [x] Data todo per-user (tidak silang antar pengguna)

## Tech Stack

| Technology | Version | Usage |
|------------|---------|-------|
| Next.js | 16.3.2 | Framework aplikasi (App Router) |
| React | 19.2.8 | UI library |
| TypeScript | ^5 | Bahasa pemrograman |
| Tailwind CSS | ^4 | Styling |
| Drizzle ORM | ^0.45.2 | ORM / query builder |
| Neon PostgreSQL | ^1.1.0 | Database serverless (driver) |
| jose | ^6.2.12 | JWT sign & verify |
| bcrypt | ^6.0.0 | Hashing password |
| Zod | ^4.5.4 | Schema validation |
| lucide-react | ^1.47.0 | Icon library |
| drizzle-kit | ^0.31.10 | Database migration toolkit |

## Application Flow

```text
User
  ↓
Buka Aplikasi
  ↓
┌─────────────────────────┐
│   Cek Session (Cookie)  │
└───────────┬─────────────┘
            ↓
   ┌────────┴────────┐
   │                 │
   ▼                 ▼
Login/Register    Todo List
   │                 │
   ▼                 ▼
Server Action    Server Action
   │                 │
   ▼                 ▼
  Auth DB         Todo DB
   │                 │
   ▼                 ▼
 JWT Cookie     Updated UI
```

## Todo CRUD Flow

### Create Todo

```text
User mengetik task baru
        ↓
Form submit
        ↓
Server Action: postTodos()
        ↓
Validasi input (tidak kosong)
        ↓
Cek autentikasi user
        ↓
Database INSERT → table_list
        ↓
Kembalikan ID baru
        ↓
UI menambahkan todo ke daftar
```

### Read Todo

```text
Halaman Todo dibuka
        ↓
useEffect → fetchData()
        ↓
Server Action: getAllData()
        ↓
Cek autentikasi user
        ↓
Database SELECT → table_list (filter per user, status ≠ deleted)
        ↓
Map data ke format Task
        ↓
UI menampilkan daftar todo
```

### Update Todo (Edit Text)

```text
User klik ikon edit
        ↓
Modal popup muncul
        ↓
User mengubah text → klik Simpan
        ↓
Server Action: updateTodos()
        ↓
Database UPDATE → table_list SET todos = text
        ↓
UI memperbarui text todo
```

### Toggle Status

```text
User klik checkbox
        ↓
Server Action: updateStatusTodos()
        ↓
Status berubah: "in progres" ↔ "done"
        ↓
Database UPDATE → table_list SET status
        ↓
UI memperbarui tampilan (strikethrough, warna)
```

### Delete Todo (Soft Delete)

```text
User klik ikon hapus
        ↓
Server Action: deleteTodos()
        ↓
Database UPDATE → table_list SET status = "deleted"
        ↓
Todo tidak lagi muncul di daftar
(soft delete, data tidak benar-benar terhapus)
```

## Architecture

```text
┌─────────────────────────────────────────────────┐
│                   Frontend                       │
│  page.tsx → Loginril / Register / TodokartUtama │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│              Server Actions                      │
│  action/todos.action.ts                         │
│  action/auth/auth.action.ts                     │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│              Services / Logic                    │
│  lib/todos.service.ts  (TodosService)           │
│  lib/auth/auth.service.ts  (AuthService)        │
│  lib/auth/jwt.ts       (createToken/verify)     │
│  lib/auth/auth.ts      (getCurrentUser)         │
│  lib/auth/getUser.ts   (getAuthenticatedUser)   │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│              Database                            │
│  src/config/db.ts  (Neon + Drizzle)             │
│  src/config/schema.ts  (Table definitions)      │
│  PostgreSQL (Neon Serverless)                   │
└─────────────────────────────────────────────────┘
```

## Server Actions

### Auth Actions (`action/auth/auth.action.ts`)

| Action | Fungsi | Dipanggil dari |
|--------|--------|----------------|
| `loginAction(email, password)` | Login user, set JWT cookie | `page.tsx` → Login form |
| `registerAction(username, email, password)` | Daftar akun baru | `page.tsx` → Register form |
| `getUserLogin()` | Ambil data user dari cookie | `page.tsx` → auth check on mount |
| `logoutAction()` | Hapus cookie token | `TodokartUtama.tsx` → tombol "Keluar" |

### Todo Actions (`action/todos.action.ts`)

| Action | Fungsi | Dipanggil dari |
|--------|--------|----------------|
| `getAllData()` | Ambil semua todo milik user | `TodokartUtama.tsx` → useEffect |
| `getDataByStatus(status)` | Ambil todo berdasarkan status | Tersedia untuk penggunaan masa depan |
| `postTodos(text)` | Buat todo baru | `TodoInputDlu.tsx` → form submit |
| `updateTodos(text, id)` | Update text todo | `TodoItemItem.tsx` → handleEdit |
| `updateStatusTodos(id, status)` | Update status todo | `TodoItemItem.tsx` → handleToggle |
| `deleteTodos(id)` | Soft delete todo | `TodoItemItem.tsx` → handleDelete |

## Database

### Technology

- **Database:** PostgreSQL (Neon Serverless)
- **ORM:** Drizzle ORM
- **Driver:** `@neondatabase/serverless` via `neon-http`

### Tables

#### `userTable`

| Column | Type | Constraint |
|--------|------|------------|
| `id` | integer | Primary key, auto increment |
| `username` | varchar(59) | NOT NULL |
| `email` | varchar(60) | NOT NULL, UNIQUE |
| `password` | varchar(255) | NOT NULL (bcrypt hashed) |

#### `table_list`

| Column | Type | Constraint |
|--------|------|------------|
| `id` | integer | Primary key, auto increment |
| `user` | integer | Foreign key → `userTable.id` (CASCADE delete) |
| `todos` | varchar(50) | DEFAULT "" |
| `status` | enum | "done" \| "in progres" \| "deleted", DEFAULT "in progres" |
| `created_at` | timestamp | DEFAULT NOW(), NOT NULL |

### Relations

```text
userTable (1) ──────── (∞) table_list
     id     ←── foreign key: user
```

Ketika user dihapus, semua todo miliknya ikut terhapus (cascade).

### Status Enum

| Value | Keterangan |
|-------|------------|
| `in progres` | Todo masih dalam pengerjaan |
| `done` | Todo telah selesai |
| `deleted` | Todo telah dihapus (soft delete) |

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Koneksi PostgreSQL (Neon) | Yes |
| `JWT_SECRET` | Secret key untuk signing JWT token | Yes |

Buat file `.env` di root project:

```env
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
JWT_SECRET=your-secret-key-here
```

> **Penting:** Jangan pernah commit file `.env` ke repository. File `.env` sudah masuk dalam `.gitignore`.

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/taka176/PROJECT-TIM-8-.git
cd PROJECT-TIM-8-
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Environment Variables

Buat file `.env` di root project:

```env
DATABASE_URL=your-neon-database-url
JWT_SECRET=your-jwt-secret
```

### 4. Setup Database

Jalankan Drizzle migration untuk membuat tabel di database:

```bash
npx drizzle-kit push
```

> Perintah ini akan membuat tabel `userTable` dan `table_list` di database PostgreSQL kamu.

### 5. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Running the Project

### Development

```bash
npm run dev
```

Server berjalan di `http://localhost:3000` dengan hot reload.

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```text
gitnitnit/
├── app/
│   ├── layout.tsx          # Root layout (font, html structure)
│   ├── page.tsx            # Halaman utama (login/register/todo view)
│   └── globals.css         # Global styles
│
├── Components/
│   ├── Loginril.tsx        # Form login (2-kolom layout)
│   ├── Register.tsx        # Form registrasi (2-kolom layout)
│   ├── TodokartUtama.tsx   # Komponen utama Todo List
│   ├── TodoHeader.tsx      # Header judul dan deskripsi
│   ├── TodoInputDlu.tsx    # Form input todo baru
│   ├── TodoItemItem.tsx    # Item todo individual (edit/delete/toggle)
│   ├── TodoTaskFilter.tsx  # Daftar todo yang sudah difilter
│   └── TodoTombolFilternya.tsx  # Tombol filter (done/in progres)
│
├── action/
│   ├── todos.action.ts     # Server Actions untuk CRUD todo
│   └── auth/
│       └── auth.action.ts  # Server Actions untuk auth (login/register/logout)
│
├── lib/
│   ├── todos.service.ts    # Service layer: operasi database todo
│   └── auth/
│       ├── auth.service.ts # Service layer: login, register, bcrypt
│       ├── auth.ts         # Helper: baca token dari cookie
│       ├── getUser.ts      # Helper: ambil data user terautentikasi
│       ├── jwt.ts          # Helper: create & verify JWT
│       └── valiadtion/
│           └── auth.validation.ts  # Zod schema untuk validasi auth
│
├── src/
│   └── config/
│       ├── db.ts           # Koneksi database (Neon + Drizzle)
│       └── schema.ts       # Database schema (Drizzle ORM)
│
├── public/                 # Static assets
├── drizzle.config.ts       # Konfigurasi Drizzle Kit
├── next.config.ts          # Konfigurasi Next.js
├── tsconfig.json           # Konfigurasi TypeScript
├── postcss.config.mjs      # Konfigurasi PostCSS (Tailwind)
└── package.json            # Dependencies dan scripts
```

## UI Flow

```text
Buka Aplikasi
       ↓
┌──────────────────────────┐
│  Login Page              │
│  - Email + Password      │
│  - Toggle show password  │
│  - "Ingat saya" checkbox │
│  - Link ke Register      │
└──────────┬───────────────┘
           ↓
┌──────────────────────────┐
│  Register Page           │
│  - Nama Lengkap          │
│  - Email                 │
│  - Password              │
│  - Konfirmasi Password   │
│  - Link ke Login         │
└──────────┬───────────────┘
           ↓
┌──────────────────────────┐
│  Todo List Page          │
│  ┌────────────────────┐  │
│  │ Header             │  │
│  ├────────────────────┤  │
│  │ Input Todo Baru    │  │
│  ├────────────────────┤  │
│  │ Daftar Todo        │  │
│  │  - Checkbox toggle │  │
│  │  - Edit (popup)    │  │
│  │  - Delete          │  │
│  ├────────────────────┤  │
│  │ Filter: done /     │  │
│  │         in progres │  │
│  ├────────────────────┤  │
│  │ Sisa task          │  │
│  │ Tombol "Keluar"    │  │
│  └────────────────────┘  │
└──────────────────────────┘
```

## Error & Loading Handling

### Loading States

| Kondisi | Tampilan |
|---------|----------|
| Memuat data todo | "Memuat data..." |
| Submit todo baru | Tombol "+" berubah "..." |
| Toggle status | Checkbox disabled |
| Edit todo | Tombol "Simpan" → "Menyimpan..." |
| Hapus todo | Tombol hapus "..." |
| Login | Tombol "Masuk" → "Memproses..." |
| Register | Tombol "Daftar" → "Memproses..." |

### Error Handling

| Kondisi | Pesan |
|---------|-------|
| Input kosong (create) | "Task tidak boleh kosong" |
| Input kosong (edit) | "Task tidak boleh kosong" |
| Password tidak cocok | "Password tidak cocok" |
| Email sudah terdaftar | "email sudah digunakan" |
| Email/password salah | "Email atau password salah" |
| Belum login | "Silakan login terlebih dahulu" |
| Gagal server | "Gagal menyimpan todo. Silakan coba lagi." |

### Empty State

Ketika tidak ada todo, komponen menampilkan:
> "Belum ada tugas di sini..."

Ketika data kosong dari server:
> "belum ada kegiatan, tambahin dlu boss"

## Development Guidelines

- **Gunakan Server Actions** untuk semua operasi yang melibatkan database. Jangan fetch API endpoint secara langsung dari client.
- **Service layer** (`lib/*.service.ts`) menangani semua query database. Server Actions memanggil service, bukan query langsung.
- **Validasi input** dilakukan di Server Action sebelum ke database (Zod + pengecekan manual).
- **Error handling** dilakukan di setiap level: Server Action, Service, dan UI.
- **Autentikasi** dicek via cookie JWT di Server Actions yang membutuhkan user context.
- **TypeScript** digunakan di seluruh codebase. Hindari penggunaan `any`.
- **Soft delete** digunakan untuk penghapusan todo (status → "deleted"), bukan hard delete.

## Contributing

```text
Pull latest changes
        ↓
Create branch baru
        ↓
Implementasi fitur / perbaikan
        ↓
Test secara manual
        ↓
Commit dengan pesan yang jelas
        ↓
Push branch
        ↓
Buka Pull Request
        ↓
Code Review → Merge
```

### Branch Naming

```bash
git checkout -b feature/nama-fitur
git checkout -b fix/nama-bug
```

### Commit Convention

```bash
git commit -m "feat: tambah fitur filter todo"
git commit -m "fix: perbaiki login validation"
git commit -m "docs: update README"
```

## Troubleshooting

| Masalah | Solusi |
|---------|--------|
| `DATABASE_URL` error | Pastikan file `.env` sudah dibuat dengan URL yang benar |
| `JWT_SECRET belum diset` | Tambahkan `JWT_SECRET` di file `.env` |
| Tabel belum ada | Jalankan `npx drizzle-kit push` untuk membuat tabel |
| Port 3000 sudah digunakan | Jalankan `npm run dev -- -p 3001` atau ubah port |
| `node_modules` belum terinstall | Jalankan `npm install` |
| Build error | Pastikan semua dependency terinstall dan `.env` sudah lengkap |

## Project Status

| Komponen | Status |
|----------|--------|
| Todo CRUD | Completed |
| Database Integration | Completed |
| Authentication (JWT) | Completed |
| User Ownership (per-user todo) | Completed |
| Input Validation | Completed |
| Error Handling | Completed |
| Loading States | Completed |
| Soft Delete | Completed |
| Status Filtering | Completed |

## License

This project is for educational purposes (MAPIL school project).
