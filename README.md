# ARTO Admin

Dashboard administrasi ARTO untuk kebutuhan operasional aplikasi: statistik pengguna, statistik transaksi agregat, dan laporan penggunaan. Dibangun konsisten dengan `arto-web` (React 19 + Vite + TypeScript + Tailwind CSS v4).

> Admin tidak boleh mempunyai akses bebas terhadap isi data finansial pribadi pengguna.

## Persyaratan

- Node.js 20+
- Backend ARTO berjalan di `http://localhost:3000` (lihat `../arto-backend/README.md`)

## Menjalankan

```sh
npm install
npm run dev
```

Buka `http://localhost:5174`..

### Akun admin (hasil seed)

- Email: `admin@arto.id`
- Password: `adminpass123`

Jalankan seed backend terlebih dahulu jika akun belum ada:

```sh
cd ../arto-backend
npm run db:seed
```

## Environment

Salin `.env.example` menjadi `.env.local` lalu sesuaikan jika port backend berbeda:

```
VITE_API_URL=http://localhost:3000/api
```

## Scripts

| Script           | Deskripsi                               |
| ---------------- | --------------------------------------- |
| `npm run dev`    | Menjalankan dev server (port 5174)      |
| `npm run build`  | Type-check + build produksi             |
| `npm run lint`   | Lint dengan oxlint                      |
| `npm run test`   | Menjalankan test dengan vitest          |
| `npm run preview`| Pratinjau hasil build                   |

## Halaman

- **Overview** — ringkasan statistik aplikasi (`/admin/overview`)
- **Pengguna** — daftar pengguna beserta jumlah aktivitas (`/admin/users/statistics`)
- **Transaksi** — statistik transaksi agregat dan pengeluaran per kategori (`/admin/transactions/statistics`)

Semua endpoint admin dilindungi peran `ADMIN`/`SUPER_ADMIN` di sisi backend (`RolesGuard`). Aplikasi ini hanya menampilkan data agregat, bukan data finansial pribadi.

## Struktur

```
src/
  components/   Komponen UI + layout + kartu statistik admin
  context/      AuthContext & ThemeContext
  data/api/     API client dan endpoint admin
  hooks/        useAsync
  lib/          Util (currency, date, error message)
  pages/        Halaman (auth, overview, users, transactions)
  types/        Tipe data kontrak API
```