import React from 'react';
import { Eye, Edit3, Trash2, Mail, Phone, MapPin, User, CheckCircle, Clock } from 'lucide-react';
import { GTKItem } from '../types.ts';

interface GTKTableProps {
  items: GTKItem[];
  onViewDetail: (item: GTKItem) => void;
  onEdit: (item: GTKItem) => void;
  onDelete: (item: GTKItem) => void;
  isLoading: boolean;
}

export const GTKTable: React.FC<GTKTableProps> = ({
  items,
  onViewDetail,
  onEdit,
  onDelete,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-2xs">
        <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm font-medium text-slate-600">Memuat data Guru dan Tenaga Kependidikan...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-2xs">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
          <User className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-900 mb-1">Data Tidak Ditemukan</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Tidak ada data Guru &amp; Tenaga Kependidikan yang sesuai dengan kriteria pencarian atau filter yang Anda pilih.
        </p>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PNS':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'PPPK':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'GTT':
      case 'PTT':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Honorer':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      default:
        return 'bg-teal-50 text-teal-700 border-teal-200';
    }
  };

  const getAktifBadge = (statusAktif: string) => {
    switch (statusAktif) {
      case 'Aktif':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Cuti':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Pensiun':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      case 'Mutasi':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 border-collapse">
          <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-700 uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4 w-12 text-center">No</th>
              <th className="py-3.5 px-4 min-w-[240px]">Guru / Tenaga Kependidikan</th>
              <th className="py-3.5 px-4 min-w-[160px]">NIP / NUPTK</th>
              <th className="py-3.5 px-4 min-w-[170px]">Jabatan &amp; Tugas</th>
              <th className="py-3.5 px-4 min-w-[130px]">Kepegawaian</th>
              <th className="py-3.5 px-4 min-w-[150px]">Pendidikan</th>
              <th className="py-3.5 px-4 min-w-[160px]">Kontak</th>
              <th className="py-3.5 px-4 min-w-[100px] text-center">Status</th>
              <th className="py-3.5 px-4 w-28 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item, index) => (
              <tr
                key={item.id}
                id={`gtk-row-${item.id}`}
                className="hover:bg-slate-50/60 transition-colors group"
              >
                {/* No */}
                <td className="py-3.5 px-4 text-center text-xs text-slate-400 font-mono">
                  {index + 1}
                </td>

                {/* Profil & Nama */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-semibold text-xs">
                      {item.foto_url ? (
                        <img
                          src={item.foto_url}
                          alt={item.nama}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            // Fallback to initials if image fails
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <span>
                          {item.nama
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {item.nama}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-sm border ${
                            item.tipe === 'Guru'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          {item.tipe}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {item.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* NIP / NUPTK */}
                <td className="py-3.5 px-4">
                  <div className="text-xs font-mono text-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-sans mr-1">NIP:</span>
                    {item.nip || '-'}
                  </div>
                  <div className="text-xs font-mono text-slate-600 mt-1">
                    <span className="text-slate-400 text-[10px] uppercase font-sans mr-1">NUPTK:</span>
                    {item.nuptk || '-'}
                  </div>
                </td>

                {/* Jabatan & Tugas Tambahan */}
                <td className="py-3.5 px-4">
                  <div className="font-medium text-slate-900 text-xs sm:text-sm">
                    {item.jabatan}
                  </div>
                  {item.tugas_tambahan && item.tugas_tambahan !== '-' && (
                    <div className="text-xs text-emerald-600 mt-0.5">
                      Tambahan: {item.tugas_tambahan}
                    </div>
                  )}
                </td>

                {/* Status Kepegawaian & Golongan */}
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-block text-xs font-medium px-2 py-0.5 rounded-md border ${getStatusBadge(
                      item.status_kepegawaian
                    )}`}
                  >
                    {item.status_kepegawaian}
                  </span>
                  {item.golongan && item.golongan !== '-' && (
                    <div className="text-xs text-slate-500 font-mono mt-1">
                      Gol: {item.golongan}
                    </div>
                  )}
                </td>

                {/* Pendidikan */}
                <td className="py-3.5 px-4">
                  <div className="text-xs font-semibold text-slate-800">
                    {item.pendidikan_terakhir}
                  </div>
                  <div className="text-xs text-slate-500 line-clamp-1">
                    {item.jurusan}
                  </div>
                </td>

                {/* Kontak */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-700">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate max-w-[140px]">{item.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono">{item.telepon}</span>
                  </div>
                </td>

                {/* Status Aktif */}
                <td className="py-3.5 px-4 text-center">
                  <span
                    className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getAktifBadge(
                      item.status_aktif
                    )}`}
                  >
                    {item.status_aktif}
                  </span>
                </td>

                {/* Aksi */}
                <td className="py-3.5 px-4 text-center">
                  <div className="inline-flex items-center justify-center gap-1">
                    <button
                      id={`btn-detail-${item.id}`}
                      type="button"
                      onClick={() => onViewDetail(item)}
                      className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      title="Lihat Detail Profil"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      id={`btn-edit-${item.id}`}
                      type="button"
                      onClick={() => onEdit(item)}
                      className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Ubah Data GTK"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      id={`btn-delete-${item.id}`}
                      type="button"
                      onClick={() => onDelete(item)}
                      className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Hapus Data GTK"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
