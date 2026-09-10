export type JenisKelamin = "L" | "P";
export type TipeGTK = "Guru" | "Tenaga Kependidikan";
export type StatusKepegawaian =
  | "PNS"
  | "PPPK"
  | "GTT"
  | "PTT"
  | "Honorer"
  | "Yayasan";
export type PendidikanTerakhir = "SMA/SMK" | "D3" | "D4" | "S1" | "S2" | "S3";
export type StatusAktif = "Aktif" | "Cuti" | "Pensiun" | "Mutasi";

export interface GTKItem {
  id: number;
  nama: string;
  nip: string;
  nuptk: string;
  jenis_kelamin: JenisKelamin;
  tipe: TipeGTK;
  jabatan: string;
  tugas_tambahan?: string;
  status_kepegawaian: StatusKepegawaian;
  golongan?: string;
  pendidikan_terakhir: PendidikanTerakhir;
  jurusan: string;
  email: string;
  telepon: string;
  alamat: string;
  tanggal_lahir?: string;
  tanggal_bergabung?: string;
  status_aktif: StatusAktif;
  foto_url?: string;
  created_at?: string;
  updated_at?: string;
}

export type GTKFormData = Omit<GTKItem, "id" | "created_at" | "updated_at">;

export interface GTKStats {
  total: number;
  guru: number;
  tendik: number;
  pns: number;
  non_pns: number;
  aktif: number;
}

export interface DbStatus {
  mode: "mysql" | "persistent_store";
  connected: boolean;
  database?: string;
  host?: string;
  message: string;
}
