import React from "react";
import { School, Plus, Database, Download, RefreshCw } from "lucide-react";
import { DbStatus } from "../types.ts";

interface HeaderProps {
  dbStatus: DbStatus | null;
  onOpenAddModal: () => void;
  onOpenDbModal: () => void;
  onExportData: () => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  dbStatus,
  onOpenAddModal,
  onOpenDbModal,
  onExportData,
  onRefresh,
  isLoading,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm ring-2 ring-emerald-100">
              <School className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  SIM GTK
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  v1.0
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Sistem Informasi Guru &amp; Tenaga Kependidikan
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Database indicator */}
            {/* <button
              id="btn-db-status"
              type="button"
              onClick={onOpenDbModal}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                dbStatus?.connected
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
              }`}
              title="Klik untuk konfigurasi dan skema MySQL"
            >
              <Database className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Database:</span>
              <span className="font-semibold">
                {dbStatus?.connected ? 'MySQL Aktif' : 'Penyimpanan Persisten (Siap MySQL)'}
              </span>
            </button> */}

            {/* Refresh button */}
            <button
              id="btn-refresh"
              type="button"
              onClick={onRefresh}
              disabled={isLoading}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors disabled:opacity-50"
              title="Segarkan Data"
            >
              <RefreshCw
                className={`w-4 h-4 ${isLoading ? "animate-spin text-emerald-600" : ""}`}
              />
            </button>

            {/* Export button */}
            <button
              id="btn-export"
              type="button"
              onClick={onExportData}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-300 shadow-xs transition-colors"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Ekspor CSV</span>
            </button>

            {/* Add GTK button */}
            <button
              id="btn-add-gtk"
              type="button"
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Tambah Data GTK</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
