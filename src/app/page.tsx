'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { DashboardProvider, useDashboard } from '../context/DashboardContext';
import { Sidebar, MobileNavigation } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { DepositModal } from '../components/DepositModal';
import { DiscoverView } from '../components/DiscoverView';
import { AssetsView } from '../components/AssetsView';
import { FundsView } from '../components/FundsView';
import { EconomicCalendarView } from '../components/EconomicCalendarView';
import { SettingsView } from '../components/SettingsView';
import { AuthOverlay } from '../components/AuthOverlay';

const DashboardContent: React.FC = () => {
  const { activeTab, session, authLoading } = useDashboard();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#080b10] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#a855f7]/25 border-t-[#a855f7] animate-spin" />
          <span className="text-xs font-mono text-[#dfe3e9]/50 uppercase tracking-widest">Loading simulator</span>
        </div>
      </div>
    );
  }

  if (!session) {
    return <AuthOverlay />;
  }

  return (
    <div id="app-root" className="min-h-screen flex flex-col md:flex-row bg-[#0f1418] text-[#dfe3e9] relative antialiased selection:bg-[#a855f7]/40 selection:text-white">
      
      {/* Background ambient decorative glowing orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-600/15 to-transparent blur-[120px] pointer-events-none rounded-full z-0" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-500/10 to-transparent blur-[150px] pointer-events-none rounded-full z-0" />

      {/* --- SIDEBAR --- */}
      <Sidebar />

      {/* --- MOBILE NAVIGATION --- */}
      <MobileNavigation />

      {/* --- CONTENT CONTAINER --- */}
      <main id="main-content-canvas" className="flex-grow p-4 md:p-8 z-10 w-full max-w-[1920px] mx-auto overflow-y-auto">
        
        {/* --- GLOBAL APP BAR / HEADER --- */}
        <Navbar />

        {/* --- VIEW SWITCHER ROUTER --- */}
        <AnimatePresence mode="wait">
          {activeTab === 'Discover' && <DiscoverView key="Discover" />}
          {activeTab === 'Assets' && <AssetsView key="Assets" />}
          {activeTab === 'Funds' && <FundsView key="Funds" />}
          {activeTab === 'Economic Calendar' && <EconomicCalendarView key="Calendar" />}
          {activeTab === 'Settings' && <SettingsView key="Settings" />}
        </AnimatePresence>

      </main>

      {/* --- DEPOSIT INTERACTIVE POPUP MODAL --- */}
      <DepositModal />

    </div>
  );
};

export default function Home() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}
