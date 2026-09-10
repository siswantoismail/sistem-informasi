import mysql from "mysql2/promise";
import { execSync } from "child_process";
import { GTKItem, GTKFormData, GTKStats, DbStatus } from "../src/types.ts";

const initialData: Omit<GTKItem, "created_at" | "updated_at">[] = [
  {
    id: 1,
    nama: "Drs. H. Ahmad Fauzi, M.Pd.",
    nip: "196803151994031002",
    nuptk: "3456789012345678",
    jenis_kelamin: "L",
    tipe: "Guru",
    jabatan: "Guru Bahasa Indonesia",
    tugas_tambahan: "Kepala Sekolah",
    status_kepegawaian: "PNS",
    golongan: "IV/b",
    pendidikan_terakhir: "S2",
    jurusan: "Pendidikan Bahasa & Sastra Indonesia",
    email: "ahmad.fauzi@sekolah.sch.id",
    telepon: "081234567801",
    alamat: "Jl. Merdeka No. 45, Bandung",
    tanggal_lahir: "1968-03-15",
    tanggal_bergabung: "1994-03-01",
    status_aktif: "Aktif",
    foto_url:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    nama: "Siti Rahmawati, S.Pd., M.Si.",
    nip: "197508212000032001",
    nuptk: "8901234567890123",
    jenis_kelamin: "P",
    tipe: "Guru",
    jabatan: "Guru Matematika",
    tugas_tambahan: "Wakil Kepala Kurikulum",
    status_kepegawaian: "PNS",
    golongan: "IV/a",
    pendidikan_terakhir: "S2",
    jurusan: "Pendidikan Matematika",
    email: "siti.rahma@sekolah.sch.id",
    telepon: "081234567802",
    alamat: "Jl. Sukajadi No. 12, Bandung",
    tanggal_lahir: "1975-08-21",
    tanggal_bergabung: "2000-03-01",
    status_aktif: "Aktif",
    foto_url:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    nama: "Budi Santoso, S.Kom.",
    nip: "198811122019021003",
    nuptk: "4567890123456789",
    jenis_kelamin: "L",
    tipe: "Guru",
    jabatan: "Guru Informatika / TIK",
    tugas_tambahan: "Pembina Robotik",
    status_kepegawaian: "PPPK",
    golongan: "IX",
    pendidikan_terakhir: "S1",
    jurusan: "Teknik Informatika",
    email: "budi.santoso@sekolah.sch.id",
    telepon: "081234567803",
    alamat: "Jl. Dago Asri No. 8, Bandung",
    tanggal_lahir: "1988-11-12",
    tanggal_bergabung: "2019-02-01",
    status_aktif: "Aktif",
    foto_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    nama: "Dewi Lestari, S.Pd.",
    nip: "-",
    nuptk: "5678901234567890",
    jenis_kelamin: "P",
    tipe: "Guru",
    jabatan: "Guru Bahasa Inggris",
    tugas_tambahan: "Wali Kelas 10-A",
    status_kepegawaian: "GTT",
    golongan: "-",
    pendidikan_terakhir: "S1",
    jurusan: "Pendidikan Bahasa Inggris",
    email: "dewi.lestari@sekolah.sch.id",
    telepon: "081234567804",
    alamat: "Jl. Cihampelas No. 88, Bandung",
    tanggal_lahir: "1992-05-18",
    tanggal_bergabung: "2018-07-15",
    status_aktif: "Aktif",
    foto_url:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    nama: "Rahmat Hidayat, S.E.",
    nip: "198204102008011007",
    nuptk: "-",
    jenis_kelamin: "L",
    tipe: "Tenaga Kependidikan",
    jabatan: "Kepala Tata Usaha",
    tugas_tambahan: "Bendahara BOS",
    status_kepegawaian: "PNS",
    golongan: "III/c",
    pendidikan_terakhir: "S1",
    jurusan: "Manajemen Keuangan",
    email: "rahmat.tu@sekolah.sch.id",
    telepon: "081234567805",
    alamat: "Jl. Buah Batu No. 102, Bandung",
    tanggal_lahir: "1982-04-10",
    tanggal_bergabung: "2008-01-01",
    status_aktif: "Aktif",
    foto_url:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    nama: "Nurul Aini, A.Md.IP.",
    nip: "-",
    nuptk: "-",
    jenis_kelamin: "P",
    tipe: "Tenaga Kependidikan",
    jabatan: "Kepala Perpustakaan",
    tugas_tambahan: "Pengelola Literasi Digital",
    status_kepegawaian: "Honorer",
    golongan: "-",
    pendidikan_terakhir: "D3",
    jurusan: "Ilmu Perpustakaan & Informasi",
    email: "nurul.pustaka@sekolah.sch.id",
    telepon: "081234567806",
    alamat: "Jl. Antapani Raya No. 15, Bandung",
    tanggal_lahir: "1995-09-03",
    tanggal_bergabung: "2020-01-10",
    status_aktif: "Aktif",
    foto_url:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    nama: "Agus Prabowo, S.Pd.",
    nip: "198506142010011012",
    nuptk: "6789012345678901",
    jenis_kelamin: "L",
    tipe: "Guru",
    jabatan: "Guru Penjasorkes (PJOK)",
    tugas_tambahan: "Pembina OSIS",
    status_kepegawaian: "PNS",
    golongan: "III/d",
    pendidikan_terakhir: "S1",
    jurusan: "Pendidikan Jasmani dan Kesehatan",
    email: "agus.pjok@sekolah.sch.id",
    telepon: "081234567807",
    alamat: "Jl. Pasir Kaliki No. 24, Bandung",
    tanggal_lahir: "1985-06-14",
    tanggal_bergabung: "2010-01-01",
    status_aktif: "Aktif",
    foto_url:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 8,
    nama: "Eka Wahyuni, S.Kom.",
    nip: "-",
    nuptk: "-",
    jenis_kelamin: "P",
    tipe: "Tenaga Kependidikan",
    jabatan: "Operator Dapodik & IT",
    tugas_tambahan: "Admin SIMPATIKA",
    status_kepegawaian: "PTT",
    golongan: "-",
    pendidikan_terakhir: "S1",
    jurusan: "Sistem Informasi",
    email: "eka.operator@sekolah.sch.id",
    telepon: "081234567808",
    alamat: "Jl. Setiabudi No. 56, Bandung",
    tanggal_lahir: "1994-01-27",
    tanggal_bergabung: "2021-08-01",
    status_aktif: "Aktif",
    foto_url:
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
  },
];

// MySQL connection pool holder
let mysqlPool: mysql.Pool | null = null;
let isMysqlActive = false;
let mysqlStatusMsg = "Inisialisasi Database MySQL...";

function ensureMySQLDaemon(): void {
  try {
    try {
      execSync("/etc/init.d/mariadb status", { stdio: "ignore" });
    } catch {
      console.log("[Database] Menjalankan server MariaDB/MySQL...");
      execSync("/etc/init.d/mariadb start || service mariadb start", {
        stdio: "ignore",
      });
    }
  } catch (err: any) {
    console.warn(
      "[Database] Peringatan saat memastikan service MySQL berjalan:",
      err?.message,
    );
  }
}

export async function initDatabase(): Promise<void> {
  const host = process.env.MYSQL_HOST || "127.0.0.1";
  const user = process.env.MYSQL_USER || "root";
  const password = process.env.MYSQL_PASSWORD || "";
  const database = process.env.MYSQL_DATABASE || "db_sekolah";
  const port = Number(process.env.MYSQL_PORT) || 3306;

  // Auto-start MySQL daemon if localhost
  if (host === "127.0.0.1" || host === "localhost") {
    ensureMySQLDaemon();
  }

  try {
    console.log(`[Database] Menghubungkan ke MySQL di ${host}:${port}...`);

    // First ensure database exists
    const adminConnection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      connectTimeout: 5000,
    });
    await adminConnection.query(
      `CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    await adminConnection.end();

    // Create pool for the targeted database
    const pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 15,
      queueLimit: 0,
      connectTimeout: 5000,
      dateStrings: true, // Return dates as string YYYY-MM-DD
    });

    // Test connection
    await pool.query("SELECT 1 as ping");

    // Create GTK table if not exists
    await pool.query(`
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
    `);

    // Check if table is empty, if so seed it
    const [countResult]: any = await pool.query(
      "SELECT COUNT(*) as count FROM gtk",
    );
    if (countResult[0]?.count === 0) {
      console.log("[Database] Mengisi data awal ke tabel gtk di MySQL...");
      for (const item of initialData) {
        await pool.query(
          `INSERT INTO gtk (
            id, nama, nip, nuptk, jenis_kelamin, tipe, jabatan, tugas_tambahan,
            status_kepegawaian, golongan, pendidikan_terakhir, jurusan, email,
            telepon, alamat, tanggal_lahir, tanggal_bergabung, status_aktif, foto_url
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            item.id,
            item.nama,
            item.nip,
            item.nuptk,
            item.jenis_kelamin,
            item.tipe,
            item.jabatan,
            item.tugas_tambahan || "-",
            item.status_kepegawaian,
            item.golongan || "-",
            item.pendidikan_terakhir,
            item.jurusan,
            item.email,
            item.telepon,
            item.alamat,
            item.tanggal_lahir || null,
            item.tanggal_bergabung || null,
            item.status_aktif,
            item.foto_url || null,
          ],
        );
      }
      console.log("[Database] Berhasil memuat data awal ke MySQL.");
    }

    mysqlPool = pool;
    isMysqlActive = true;
    mysqlStatusMsg = `Database MySQL Terhubung (${host}:${port}/${database}). Seluruh perubahan data tersimpan langsung di MySQL.`;
    console.log("[Database] " + mysqlStatusMsg);
  } catch (err: any) {
    console.error("[Database] Kesalahan koneksi MySQL:", err.message);
    mysqlStatusMsg = `Koneksi MySQL Gagal: ${err.message}`;
    throw err;
  }
}

function getPool(): mysql.Pool {
  if (!mysqlPool) {
    throw new Error("Database MySQL belum terhubung.");
  }
  return mysqlPool;
}

export function getDbStatus(): DbStatus {
  return {
    mode: "mysql",
    connected: isMysqlActive,
    database: process.env.MYSQL_DATABASE || "db_sekolah",
    host: process.env.MYSQL_HOST || "127.0.0.1",
    message: mysqlStatusMsg,
  };
}

export async function getAllGTK(params: {
  q?: string;
  tipe?: string;
  status?: string;
}): Promise<GTKItem[]> {
  const pool = getPool();
  const { q, tipe, status } = params;

  let query = "SELECT * FROM gtk WHERE 1=1";
  const queryParams: any[] = [];

  if (tipe && tipe !== "Semua") {
    query += " AND tipe = ?";
    queryParams.push(tipe);
  }

  if (status && status !== "Semua") {
    query += " AND status_kepegawaian = ?";
    queryParams.push(status);
  }

  if (q && q.trim()) {
    const term = `%${q.trim()}%`;
    query +=
      " AND (nama LIKE ? OR nip LIKE ? OR nuptk LIKE ? OR jabatan LIKE ? OR email LIKE ? OR jurusan LIKE ?)";
    queryParams.push(term, term, term, term, term, term);
  }

  query += " ORDER BY id DESC";

  const [rows] = await pool.query(query, queryParams);
  return rows as GTKItem[];
}

export async function getGTKById(id: number): Promise<GTKItem | null> {
  const pool = getPool();
  const [rows]: any = await pool.query("SELECT * FROM gtk WHERE id = ?", [id]);
  if (rows && rows.length > 0) {
    return rows[0] as GTKItem;
  }
  return null;
}

export async function createGTK(data: GTKFormData): Promise<GTKItem> {
  const pool = getPool();
  const [result]: any = await pool.query(
    `INSERT INTO gtk (
      nama, nip, nuptk, jenis_kelamin, tipe, jabatan, tugas_tambahan,
      status_kepegawaian, golongan, pendidikan_terakhir, jurusan, email,
      telepon, alamat, tanggal_lahir, tanggal_bergabung, status_aktif, foto_url
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.nama,
      data.nip || "-",
      data.nuptk || "-",
      data.jenis_kelamin,
      data.tipe,
      data.jabatan,
      data.tugas_tambahan || "-",
      data.status_kepegawaian,
      data.golongan || "-",
      data.pendidikan_terakhir,
      data.jurusan,
      data.email,
      data.telepon,
      data.alamat,
      data.tanggal_lahir || null,
      data.tanggal_bergabung || null,
      data.status_aktif || "Aktif",
      data.foto_url || null,
    ],
  );

  const inserted = await getGTKById(result.insertId);
  if (!inserted) {
    throw new Error("Gagal mengambil data yang baru dibuat dari MySQL");
  }
  return inserted;
}

export async function updateGTK(
  id: number,
  data: Partial<GTKFormData>,
): Promise<GTKItem | null> {
  const pool = getPool();
  const allowedFields = [
    "nama",
    "nip",
    "nuptk",
    "jenis_kelamin",
    "tipe",
    "jabatan",
    "tugas_tambahan",
    "status_kepegawaian",
    "golongan",
    "pendidikan_terakhir",
    "jurusan",
    "email",
    "telepon",
    "alamat",
    "tanggal_lahir",
    "tanggal_bergabung",
    "status_aktif",
    "foto_url",
  ];

  const updates: string[] = [];
  const values: any[] = [];

  for (const key of allowedFields) {
    if (key in data) {
      updates.push(`\`${key}\` = ?`);
      let val = (data as any)[key];
      if ((key === "tanggal_lahir" || key === "tanggal_bergabung") && !val) {
        val = null;
      }
      values.push(val);
    }
  }

  if (updates.length > 0) {
    values.push(id);
    await pool.query(
      `UPDATE gtk SET ${updates.join(", ")} WHERE id = ?`,
      values,
    );
  }

  return await getGTKById(id);
}

export async function deleteGTK(id: number): Promise<boolean> {
  const pool = getPool();
  const [result]: any = await pool.query("DELETE FROM gtk WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

export async function getGTKStats(): Promise<GTKStats> {
  const pool = getPool();
  const [totalRows]: any = await pool.query(
    "SELECT COUNT(*) as total FROM gtk",
  );
  const [guruRows]: any = await pool.query(
    "SELECT COUNT(*) as total FROM gtk WHERE tipe = 'Guru'",
  );
  const [tendikRows]: any = await pool.query(
    "SELECT COUNT(*) as total FROM gtk WHERE tipe = 'Tenaga Kependidikan'",
  );
  const [pnsRows]: any = await pool.query(
    "SELECT COUNT(*) as total FROM gtk WHERE status_kepegawaian IN ('PNS', 'PPPK')",
  );
  const [nonPnsRows]: any = await pool.query(
    "SELECT COUNT(*) as total FROM gtk WHERE status_kepegawaian NOT IN ('PNS', 'PPPK')",
  );
  const [aktifRows]: any = await pool.query(
    "SELECT COUNT(*) as total FROM gtk WHERE status_aktif = 'Aktif'",
  );

  return {
    total: Number(totalRows[0]?.total || 0),
    guru: Number(guruRows[0]?.total || 0),
    tendik: Number(tendikRows[0]?.total || 0),
    pns: Number(pnsRows[0]?.total || 0),
    non_pns: Number(nonPnsRows[0]?.total || 0),
    aktif: Number(aktifRows[0]?.total || 0),
  };
}
