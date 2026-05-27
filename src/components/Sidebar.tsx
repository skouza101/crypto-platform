'use client';

import React, { useState } from 'react';
import { 
  Compass, 
  Layers, 
  Wallet, 
  Calendar, 
  Settings,
  Menu,
  X,
  Bell,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';

export const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    setNotifications,
    profileAvatar,
    profileFirstName,
    profileLastName,
    setSettingsSubTab,
    signOut
  } = useDashboard();

  return (
    <aside id="main-sidebar" className="hidden md:flex flex-col w-64 bg-[#0f1418] border-r border-[#988d9f]/10 p-6 shrink-0 z-20 sticky top-0 h-screen select-none">
      
      {/* Brand Logo Header */}
      <div id="brand-header" className="flex items-center gap-3 mb-10 pl-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#a855f7] to-[#00e5ff] flex items-center justify-center shadow-lg shadow-purple-950/40 relative group overflow-hidden">
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="text-white font-black text-sm select-none tracking-wider">SK</span>
        </div>
        <div>
          <span className="font-display font-black tracking-wider text-lg text-white group-hover:text-purple-300 transition-colors uppercase">
            Sko<span className="text-[#a855f7]">rypto</span>
          </span>
        </div>
      </div>

      {/* Navigation Core */}
      <nav id="nav-container" className="flex flex-col gap-2 flex-grow">
        {[
          { name: 'Discover', icon: Compass },
          { name: 'Assets', icon: Layers },
          { name: 'Funds', icon: Wallet },
          { name: 'Settings', icon: Settings }
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;
          return (
            <button
              key={item.name}
              id={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
              onClick={() => {
                setActiveTab(item.name as any);
                setNotifications(prev => [
                  `Switched to view: ${item.name}`,
                  ...prev.slice(0, 5)
                ]);
              }}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 select-none cursor-pointer group ${
                isActive 
                  ? 'bg-gradient-to-r from-[#a855f7]/15 to-transparent text-white' 
                  : 'text-[#dfe3e9]/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'text-[#a855f7] scale-105' : 'group-hover:scale-105 group-hover:text-[#a855f7]/80'}`} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="pt-5 border-t border-white/5">
        <div className="flex items-center gap-3 px-2 mb-3">
          <img src={profileAvatar} alt={`${profileFirstName} ${profileLastName}`} className="w-9 h-9 rounded-full object-cover border border-white/10" />
          <div className="min-w-0">
            <div className="text-xs font-bold text-white truncate">{profileFirstName} {profileLastName}</div>
            <button
              onClick={() => {
                setActiveTab('Settings');
                setSettingsSubTab('profile');
              }}
              className="text-[10px] text-[#dfe3e9]/40 hover:text-[#a855f7] font-mono"
            >
              Profile settings
            </button>
          </div>
        </div>
        <button
          onClick={() => void signOut()}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#ffb4ab] hover:bg-[#ffb4ab]/10 transition-all cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export const MobileNavigation: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    notificationOpen, 
    setNotificationOpen,
    signOut
  } = useDashboard();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* --- MOBILE ACCORDION HEADER --- */}
      <header id="mobile-header" className="md:hidden flex items-center justify-between p-4 bg-[#0a0f13] border-b border-[#988d9f]/10 z-30 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#a855f7] to-[#00e5ff] flex items-center justify-center">
            <span className="text-white font-[900] text-[10px]">SK</span>
          </div>
          <span className="font-display font-extrabold tracking-wider text-sm text-white uppercase">
            Sko<span className="text-[#a855f7]">rypto</span>
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Notifications Trigger */}
          <button 
            onClick={() => setNotificationOpen(!notificationOpen)} 
            className="p-2 rounded-lg bg-[#171c20] hover:bg-[#1b2024] relative text-[#dfe3e9]/70 hover:text-white"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#a855f7] rounded-full" />
          </button>
          
          {/* Mobile menu burger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-[#171c20] hover:bg-[#1b2024] text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0f13]  overflow-hidden z-20 sticky top-[57px]"
          >
            <div className="flex flex-col p-4 gap-1.5">
              {[
                { name: 'Discover', icon: Compass },
                { name: 'Assets', icon: Layers },
                { name: 'Funds', icon: Wallet },
                { name: 'Economic Calendar', icon: Calendar },
                { name: 'Settings', icon: Settings }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveTab(item.name as any);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive 
                        ? 'bg-gradient-to-r from-[#a855f7]/15 to-transparent text-white ' 
                        : 'text-[#dfe3e9]/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5 text-[#a855f7]" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  void signOut();
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-[#ffb4ab] hover:bg-[#ffb4ab]/10"
              >
                <LogOut className="w-4.5 h-4.5" />
                <span>Log Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
