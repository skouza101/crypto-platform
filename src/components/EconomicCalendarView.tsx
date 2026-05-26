'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export const EconomicCalendarView: React.FC = () => {
  return (
    <motion.div
      key="economic-calendar"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="glass-panel rounded-3xl p-8 min-h-[400px] flex flex-col select-none gap-6 w-full"
    >
      <div className="flex items-center gap-3.5 mb-2 border-b border-white/5 pb-4">
        <div className="w-10 h-10 rounded-xl bg-[#a855f7]/10 flex items-center justify-center text-[#a855f7]">
          <Calendar className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white tracking-wide">Economic Calendar</h1>
          <span className="text-xs text-[#dfe3e9]/55 mt-0.5">Global macro analysis indicators.</span>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <span className="text-sm text-[#dfe3e9]/80 leading-relaxed max-w-xl">
          Listings of worldwide macro indicators and key central bank announcements. Maintain close supervision over asset margins during high-volatility sessions.
        </span>
        <div className="p-4 rounded-xl border border-dashed border-white/10 max-w-xl bg-white/1 text-xs text-[#dfe3e9]/50 flex items-center gap-3">
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#a855f7]/70 shrink-0" />
          <span>Real-time speech events and key consumer indexes are auto-updated. Check Discover page for full event indicators.</span>
        </div>
      </div>
    </motion.div>
  );
};
