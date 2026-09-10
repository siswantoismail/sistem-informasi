import React from 'react';
import { X, Edit3, Mail, Phone, MapPin, Calendar, Award, Briefcase, GraduationCap, Clock, CheckCircle2 } from 'lucide-react';
import { GTKItem } from '../types.ts';

interface GTKDetailModalProps {
  item: GTKItem | null;
  onClose: () => void;
  onEdit: (item: GTKItem) => void;
}

export const GTKDetailModal: React.FC<GTKDetailModalProps> = ({
  item,
  onClose,
  onEdit,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-2xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header background banner */}
        <div className="h-28 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 relative p-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile info block */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 mb-4 gap-3">
            <div className="flex items-end gap-3.5">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white p-1 shadow-md border border-slate-200 shrink-0">
                {item.foto_url ? (
                  <img
                    src={item.foto_url}
                    alt={item.nama}
                    className="w-full h-full object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 font-bold text-xl">
                    {item.nama
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </div>
                )}
              </div>
              <div className="mb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                      item.tipe === 'Guru'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {item.tipe}
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                    {item.status_kepegawaian}
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                    {item.status_aktif}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mt-1.5">{item.nama}</h2>
                <p className="text-sm font-medium text-emerald-700">{item.jabatan}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(item);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors self-start sm:self-auto"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Ubah Profil</span>
            </button>
          </div>

          {/* Details Sections */}
          <div className="space-y-4 pt-2">
            {/* Kepegawaian Grid */}
            <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/80">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                Data Kepegawaian
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
                <div>
                  <span className="text-slate-400 block">NIP (Nomor Induk Pegawai):</span>
                  <span className="font-mono font-medium text-slate-800 text-sm">{item.nip || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">NUPTK:</span>
                  <span className="font-mono font-medium text-slate-800 text-sm">{item.nuptk || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Tugas Tambahan:</span>
                  <span className="font-medium text-slate-800">{item.tugas_tambahan || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Golongan / Ruang:</span>
                  <span className="font-medium text-slate-800">{item.golongan || '-'}</span>
                </div>
                {item.tanggal_bergabung && (
                  <div>
                    <span className="text-slate-400 block">Tanggal Bergabung (TMT):</span>
                    <span className="font-medium text-slate-800">{item.tanggal_bergabung.split('T')[0]}</span>
                  </div>
                )}
                <div>
                  <span className="text-slate-400 block">Jenis Kelamin:</span>
                  <span className="font-medium text-slate-800">
                    {item.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                  </span>
                </div>
              </div>
            </div>

            {/* Pendidikan */}
            <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/80">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                Riwayat Pendidikan
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Jenjang Terakhir:</span>
                  <span className="font-semibold text-slate-800 text-sm">{item.pendidikan_terakhir}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Jurusan / Program Studi:</span>
                  <span className="font-medium text-slate-800">{item.jurusan}</span>
                </div>
              </div>
            </div>

            {/* Kontak & Domisili */}
            <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/80">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                Kontak &amp; Alamat
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Email:</span>
                  <span className="font-medium text-slate-800 select-all">{item.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Telepon / WhatsApp:</span>
                  <span className="font-mono font-medium text-slate-800 select-all">{item.telepon}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block">Alamat Domisili:</span>
                  <span className="font-medium text-slate-800">{item.alamat}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
