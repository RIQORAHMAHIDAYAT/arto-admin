# Security Policy - arto-admin

**Cakupan:** Admin dashboard (React + Vite)

## Melaporkan kerentanan

Jangan membuka issue publik untuk laporan kerentanan.

Gunakan GitHub **Security Advisories** pada repo ini
(*Security -> Report a vulnerability*), atau hubungi maintainer repo secara private.

Sertakan:

- Deskripsi kerentanan dan dampaknya.
- Langkah reproduksi, mulai dari environment yang dipakai.
- Indikasi dampak: data mana yang bisa dibaca, dan apakah butuh role tertentu.

Target waktu balas: **7 hari kerja**. Setelah perbaikan siap,
perbaikan dirilis lebih dulu; baru kemudian diproses permintaan disclosure.

## Apa yang dianggap kerentanan

| Kategori | Contoh |
| --- | --- |
| Eskalasi privilege | Dashboard admin yang bisa membaca data personal pengguna. |
| Token admin | Sesi dengan role ADMIN atau SUPER_ADMIN. |
| Aggregate endpoint | Endpoint yang mungkin mengembalikan data mentah, bukan agregat. |
| Aksi tanpa konfirmasi | Tindakan destruktif tanpa verifikasi ulang. |

> **Catatan khusus:** Prinsip utama: admin melihat metrik agregat, bukan buku besar pengguna. Pelanggaran di sini berdampak langsung ke privasi pengguna.

## Yang BUKAN kerentanan

- Laporan dari scanner otomatis tanpa bukti reproduksi.
- Saran best practice tanpa dampak nyata (ditangani sebagai issue biasa).
- Rate limit yang sudah aktif dan tidak bisa di-bypass.
- Aplikasi mobile yang sudah di-root atau di-jailbroken.

## Severitas dan penanganan

| Severitas | Contoh | Tindakan |
| --- | --- | --- |
| Critical | Akses data keuangan user lain, auth bypass | Perbaikan dan advisory segera |
| High | IDOR yang dapat dieksploitasi | Perbaikan dalam 1-2 minggu |
| Medium | Pengungkapan terbatas tanpa akses data | Perbaikan pada rilis berikutnya |
| Low | Hardening dan best practice | Backlog |

## Praktik yang wajib dijaga di repo ini

- Tidak ada secret di dalam kode. Semua lewat environment variable.
- Pengguna hanya boleh mengakses data miliknya sendiri: setiap query wajib memfilter `userId`.
- Admin memakai endpoint agregat, bukan data mentah pengguna.
- Input divalidasi di backend, bukan hanya di client.
- Dependency kerentanan ditutup lewat Dependabot dan `npm audit`.
