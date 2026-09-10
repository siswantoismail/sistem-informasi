import React, { useState, useEffect } from 'react';
import { Search, X, Filter, RotateCcw, LayoutGrid, LayoutList } from 'lucide-react';
import { TipeGTK, StatusKepegawaian, StatusAktif } from '../types.ts';

interface SearchFilterBarProps {
  searchTerm: string;
  selectedTipe: string;
  selectedStatus: string;
  selectedAktif: string;
  viewMode: 'table' | 'grid';
  totalResults: number;
  onSearch: (term: string) => void;
  onSelectTipe: (tipe: string) => void;
  onSelectStatus: (status: string) => void;
  onSelectAktif: (aktif: string) => void;
  onToggleViewMode: (mode: 'table' | 'grid') => void;
  onResetFilters: () => void;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchTerm,
  selectedTipe,
  selectedStatus,
  selectedAktif,
  viewMode,
  totalResults,
  onSearch,
  onSelectTipe,
  onSelectStatus,
  onSelectAktif,
  onToggleViewMode,
  onResetFilters,
}) => {
  const [localSearch, setLocalSearch] = useState(searchTerm);

  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearch);
  };

  const handleClear = () => {
    setLocalSearch('');
    onSearch('');
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedTipe !== 'Semua' ||
    selectedStatus !== 'Semua' ||
    selectedAktif !== 'Semua';

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-2xs">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search Input & Button */}
        <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="input-search-gtk"
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Ketik nama guru, NIP, NUPTK, mata pelajaran, jabatan, email..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-all"
            />
            {localSearch && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                title="Hapus pencarian"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Prominent Search Button */}
          <button
            id="btn-submit-search"
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg text-sm font-semibold shadow-xs transition-colors shrink-0"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Cari Data</span>
          </button>
        </form>

        {/* Filters and View Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Tipe Filter */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="filter-tipe" className="text-xs font-medium text-slate-500 hidden sm:inline">
              Tipe:
            </label>
            <select
              id="filter-tipe"
              value={selectedTipe}
              onChange={(e) => onSelectTipe(e.target.value)}
              className="px-2.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Semua">Semua Tipe</option>
              <option value="Guru">Guru (Pendidik)</option>
              <option value="Tenaga Kependidikan">Tenaga Kependidikan</option>
            </select>
          </div>

          {/* Status Kepegawaian Filter */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="filter-status" className="text-xs font-medium text-slate-500 hidden sm:inline">
              Status:
            </label>
            <select
              id="filter-status"
              value={selectedStatus}
              onChange={(e) => onSelectStatus(e.target.value)}
              className="px-2.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Semua">Semua Kepegawaian</option>
              <option value="PNS">PNS</option>
              <option value="PPPK">PPPK</option>
              <option value="GTT">GTT (Guru Tidak Tetap)</option>
              <option value="PTT">PTT (Pegawai Tidak Tetap)</option>
              <option value="Honorer">Honorer</option>
              <option value="Yayasan">Yayasan</option>
            </select>
          </div>

          {/* Reset Filter button */}
          {hasActiveFilters && (
            <button
              id="btn-reset-filters"
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-2 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors"
              title="Reset semua filter dan pencarian"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 ml-auto lg:ml-2">
            <button
              id="btn-view-table"
              type="button"
              onClick={() => onToggleViewMode('table')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-emerald-700 shadow-2xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Tampilan Tabel"
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              id="btn-view-grid"
              type="button"
              onClick={() => onToggleViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-emerald-700 shadow-2xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Tampilan Kartu"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results and Active Filter summary badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>Menampilkan <strong className="text-slate-800 font-semibold">{totalResults}</strong> data GTK</span>
          {searchTerm && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
              Kata kunci: "{searchTerm}"
            </span>
          )}
          {selectedTipe !== 'Semua' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
              Tipe: {selectedTipe}
            </span>
          )}
          {selectedStatus !== 'Semua' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
              Status: {selectedStatus}
            </span>
          )}
        </div>
        <span className="text-[11px] text-slate-400">Tekan Enter atau klik Cari untuk memproses pencarian</span>
      </div>
    </div>
  );
};
