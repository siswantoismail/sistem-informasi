import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { GTKItem } from '../types.ts';

interface GTKDeleteModalProps {
  item: GTKItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: number) => Promise<void>;
  isLoading: boolean;
}

export const GTKDeleteModal: React.FC<GTKDeleteModalProps> = ({
  item,
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-1">
            Konfirmasi Hapus Data GTK
          </h3>

          <p className="text-sm text-slate-500 mb-4">
            Apakah Anda yakin ingin menghapus data pendidik / tenaga kependidikan ini?
          </p>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-left mb-6">
            <div className="font-semibold text-slate-900 text-sm">{item.nama}</div>
            <div className="text-xs text-slate-500 mt-0.5">{item.jabatan} ({item.tipe})</div>
            <div className="text-xs font-mono text-slate-400 mt-1">NIP: {item.nip} | NUPTK: {item.nuptk}</div>
          </div>

          <p className="text-xs text-rose-600 font-medium mb-6">
            Tindakan ini akan menghapus data dari sistem secara permanen.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors flex-1"
            >
              Batal
            </button>
            <button
              id="btn-confirm-delete-gtk"
              type="button"
              onClick={() => onConfirm(item.id)}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-lg shadow-sm transition-colors flex-1 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Menghapus...</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  <span>Ya, Hapus Data</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
