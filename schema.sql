-- ==========================================================
-- SKRIP DATABASE MYSQL: SISTEM INFORMASI GURU & TENAGA KEPENDIDIKAN (GTK)
-- ==========================================================
-- Anda dapat mengimpor file ini langsung ke phpMyAdmin atau MySQL CLI

CREATE DATABASE IF NOT EXISTS db_sekolah;
USE db_sekolah;

-- 1. Buat Tabel Data GTK
CREATE TABLE IF NOT EXISTS gtk (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(150) NOT NULL,
    nip VARCHAR(30) DEFAULT '-',
    nuptk VARCHAR(25) DEFAULT '-',
    jenis_kelamin ENUM('L', 'P') NOT NULL,
    tipe ENUM('Guru', 'Tenaga Kependidikan') NOT NULL,
    jabatan VARCHAR(100) NOT NULL,
    tugas_tambahan VARCHAR(100) DEFAULT '-',
    status_kepegawaian ENUM('PNS', 'PPPK', 'GTT', 'PTT', 'Honorer', 'Yayasan') NOT NULL,
    golongan VARCHAR(20) DEFAULT '-',
    pendidikan_terakhir ENUM('SMA/SMK', 'D3', 'D4', 'S1', 'S2', 'S3') NOT NULL,
    jurusan VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telepon VARCHAR(20) NOT NULL,
    alamat TEXT NOT NULL,
    tanggal_lahir DATE NULL,
    tanggal_bergabung DATE NULL,
    status_aktif ENUM('Aktif', 'Cuti', 'Pensiun', 'Mutasi') NOT NULL DEFAULT 'Aktif',
    foto_url TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Data Awal (Sample Seeds)
INSERT INTO gtk (nama, nip, nuptk, jenis_kelamin, tipe, jabatan, tugas_tambahan, status_kepegawaian, golongan, pendidikan_terakhir, jurusan, email, telepon, alamat, tanggal_lahir, tanggal_bergabung, status_aktif, foto_url)
VALUES
('Drs. H. Ahmad Fauzi, M.Pd.', '196803151994031002', '3456789012345678', 'L', 'Guru', 'Guru Bahasa Indonesia', 'Kepala Sekolah', 'PNS', 'IV/b', 'S2', 'Pendidikan Bahasa & Sastra Indonesia', 'ahmad.fauzi@sekolah.sch.id', '081234567801', 'Jl. Merdeka No. 45, Bandung', '1968-03-15', '1994-03-01', 'Aktif', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'),
('Siti Rahmawati, S.Pd., M.Si.', '197508212000032001', '8901234567890123', 'P', 'Guru', 'Guru Matematika', 'Wakil Kepala Kurikulum', 'PNS', 'IV/a', 'S2', 'Pendidikan Matematika', 'siti.rahma@sekolah.sch.id', '081234567802', 'Jl. Sukajadi No. 12, Bandung', '1975-08-21', '2000-03-01', 'Aktif', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'),
('Budi Santoso, S.Kom.', '198811122019021003', '4567890123456789', 'L', 'Guru', 'Guru Informatika / TIK', 'Pembina Ekstrakurikuler Robotik', 'PPPK', 'IX', 'S1', 'Teknik Informatika', 'budi.santoso@sekolah.sch.id', '081234567803', 'Jl. Dago Asri No. 8, Bandung', '1988-11-12', '2019-02-01', 'Aktif', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'),
('Dewi Lestari, S.Pd.', '-', '5678901234567890', 'P', 'Guru', 'Guru Bahasa Inggris', 'Wali Kelas 10-A', 'GTT', '-', 'S1', 'Pendidikan Bahasa Inggris', 'dewi.lestari@sekolah.sch.id', '081234567804', 'Jl. Cihampelas No. 88, Bandung', '1992-05-18', '2018-07-15', 'Aktif', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'),
('Rahmat Hidayat, S.E.', '198204102008011007', '-', 'L', 'Tenaga Kependidikan', 'Kepala Tata Usaha', 'Bendahara BOS', 'PNS', 'III/c', 'S1', 'Manajemen Keuangan', 'rahmat.tu@sekolah.sch.id', '081234567805', 'Jl. Buah Batu No. 102, Bandung', '1982-04-10', '2008-01-01', 'Aktif', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'),
('Nurul Aini, A.Md.IP.', '-', '-', 'P', 'Tenaga Kependidikan', 'Kepala Perpustakaan', 'Pengelola Literasi Digital', 'Honorer', '-', 'D3', 'Ilmu Perpustakaan & Informasi', 'nurul.pustaka@sekolah.sch.id', '081234567806', 'Jl. Antapani Raya No. 15, Bandung', '1995-09-03', '2020-01-10', 'Aktif', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'),
('Agus Prabowo, S.Pd.', '198506142010011012', '6789012345678901', 'L', 'Guru', 'Guru Pendidikan Jasmani (PJOK)', 'Pembina OSIS', 'PNS', 'III/d', 'S1', 'Pendidikan Jasmani dan Kesehatan', 'agus.pjok@sekolah.sch.id', '081234567807', 'Jl. Pasir Kaliki No. 24, Bandung', '1985-06-14', '2010-01-01', 'Aktif', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'),
('Eka Wahyuni, S.Kom.', '-', '-', 'P', 'Tenaga Kependidikan', 'Operator Dapodik & IT Staff', 'Admin PDUM & SIMPATIKA', 'PTT', '-', 'S1', 'Sistem Informasi', 'eka.operator@sekolah.sch.id', '081234567808', 'Jl. Setiabudi No. 56, Bandung', '1994-01-27', '2021-08-01', 'Aktif', 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80');
