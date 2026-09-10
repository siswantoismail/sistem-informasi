import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header.tsx';
import { StatsBar } from './components/StatsBar.tsx';
import { SearchFilterBar } from './components/SearchFilterBar.tsx';
import { GTKTable } from './components/GTKTable.tsx';
import { GTKCardGrid } from './components/GTKCardGrid.tsx';
import { GTKFormModal } from './components/GTKFormModal.tsx';
import { GTKDetailModal } from './components/GTKDetailModal.tsx';
import { GTKDeleteModal } from './components/GTKDeleteModal.tsx';
import { MySQLInfoModal } from './components/MySQLInfoModal.tsx';
import { ToastContainer, ToastMessage } from './components/Toast.tsx';
import { GTKItem, GTKFormData, GTKStats, DbStatus } from './types.ts';

export default function App() {
  const [gtkList, setGtkList] = useState<GTKItem[]>([]);
  const [stats, setStats] = useState<GTKStats | null>(null);
  const [dbStatus, setDbStatus] = useState<DbStatus | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTipe, setSelectedTipe] = useState<string>('Semua');
  const [selectedStatus, setSelectedStatus] = useState<string>('Semua');
  const [selectedAktif, setSelectedAktif] = useState<string>('Semua');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Modals
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<GTKItem | null>(null);
  const [viewingItem, setViewingItem] = useState<GTKItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<GTKItem | null>(null);
  const [isDbModalOpen, setIsDbModalOpen] = useState<boolean>(false);

  // Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', text: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch Database Status
  const fetchDbStatus = async () => {
    try {
      const res = await fetch('/api/db/status');
      if (res.ok) {
        const data = await res.json();
        setDbStatus(data);
      }
    } catch (err) {
      console.error('Gagal mengambil status database:', err);
    }
  };

  // Fetch Stats
  const fetchStats = async () => {
    try {
      const res = await fetch('/api/gtk/stats/summary');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Gagal mengambil statistik GTK:', err);
    }
  };

  // Fetch GTK Data with query params
  const fetchGTKData = useCallback(async (q = searchTerm, tipe = selectedTipe, status = selectedStatus) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (q.trim()) params.append('q', q.trim());
      if (tipe && tipe !== 'Semua') params.append('tipe', tipe);
      if (status && status !== 'Semua') params.append('status', status);

      const url = `/api/gtk?${params.toString()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Gagal mengambil data dari server');

      const data: GTKItem[] = await res.json();
      setGtkList(data);
    } catch (err: any) {
      console.error('Error loading GTK:', err);
      addToast('error', err.message || 'Gagal memuat data GTK');
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, selectedTipe, selectedStatus]);

  // Initial load
  useEffect(() => {
    fetchDbStatus();
    fetchStats();
    fetchGTKData();
  }, []);

  // Handle Search submit
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    fetchGTKData(term, selectedTipe, selectedStatus);
  };

  // Handle Tipe filter change
  const handleSelectTipe = (tipe: string) => {
    setSelectedTipe(tipe);
    fetchGTKData(searchTerm, tipe, selectedStatus);
  };

  // Handle Status filter change
  const handleSelectStatus = (status: string) => {
    setSelectedStatus(status);
    fetchGTKData(searchTerm, selectedTipe, status);
  };

  // Handle Reset Filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedTipe('Semua');
    setSelectedStatus('Semua');
    setSelectedAktif('Semua');
    fetchGTKData('', 'Semua', 'Semua');
  };

  // Refresh all data
  const handleRefresh = async () => {
    await Promise.all([fetchDbStatus(), fetchStats(), fetchGTKData(searchTerm, selectedTipe, selectedStatus)]);
    addToast('info', 'Data GTK berhasil diperbarui.');
  };

  // Open Add Modal
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setIsFormModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (item: GTKItem) => {
    setEditingItem(item);
    setIsFormModalOpen(true);
  };

  // Handle Form Submit (Add or Edit)
  const handleFormSubmit = async (formData: GTKFormData) => {
    setIsSubmitting(true);
    try {
      if (editingItem) {
        // Update
        const res = await fetch(`/api/gtk/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Gagal memperbarui data GTK');
        }

        addToast('success', `Data ${formData.nama} berhasil diperbarui.`);
      } else {
        // Create
        const res = await fetch('/api/gtk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Gagal menambahkan data GTK');
        }

        addToast('success', `Data ${formData.nama} berhasil ditambahkan.`);
      }

      setIsFormModalOpen(false);
      setEditingItem(null);
      await Promise.all([fetchStats(), fetchGTKData(searchTerm, selectedTipe, selectedStatus)]);
    } catch (err: any) {
      console.error('Gagal simpan GTK:', err);
      addToast('error', err.message || 'Terjadi kesalahan saat menyimpan data');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete Confirmation
  const handleDeleteConfirm = async (id: number) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/gtk/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Gagal menghapus data GTK');
      }

      addToast('success', 'Data Guru & Kependidikan berhasil dihapus.');
      setDeletingItem(null);
      await Promise.all([fetchStats(), fetchGTKData(searchTerm, selectedTipe, selectedStatus)]);
    } catch (err: any) {
      console.error('Gagal hapus GTK:', err);
      addToast('error', err.message || 'Terjadi kesalahan saat menghapus data');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (gtkList.length === 0) {
      addToast('info', 'Tidak ada data untuk diekspor.');
      return;
    }

    const headers = [
      'ID',
      'Nama Lengkap',
      'NIP',
      'NUPTK',
      'Jenis Kelamin',
      'Tipe',
      'Jabatan',
      'Tugas Tambahan',
      'Status Kepegawaian',
      'Golongan',
      'Pendidikan Terakhir',
      'Jurusan',
      'Email',
      'Telepon',
      'Alamat',
      'Status Aktif',
    ];

    const rows = gtkList.map((item) => [
      item.id,
      `"${item.nama.replace(/"/g, '""')}"`,
      `"${item.nip || '-'}"`,
      `"${item.nuptk || '-'}"`,
      item.jenis_kelamin,
      item.tipe,
      `"${item.jabatan.replace(/"/g, '""')}"`,
      `"${(item.tugas_tambahan || '-').replace(/"/g, '""')}"`,
      item.status_kepegawaian,
      `"${item.golongan || '-'}"`,
      item.pendidikan_terakhir,
      `"${item.jurusan.replace(/"/g, '""')}"`,
      `"${item.email}"`,
      `"${item.telepon}"`,
      `"${item.alamat.replace(/"/g, '""')}"`,
      item.status_aktif,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `data_gtk_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast('success', `${gtkList.length} data GTK berhasil diekspor ke CSV.`);
  };

  // Filter based on status aktif client-side if selected
  const filteredList =
    selectedAktif !== 'Semua' ? gtkList.filter((item) => item.status_aktif === selectedAktif) : gtkList;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased">
      {/* Header */}
      <Header
        dbStatus={dbStatus}
        onOpenAddModal={handleOpenAddModal}
        onOpenDbModal={() => setIsDbModalOpen(true)}
        onExportData={handleExportCSV}
        onRefresh={handleRefresh}
        isLoading={isLoading}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Statistics Bar */}
        <StatsBar
          stats={stats}
          activeFilterTipe={selectedTipe}
          onSelectTipeFilter={handleSelectTipe}
        />

        {/* Search and Filters */}
        <SearchFilterBar
          searchTerm={searchTerm}
          selectedTipe={selectedTipe}
          selectedStatus={selectedStatus}
          selectedAktif={selectedAktif}
          viewMode={viewMode}
          totalResults={filteredList.length}
          onSearch={handleSearch}
          onSelectTipe={handleSelectTipe}
          onSelectStatus={handleSelectStatus}
          onSelectAktif={setSelectedAktif}
          onToggleViewMode={setViewMode}
          onResetFilters={handleResetFilters}
        />

        {/* GTK Content (Table or Card Grid) */}
        {viewMode === 'table' ? (
          <GTKTable
            items={filteredList}
            onViewDetail={(item) => setViewingItem(item)}
            onEdit={handleOpenEditModal}
            onDelete={(item) => setDeletingItem(item)}
            isLoading={isLoading}
          />
        ) : (
          <GTKCardGrid
            items={filteredList}
            onViewDetail={(item) => setViewingItem(item)}
            onEdit={handleOpenEditModal}
            onDelete={(item) => setDeletingItem(item)}
            isLoading={isLoading}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} SIM GTK - Sistem Informasi Guru &amp; Tenaga Kependidikan</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>React 19</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Express</span>
            <span>•</span>
            <span>MySQL</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <GTKFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingItem(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingItem}
        isLoading={isSubmitting}
      />

      <GTKDetailModal
        item={viewingItem}
        onClose={() => setViewingItem(null)}
        onEdit={(item) => {
          setViewingItem(null);
          handleOpenEditModal(item);
        }}
      />

      <GTKDeleteModal
        item={deletingItem}
        isOpen={Boolean(deletingItem)}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={isSubmitting}
      />

      <MySQLInfoModal
        isOpen={isDbModalOpen}
        onClose={() => setIsDbModalOpen(false)}
        dbStatus={dbStatus}
      />

      {/* Toasts */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
