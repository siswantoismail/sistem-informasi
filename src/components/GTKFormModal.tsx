import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, User, Sparkles } from 'lucide-react';
import { GTKItem, GTKFormData, JenisKelamin, TipeGTK, StatusKepegawaian, PendidikanTerakhir, StatusAktif } from '../types.ts';

interface GTKFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: GTKFormData) => Promise<void>;
  initialData?: GTKItem | null;
  isLoading: boolean;
}

const defaultFormData: GTKFormData = {
  nama: '',
  nip: '-',
  nuptk: '-',
  jenis_kelamin: 'L',
  tipe: 'Guru',
  jabatan: '',
  tugas_tambahan: '-',
  status_kepegawaian: 'GTT',
  golongan: '-',
  pendidikan_terakhir: 'S1',
  jurusan: '',
  email: '',
  telepon: '',
  alamat: '',
  tanggal_lahir: '',
  tanggal_bergabung: '',
  status_aktif: 'Aktif',
  foto_url: '',
};

export const GTKFormModal: React.FC<GTKFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}) => {
  const [formData, setFormData] = useState<GTKFormData>(defaultFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        nama: initialData.nama || '',
        nip: initialData.nip || '-',
        nuptk: initialData.nuptk || '-',
        jenis_kelamin: initialData.jenis_kelamin || 'L',
        tipe: initialData.tipe || 'Guru',
        jabatan: initialData.jabatan || '',
        tugas_tambahan: initialData.tugas_tambahan || '-',
        status_kepegawaian: initialData.status_kepegawaian || 'GTT',
        golongan: initialData.golongan || '-',
        pendidikan_terakhir: initialData.pendidikan_terakhir || 'S1',
        jurusan: initialData.jurusan || '',
        email: initialData.email || '',
        telepon: initialData.telepon || '',
        alamat: initialData.alamat || '',
        tanggal_lahir: initialData.tanggal_lahir ? initialData.tanggal_lahir.split('T')[0] : '',
        tanggal_bergabung: initialData.tanggal_bergabung ? initialData.tanggal_bergabung.split('T')[0] : '',
        status_aktif: initialData.status_aktif || 'Aktif',
        foto_url: initialData.foto_url || '',
      });
    } else {
      setFormData(defaultFormData);
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const isEditing = Boolean(initialData);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama lengkap wajib diisi';
    }
    if (!formData.jabatan.trim()) {
      newErrors.jabatan = 'Jabatan / Tugas wajib diisi';
    }
    if (!formData.jurusan.trim()) {
      newErrors.jurusan = 'Jurusan / Bidang studi wajib diisi';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    if (!formData.telepon.trim()) {
      newErrors.telepon = 'Nomor telepon wajib diisi';
    }
    if (!formData.alamat.trim()) {
      newErrors.alamat = 'Alamat lengkap wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(formData);
  };

  // Avatar presets
  const sampleAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-3xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {isEditing ? 'Ubah Data Guru & Kependidikan' : 'Tambah Data Guru & Kependidikan Baru'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditing
                ? 'Perbarui informasi profil dan kepegawaian GTK terpilih'
                : 'Lengkapi formulir di bawah ini untuk mendaftarkan pendidik atau tenaga kependidikan baru'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Section 1: Kategori & Identitas Utama */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              1. Kategori &amp; Identitas Utama
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Tipe GTK */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Kategori Tenaga <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tipe: 'Guru' })}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-colors ${
                      formData.tipe === 'Guru'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-500 ring-1 ring-emerald-500'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Guru (Pendidik)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tipe: 'Tenaga Kependidikan' })}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-colors ${
                      formData.tipe === 'Tenaga Kependidikan'
                        ? 'bg-amber-50 text-amber-700 border-amber-500 ring-1 ring-amber-500'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Tenaga Kependidikan (Tendik)
                  </button>
                </div>
              </div>

              {/* Jenis Kelamin */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Jenis Kelamin <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, jenis_kelamin: 'L' })}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors ${
                      formData.jenis_kelamin === 'L'
                        ? 'bg-blue-50 text-blue-700 border-blue-500 ring-1 ring-blue-500'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Laki-laki
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, jenis_kelamin: 'P' })}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors ${
                      formData.jenis_kelamin === 'P'
                        ? 'bg-pink-50 text-pink-700 border-pink-500 ring-1 ring-pink-500'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Perempuan
                  </button>
                </div>
              </div>

              {/* Nama Lengkap */}
              <div className="sm:col-span-2">
                <label htmlFor="form-nama" className="block text-xs font-medium text-slate-700 mb-1">
                  Nama Lengkap beserta Gelar <span className="text-rose-500">*</span>
                </label>
                <input
                  id="form-nama"
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  placeholder="Contoh: Drs. H. Ahmad Fauzi, M.Pd."
                  className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg focus:outline-hidden focus:ring-2 ${
                    errors.nama
                      ? 'border-rose-300 focus:ring-rose-500'
                      : 'border-slate-200 focus:ring-emerald-500 focus:border-emerald-500'
                  }`}
                />
                {errors.nama && <p className="text-xs text-rose-500 mt-1">{errors.nama}</p>}
              </div>

              {/* NIP */}
              <div>
                <label htmlFor="form-nip" className="block text-xs font-medium text-slate-700 mb-1">
                  NIP (Nomor Induk Pegawai)
                </label>
                <input
                  id="form-nip"
                  type="text"
                  value={formData.nip}
                  onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                  placeholder="Isi '-' jika belum memiliki NIP"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* NUPTK */}
              <div>
                <label htmlFor="form-nuptk" className="block text-xs font-medium text-slate-700 mb-1">
                  NUPTK (16 Digit)
                </label>
                <input
                  id="form-nuptk"
                  type="text"
                  value={formData.nuptk}
                  onChange={(e) => setFormData({ ...formData, nuptk: e.target.value })}
                  placeholder="Isi '-' jika belum memiliki NUPTK"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Jabatan & Kepegawaian */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              2. Jabatan &amp; Kepegawaian
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Jabatan */}
              <div>
                <label htmlFor="form-jabatan" className="block text-xs font-medium text-slate-700 mb-1">
                  Jabatan / Tugas Utama <span className="text-rose-500">*</span>
                </label>
                <input
                  id="form-jabatan"
                  type="text"
                  value={formData.jabatan}
                  onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                  placeholder={formData.tipe === 'Guru' ? 'Contoh: Guru Matematika' : 'Contoh: Kepala Tata Usaha'}
                  className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg focus:outline-hidden focus:ring-2 ${
                    errors.jabatan
                      ? 'border-rose-300 focus:ring-rose-500'
                      : 'border-slate-200 focus:ring-emerald-500 focus:border-emerald-500'
                  }`}
                />
                {errors.jabatan && <p className="text-xs text-rose-500 mt-1">{errors.jabatan}</p>}
              </div>

              {/* Tugas Tambahan */}
              <div>
                <label htmlFor="form-tugas-tambahan" className="block text-xs font-medium text-slate-700 mb-1">
                  Tugas Tambahan
                </label>
                <input
                  id="form-tugas-tambahan"
                  type="text"
                  value={formData.tugas_tambahan}
                  onChange={(e) => setFormData({ ...formData, tugas_tambahan: e.target.value })}
                  placeholder="Contoh: Wali Kelas 10A / Pembina OSIS / Bendahara BOS"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Status Kepegawaian */}
              <div>
                <label htmlFor="form-status-kepegawaian" className="block text-xs font-medium text-slate-700 mb-1">
                  Status Kepegawaian <span className="text-rose-500">*</span>
                </label>
                <select
                  id="form-status-kepegawaian"
                  value={formData.status_kepegawaian}
                  onChange={(e) => setFormData({ ...formData, status_kepegawaian: e.target.value as StatusKepegawaian })}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="PNS">PNS (Pegawai Negeri Sipil)</option>
                  <option value="PPPK">PPPK (Pegawai Pemerintah dengan Perjanjian Kerja)</option>
                  <option value="GTT">GTT (Guru Tidak Tetap)</option>
                  <option value="PTT">PTT (Pegawai Tidak Tetap)</option>
                  <option value="Honorer">Honorer Sekolah</option>
                  <option value="Yayasan">Guru / Pegawai Yayasan</option>
                </select>
              </div>

              {/* Golongan / Ruang */}
              <div>
                <label htmlFor="form-golongan" className="block text-xs font-medium text-slate-700 mb-1">
                  Golongan / Ruang
                </label>
                <input
                  id="form-golongan"
                  type="text"
                  value={formData.golongan}
                  onChange={(e) => setFormData({ ...formData, golongan: e.target.value })}
                  placeholder="Contoh: IV/a, III/c, IX, atau '-' jika non-ASN"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Status Aktif */}
              <div>
                <label htmlFor="form-status-aktif" className="block text-xs font-medium text-slate-700 mb-1">
                  Status Keaktifan
                </label>
                <select
                  id="form-status-aktif"
                  value={formData.status_aktif}
                  onChange={(e) => setFormData({ ...formData, status_aktif: e.target.value as StatusAktif })}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Aktif">Aktif Bertugas</option>
                  <option value="Cuti">Cuti</option>
                  <option value="Pensiun">Pensiun</option>
                  <option value="Mutasi">Mutasi ke Sekolah Lain</option>
                </select>
              </div>

              {/* Tanggal Bergabung */}
              <div>
                <label htmlFor="form-tanggal-bergabung" className="block text-xs font-medium text-slate-700 mb-1">
                  TMT / Tanggal Bergabung
                </label>
                <input
                  id="form-tanggal-bergabung"
                  type="date"
                  value={formData.tanggal_bergabung}
                  onChange={(e) => setFormData({ ...formData, tanggal_bergabung: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Pendidikan & Kontak */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              3. Pendidikan &amp; Informasi Kontak
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Pendidikan Terakhir */}
              <div>
                <label htmlFor="form-pendidikan" className="block text-xs font-medium text-slate-700 mb-1">
                  Pendidikan Terakhir <span className="text-rose-500">*</span>
                </label>
                <select
                  id="form-pendidikan"
                  value={formData.pendidikan_terakhir}
                  onChange={(e) =>
                    setFormData({ ...formData, pendidikan_terakhir: e.target.value as PendidikanTerakhir })
                  }
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="S3">S3 (Doktor)</option>
                  <option value="S2">S2 (Magister)</option>
                  <option value="S1">S1 (Sarjana)</option>
                  <option value="D4">D4 (Diploma IV)</option>
                  <option value="D3">D3 (Diploma III)</option>
                  <option value="SMA/SMK">SMA / SMK Sederajat</option>
                </select>
              </div>

              {/* Jurusan */}
              <div>
                <label htmlFor="form-jurusan" className="block text-xs font-medium text-slate-700 mb-1">
                  Program Studi / Jurusan <span className="text-rose-500">*</span>
                </label>
                <input
                  id="form-jurusan"
                  type="text"
                  value={formData.jurusan}
                  onChange={(e) => setFormData({ ...formData, jurusan: e.target.value })}
                  placeholder="Contoh: Pendidikan Matematika / Sistem Informasi"
                  className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg focus:outline-hidden focus:ring-2 ${
                    errors.jurusan
                      ? 'border-rose-300 focus:ring-rose-500'
                      : 'border-slate-200 focus:ring-emerald-500 focus:border-emerald-500'
                  }`}
                />
                {errors.jurusan && <p className="text-xs text-rose-500 mt-1">{errors.jurusan}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="form-email" className="block text-xs font-medium text-slate-700 mb-1">
                  Alamat Email <span className="text-rose-500">*</span>
                </label>
                <input
                  id="form-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="nama@sekolah.sch.id"
                  className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg focus:outline-hidden focus:ring-2 ${
                    errors.email
                      ? 'border-rose-300 focus:ring-rose-500'
                      : 'border-slate-200 focus:ring-emerald-500 focus:border-emerald-500'
                  }`}
                />
                {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
              </div>

              {/* Telepon */}
              <div>
                <label htmlFor="form-telepon" className="block text-xs font-medium text-slate-700 mb-1">
                  Nomor HP / WhatsApp <span className="text-rose-500">*</span>
                </label>
                <input
                  id="form-telepon"
                  type="text"
                  value={formData.telepon}
                  onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                  placeholder="081234567890"
                  className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg focus:outline-hidden focus:ring-2 ${
                    errors.telepon
                      ? 'border-rose-300 focus:ring-rose-500'
                      : 'border-slate-200 focus:ring-emerald-500 focus:border-emerald-500'
                  }`}
                />
                {errors.telepon && <p className="text-xs text-rose-500 mt-1">{errors.telepon}</p>}
              </div>

              {/* Tanggal Lahir */}
              <div>
                <label htmlFor="form-tanggal-lahir" className="block text-xs font-medium text-slate-700 mb-1">
                  Tanggal Lahir
                </label>
                <input
                  id="form-tanggal-lahir"
                  type="date"
                  value={formData.tanggal_lahir}
                  onChange={(e) => setFormData({ ...formData, tanggal_lahir: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Foto Profil URL + Preset */}
              <div>
                <label htmlFor="form-foto-url" className="block text-xs font-medium text-slate-700 mb-1">
                  Foto Profil (URL Gambar)
                </label>
                <input
                  id="form-foto-url"
                  type="url"
                  value={formData.foto_url}
                  onChange={(e) => setFormData({ ...formData, foto_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
                <div className="flex items-center gap-1.5 mt-1.5 overflow-x-auto py-1">
                  <span className="text-[10px] text-slate-400 shrink-0">Preset:</span>
                  {sampleAvatars.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormData({ ...formData, foto_url: url })}
                      className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-slate-300 hover:scale-110 transition-transform"
                      title="Gunakan foto ini"
                    >
                      <img src={url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Alamat Domisili */}
              <div className="sm:col-span-2">
                <label htmlFor="form-alamat" className="block text-xs font-medium text-slate-700 mb-1">
                  Alamat Domisili Lengkap <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="form-alamat"
                  rows={2}
                  value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  placeholder="Contoh: Jl. Merdeka No. 45, RT 02/05, Kelurahan Cisitu, Bandung"
                  className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg focus:outline-hidden focus:ring-2 ${
                    errors.alamat
                      ? 'border-rose-300 focus:ring-rose-500'
                      : 'border-slate-200 focus:ring-emerald-500 focus:border-emerald-500'
                  }`}
                />
                {errors.alamat && <p className="text-xs text-rose-500 mt-1">{errors.alamat}</p>}
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              id="btn-save-gtk"
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isEditing ? 'Simpan Perubahan' : 'Tambah Data GTK'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
