'use client';

import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Search, 
  Bell, 
  Download 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';

export const Navbar: React.FC = () => {
  const {
    fiatBalance,
    tradingBalance,
    notifications,
    setNotifications,
    notificationOpen,
    setNotificationOpen,
    setShowDepositModal,
    profileFirstName,
    profileLastName,
    profileEmail,
    profileAvatar
  } = useDashboard();

  const [copied, setCopied] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(profileEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      id="application-navbar" 
      className="bg-[#0b0e11] border border-white/5 rounded-2xl px-6 py-3.5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 select-none relative z-10 shadow-lg shadow-black/40"
    >
      
      {/* Left Section: Profile Info + Separator + Balances (Matches screenshot exactly) */}
      <div className="flex flex-wrap items-center gap-6 self-start md:self-center">
        
        {/* User Profile Area */}
        <div id="navbar-user-section" className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 shadow-md shrink-0">
            <img 
              src={profileAvatar} 
              alt={`${profileFirstName} ${profileLastName}`} 
              className="w-full h-full object-cover" 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextSibling as SVGElement | null;
                if (fallback) fallback.style.display = 'block';
              }}
            />
            {/* Fallback SVG avatar if image fails to load */}
            <svg className="w-full h-full hidden rounded-full bg-[#1b2024]" viewBox="0 0 40 40" fill="currentColor">
              <path d="M20 9a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm-8 16a8 8 0 0116 0v2H12v-2z" fill="#a855f7" />
            </svg>
          </div>
          
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-white text-sm leading-tight">{profileFirstName} {profileLastName}</span>
            <div className="flex items-center gap-1 text-[11px] text-[#dfe3e9]/65 mt-0.5 leading-none">
              <span className="font-mono">{profileEmail}</span>
              <button 
                onClick={handleCopy} 
                className="p-0.5 rounded hover:bg-white/10 active:scale-95 text-[#dfe3e9]/40 hover:text-white transition-colors cursor-pointer"
                title="Copy handler username"
              >
                {copied ? <Check className="w-3 h-3 text-[#00e5ff]" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </div>

        {/* Custom Vertical Divider Line */}
        <div className="h-8 w-px bg-white/10 hidden sm:block" />

        {/* Quick Balance Stats Area */}
        <div id="navbar-stats-section" className="flex items-center gap-8">
          {/* Fiat Balance */}
          <div className="flex flex-col">
            <span className="text-[11px] text-[#dfe3e9]/45 font-medium tracking-wide">Fiat</span>
            <span className="font-mono font-bold text-white text-base mt-0.5">
              ${fiatBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          
          {/* Trading Balance */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-[#dfe3e9]/45 font-medium tracking-wide">Trading</span>
              <span className="flex items-center text-[10px] text-[#f87171] font-semibold leading-none">
                <span className="mr-0.5">↓</span>5%
              </span>
            </div>
            <span className="font-mono font-bold text-white text-base mt-0.5">
              ${tradingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

      </div>

      {/* Right Section: Actions (Search, Notification logs, Deposit Pill) */}
      <div id="navbar-actions-section" className="flex items-center gap-3.5 w-full md:w-auto justify-end">
        
        {/* Interactive Search Area */}
        <div className="relative">
          <AnimatePresence>
            {searchOpen && (
              <motion.input
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 180, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="glass-input rounded-xl px-3 py-1.5 text-xs text-white absolute right-12 top-0 outline-none w-44 bg-[#0f1418]/90 z-10"
                placeholder="Search asset, events..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                autoFocus
              />
            )}
          </AnimatePresence>
          <button 
            onClick={() => setSearchOpen(!searchOpen)} 
            className="w-10 h-10 rounded-full bg-[#181d20]/80 hover:bg-[#20272b] border border-white/5 text-[#dfe3e9]/80 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-inner"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Live Notification Popover */}
        <div className="relative">
          <button 
            onClick={() => setNotificationOpen(!notificationOpen)} 
            className="w-10 h-10 rounded-full bg-[#181d20]/80 hover:bg-[#20272b] border border-white/5 text-[#dfe3e9]/80 hover:text-white flex items-center justify-center relative transition-all cursor-pointer shadow-inner"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#a855f7] rounded-full shadow-md shadow-[#a855f7]/60" />
          </button>

          <AnimatePresence>
            {notificationOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="absolute right-0 mt-3 w-80 glass-panel p-4 rounded-xl shadow-2xl z-35 border border-[#a855f7]/30"
              >
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
                  <span className="text-xs font-semibold text-white">Live System Log</span>
                  <button 
                    onClick={() => setNotifications([])} 
                    className="text-[10px] text-[#a855f7] hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-col gap-2.5 max-h-60 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <span className="text-xs text-[#dfe3e9]/40 py-4 text-center">No alerts logged</span>
                  ) : (
                    notifications.map((note, i) => (
                      <div key={i} className="text-xs bg-white/2 p-2 rounded border-l-2 border-[#a855f7] text-[#dfe3e9]/80 flex gap-2">
                        <span className="text-[#a855f7] font-mono">•</span>
                        <span className="leading-normal">{note}</span>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Deposit Action Pill */}
        <button 
          onClick={() => setShowDepositModal(true)}
          className="flex items-center gap-2 bg-[#b07dff] hover:bg-[#c299ff] active:scale-95 text-[#130728] font-bold text-xs md:text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-purple-900/20 cursor-pointer select-none transition-all duration-300"
        >
          <span className="tracking-wide">Deposit</span>
          <Download className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};
