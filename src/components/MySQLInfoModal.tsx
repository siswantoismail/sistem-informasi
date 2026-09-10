import React, { useState, useEffect } from "react";
import {
  X,
  Database,
  CheckCircle2,
  Copy,
  Check,
  Download,
  Terminal,
  Server,
  ExternalLink,
} from "lucide-react";
import { DbStatus } from "../types.ts";

interface MySQLInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  dbStatus: DbStatus | null;
}

export const MySQLInfoModal: React.FC<MySQLInfoModalProps> = ({
  isOpen,
  onClose,
  dbStatus,
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [sqlContent, setSqlContent] = useState<string>("");
  const [isLoadingSql, setIsLoadingSql] = useState(false);

  useEffect(() => {
    if (isOpen && !sqlContent) {
      setIsLoadingSql(true);
      fetch("/api/db/schema.sql")
        .then((res) => res.text())
        .then((text) => setSqlContent(text))
        .catch((err) => console.error("Gagal mengambil SQL:", err))
        .finally(() => setIsLoadingSql(false));
    }
  }, [isOpen, sqlContent]);

  if (!isOpen) return null;

  const envSample = `# Konfigurasi MySQL di file .env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=db_sekolah`;

  const handleCopySQL = () => {
    if (sqlContent) {
      navigator.clipboard.writeText(sqlContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyEnv = () => {
    navigator.clipboard.writeText(envSample);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  const handleDownloadSQL = () => {
    const blob = new Blob([sqlContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "schema_gtk_mysql.sql";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-3xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Integrasi Database MySQL &amp; Express
              </h2>
              <p className="text-xs text-slate-500">
                Arsitektur database dan panduan koneksi MySQL
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Status Box */}
          <div
            className={`p-4 rounded-xl border ${
              dbStatus?.connected
                ? "bg-emerald-50/80 border-emerald-200 text-emerald-900"
                : "bg-blue-50/80 border-blue-200 text-blue-900"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider">
                Status Sistem Saat Ini:
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white border border-current">
                {dbStatus?.connected
                  ? "MySQL Terhubung"
                  : "Penyimpanan Persisten Siap MySQL"}
              </span>
            </div>
            <p className="text-sm font-medium mt-1">
              {dbStatus?.message || "Database siap melayani operasi data."}
            </p>
            <div className="mt-2 text-xs opacity-85 flex flex-wrap gap-x-4 gap-y-1">
              <span>
                <strong>Database:</strong> {dbStatus?.database || "db_sekolah"}
              </span>
              <span>
                <strong>Host:</strong> {dbStatus?.host || "localhost"}
              </span>
              <span>
                <strong>Tabel:</strong> gtk
              </span>
            </div>
          </div>

          {/* Explanation */}
          <div className="text-xs text-slate-600 space-y-2 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
              <Server className="w-4 h-4 text-emerald-600" />
              Bagaimana Backend Beroperasi?
            </h4>
            <p>
              Aplikasi ini menggunakan <strong>Express</strong> pada sisi server
              dengan driver <strong>mysql2/promise</strong>. Semua operasi
              (Tambah, Ubah, Hapus, Cari) dieksekusi secara langsung ke database{" "}
              <strong>MySQL</strong> (tabel <code>gtk</code>).
            </p>
            <p>
              Setiap kali Anda menambah, memperbarui, atau menghapus data Guru
              dan Tenaga Kependidikan, perubahan tersebut langsung diterapkan
              dan tersimpan di database MySQL.
            </p>
          </div>

          {/* .env Configuration */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                Konfigurasi .env MySQL
              </label>
              <button
                type="button"
                onClick={handleCopyEnv}
                className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 font-medium"
              >
                {copiedEnv ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedEnv ? "Tersalin!" : "Salin Konfigurasi"}</span>
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-slate-200 text-xs font-mono rounded-lg overflow-x-auto">
              {envSample}
            </pre>
          </div>

          {/* SQL Schema Preview & Actions */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-slate-500" />
                Skrip SQL (schema.sql)
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopySQL}
                  className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 font-medium"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copied ? "Tersalin!" : "Salin SQL"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadSQL}
                  className="inline-flex items-center gap-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-md font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh .sql</span>
                </button>
              </div>
            </div>
            <pre className="p-3.5 bg-slate-900 text-emerald-300 text-xs font-mono rounded-lg max-h-48 overflow-y-auto overflow-x-auto select-all">
              {isLoadingSql
                ? "Memuat skema SQL..."
                : sqlContent || "-- Skema SQL tersedia di schema.sql"}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-3.5 bg-slate-50 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
