import React from 'react';
import { Users, GraduationCap, Briefcase, Award, CheckCircle2 } from 'lucide-react';
import { GTKStats } from '../types.ts';

interface StatsBarProps {
  stats: GTKStats | null;
  activeFilterTipe: string;
  onSelectTipeFilter: (tipe: string) => void;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  stats,
  activeFilterTipe,
  onSelectTipeFilter,
}) => {
  if (!stats) return null;

  const cards = [
    {
      label: 'Total GTK Terdata',
      count: stats.total,
      subtext: 'Seluruh Pendidik & Tendik',
      icon: Users,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
      activeFilter: 'Semua',
    },
    {
      label: 'Tenaga Pendidik (Guru)',
      count: stats.guru,
      subtext: 'Guru Mapel & Guru Kelas',
      icon: GraduationCap,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      activeFilter: 'Guru',
    },
    {
      label: 'Tenaga Kependidikan',
      count: stats.tendik,
      subtext: 'Tata Usaha, Perpus, IT',
      icon: Briefcase,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
      activeFilter: 'Tenaga Kependidikan',
    },
    {
      label: 'PNS & PPPK',
      count: stats.pns,
      subtext: `${stats.non_pns} Honorer/GTT/PTT`,
      icon: Award,
      color: 'text-purple-600 bg-purple-50 border-purple-100',
      activeFilter: null,
    },
    {
      label: 'Status Aktif Bertugas',
      count: stats.aktif,
      subtext: 'Siap Melaksanakan Tugas',
      icon: CheckCircle2,
      color: 'text-teal-600 bg-teal-50 border-teal-100',
      activeFilter: null,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        const isClickable = card.activeFilter !== null;
        const isSelected = card.activeFilter && activeFilterTipe === card.activeFilter;

        return (
          <div
            key={idx}
            id={`stat-card-${idx}`}
            onClick={() => {
              if (isClickable && card.activeFilter) {
                onSelectTipeFilter(card.activeFilter);
              }
            }}
            className={`p-4 rounded-xl bg-white border transition-all ${
              isSelected
                ? 'border-emerald-500 ring-2 ring-emerald-100 shadow-sm'
                : 'border-slate-200 hover:border-slate-300 shadow-2xs'
            } ${isClickable ? 'cursor-pointer hover:-translate-y-0.5' : ''}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500 line-clamp-1">
                {card.label}
              </span>
              <div className={`p-1.5 rounded-lg border ${card.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {card.count}
              </span>
              <span className="text-xs text-slate-400 font-normal">orang</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 truncate">
              {card.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
};
