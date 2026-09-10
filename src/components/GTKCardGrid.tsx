import React from 'react';
import { Eye, Edit3, Trash2, Mail, Phone, MapPin, User, GraduationCap, Briefcase } from 'lucide-react';
import { GTKItem } from '../types.ts';

interface GTKCardGridProps {
  items: GTKItem[];
  onViewDetail: (item: GTKItem) => void;
  onEdit: (item: GTKItem) => void;
  onDelete: (item: GTKItem) => void;
  isLoading: boolean;
}

export const GTKCardGrid: React.FC<GTKCardGridProps> = ({
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
          Tidak ada data Guru &amp; Tenaga Kependidikan yang sesuai dengan filter atau kata kunci Anda.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          id={`gtk-card-${item.id}`}
          className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
        >
          <div>
            {/* Top header: photo + name + badges */}
            <div className="flex items-start gap-3.5 mb-3.5">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-semibold text-sm">
                {item.foto_url ? (
                  <img
                    src={item.foto_url}
                    alt={item.nama}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
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

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap mb-1">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm border ${
                      item.tipe === 'Guru'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {item.tipe}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-sm bg-purple-50 text-purple-700 border border-purple-200">
                    {item.status_kepegawaian}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 ml-auto">
                    {item.status_aktif}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 truncate" title={item.nama}>
                  {item.nama}
                </h3>
                <p className="text-xs text-emerald-700 font-medium truncate mt-0.5">
                  {item.jabatan}
                </p>
              </div>
            </div>

            {/* Info items */}
            <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50/70 p-3 rounded-lg border border-slate-100 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">NIP:</span>
                <span className="font-mono text-slate-800">{item.nip || '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">NUPTK:</span>
                <span className="font-mono text-slate-800">{item.nuptk || '-'}</span>
              </div>
              {item.tugas_tambahan && item.tugas_tambahan !== '-' && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Tugas Tambahan:</span>
                  <span className="text-slate-800 font-medium text-right truncate max-w-[180px]">
                    {item.tugas_tambahan}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Pendidikan:</span>
                <span className="text-slate-800 truncate max-w-[180px]">
                  {item.pendidikan_terakhir} - {item.jurusan}
                </span>
              </div>
            </div>

            {/* Contact quick preview */}
            <div className="space-y-1 text-xs text-slate-500 mb-4 px-1">
              <div className="flex items-center gap-2 truncate">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{item.email}</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{item.telepon}</span>
              </div>
            </div>
          </div>

          {/* Action buttons footer */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => onViewDetail(item)}
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-emerald-700 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Detail</span>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Ubah</span>
              </button>
              <button
                type="button"
                onClick={() => onDelete(item)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
