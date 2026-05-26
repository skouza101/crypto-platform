'use client';

import React from 'react';
import { 
  User, 
  Shield, 
  BellRing, 
  Key, 
  Camera, 
  Mail, 
  Trash2 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';

export const SettingsView: React.FC = () => {
  const {
    settingsSubTab,
    setSettingsSubTab,
    profileFirstName,
    setProfileFirstName,
    profileLastName,
    setProfileLastName,
    profileEmail,
    profileAvatar,
    setProfileAvatar,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    twoFactorEnabled,
    setTwoFactorEnabled,
    notifyTradingAlerts,
    setNotifyTradingAlerts,
    notifyAccountStatus,
    setNotifyAccountStatus,
    notifyNewsletter,
    setNotifyNewsletter,
    notifySoundEffects,
    setNotifySoundEffects,
    apiKeys,
    setApiKeys,
    newKeyName,
    setNewKeyName,
    setNotifications
  } = useDashboard();

  return (
    <motion.div
      key="settings"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col gap-8 select-none w-full"
    >
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl md:text-2xl font-black text-white tracking-widest uppercase font-mono">
          Settings
        </h1>
        <p className="text-xs text-[#dfe3e9]/50">
          Manage your account preferences, security settings, and API integrations.
        </p>
      </div>

      {/* Settings Layout: Sidebar Tabs + Content Area */}
      <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
        
        {/* Vertical Tabs (Glass Panel) */}
        <div className="w-full lg:w-64 bg-white/2 border border-white/5 rounded-2xl p-3 shrink-0 lg:sticky lg:top-24">
          <nav className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible scrollbar-none pb-2 lg:pb-0">
            <button 
              onClick={() => setSettingsSubTab('profile')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left font-mono text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border-none ${
                settingsSubTab === 'profile' 
                  ? 'bg-[#a855f7]/10 border-l-2 border-[#a855f7] text-white shadow-inner' 
                  : 'text-[#dfe3e9]/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <User className={`w-4 h-4 ${settingsSubTab === 'profile' ? 'text-[#a855f7]' : 'text-[#dfe3e9]/40'}`} />
              <span>Profile</span>
            </button>
            <button 
              onClick={() => setSettingsSubTab('security')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left font-mono text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border-none ${
                settingsSubTab === 'security' 
                  ? 'bg-[#a855f7]/10 border-l-2 border-[#a855f7] text-white shadow-inner' 
                  : 'text-[#dfe3e9]/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <Shield className={`w-4 h-4 ${settingsSubTab === 'security' ? 'text-[#a855f7]' : 'text-[#dfe3e9]/40'}`} />
              <span>Security</span>
            </button>
            <button 
              onClick={() => setSettingsSubTab('notifications')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left font-mono text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border-none ${
                settingsSubTab === 'notifications' 
                  ? 'bg-[#a855f7]/10 border-l-2 border-[#a855f7] text-white shadow-inner' 
                  : 'text-[#dfe3e9]/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <BellRing className={`w-4 h-4 ${settingsSubTab === 'notifications' ? 'text-[#a855f7]' : 'text-[#dfe3e9]/40'}`} />
              <span>Notifications</span>
            </button>
            <button 
              onClick={() => setSettingsSubTab('api')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left font-mono text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border-none ${
                settingsSubTab === 'api' 
                  ? 'bg-[#a855f7]/10 border-l-2 border-[#a855f7] text-white shadow-inner' 
                  : 'text-[#dfe3e9]/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <Key className={`w-4 h-4 ${settingsSubTab === 'api' ? 'text-[#a855f7]' : 'text-[#dfe3e9]/40'}`} />
              <span>API Keys</span>
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full max-w-3xl flex flex-col gap-6">
          
          {/* Profile Section */}
          {settingsSubTab === 'profile' && (
            <div className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-lg shadow-black/30 w-full">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#a855f7] font-mono flex items-center gap-2 mb-2">
                <User className="w-4.5 h-4.5" />
                <span>Profile Information</span>
              </h2>
              
              {/* Avatar upload */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative group cursor-pointer shrink-0">
                  <img 
                    alt="Current Profile Avatar" 
                    className="w-20 h-20 rounded-full border-2 border-[#988d9f]/20 object-cover group-hover:border-[#a855f7] transition-all duration-300"
                    src={profileAvatar} 
                  />
                  <div className="absolute inset-0 bg-[#0f1418]/65 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2.5 text-center sm:text-left">
                  <p className="text-[11px] font-mono text-[#dfe3e9]/40 leading-relaxed">
                    Recommended size: 256x256px. Max file size: 2MB.
                  </p>
                  <div className="flex gap-3 justify-center sm:justify-start">
                    <button 
                      onClick={() => {
                        const pool = [
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop',
                          'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&auto=format&fit=crop',
                          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop',
                          'https://lh3.googleusercontent.com/aida-public/AB6AXuAzs3_e15iV11BeB_VM3YFqTB398gpK8vTfnzTNKbZfIydZEfZGJJNDYZs-vOv_FuKptHhreR8oGSaX4qyujssbh7xJ93AxzCa5L08hZdiE45jhuxbzXr8UQVuRSeK787DwqDncse5A2_WdkEgHno2sdwgM1fj55z3C_pp2c59sJ-jALKXNXxzV3hCkKZ4-e8kHmYeksTZRSy2twJiq8saojRMWnQV7C2hj2eYu4I9HAB70JA_pe0QnXxWM62aLX98B9JiaVTVQvUrK'
                        ];
                        const next = pool[Math.floor(Math.random() * pool.length)];
                        setProfileAvatar(next);
                        setNotifications(p => ['Profile picture updated successfully.', ...p]);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-white bg-white/2 hover:bg-white/5 border border-white/5 cursor-pointer select-none transition-all border-none"
                    >
                      Upload Random Custom
                    </button>
                    <button 
                      onClick={() => {
                        setProfileAvatar('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&auto=format&fit=crop');
                        setNotifications(p => ['Profile picture reset to generic placeholder.', ...p]);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-[#ffb4ab] hover:bg-[#ffb4ab]/10 cursor-pointer select-none transition-all border-none bg-transparent"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <hr className="border-white/5" />

              {/* Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono font-bold text-[#dfe3e9]/40 uppercase tracking-widest">First Name</label>
                  <input 
                    type="text" 
                    value={profileFirstName}
                    onChange={(e) => setProfileFirstName(e.target.value)}
                    className="w-full bg-[#171c20] text-xs font-semibold text-white px-4 py-3.5 rounded-xl border border-white/5 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono font-bold text-[#dfe3e9]/40 uppercase tracking-widest">Last Name</label>
                  <input 
                    type="text" 
                    value={profileLastName}
                    onChange={(e) => setProfileLastName(e.target.value)}
                    className="w-full bg-[#171c20] text-xs font-semibold text-white px-4 py-3.5 rounded-xl border border-white/5 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[10px] font-mono font-bold text-[#dfe3e9]/40 uppercase tracking-widest">Email Address</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      value={profileEmail}
                      readOnly
                      className="w-full bg-[#171c20] text-[#dfe3e9]/55 text-xs font-semibold pl-10 pr-4 py-3.5 rounded-xl border border-white/5 focus:outline-none cursor-not-allowed select-text font-mono"
                    />
                    <Mail className="w-4 h-4 text-[#dfe3e9]/35 absolute left-3.5 top-4" />
                  </div>
                  <p className="text-[10px] text-[#dfe3e9]/30 font-mono mt-1">* This email is managed by Supabase Auth and stays locked inside the simulator profile.</p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button 
                  onClick={() => {
                    setNotifications(p => [`Profile saved dynamically for ${profileFirstName} ${profileLastName}`, ...p]);
                  }}
                  className="px-6 py-3 bg-[#a855f7] hover:bg-[#b76dff] text-white font-mono font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 cursor-pointer border-none"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Security Section */}
          {settingsSubTab === 'security' && (
            <div className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-lg shadow-black/30 w-full">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#a855f7] font-mono flex items-center gap-2 mb-2">
                <Shield className="w-4.5 h-4.5" />
                <span>Security Configuration</span>
              </h2>

              {/* Password change fields */}
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold text-white tracking-wide">Update Account Password</span>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono font-bold text-[#dfe3e9]/40 uppercase tracking-widest">Current Password</label>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#171c20] text-xs font-semibold text-white px-4 py-3.5 rounded-xl border border-white/5 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono font-bold text-[#dfe3e9]/40 uppercase tracking-widest">New Password</label>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 8 characters"
                      className="w-full bg-[#171c20] text-xs font-semibold text-white px-4 py-3.5 rounded-xl border border-white/5 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono font-bold text-[#dfe3e9]/40 uppercase tracking-widest">Confirm New Password</label>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-[#171c20] text-xs font-semibold text-white px-4 py-3.5 rounded-xl border border-white/5 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <input 
                    type="checkbox" 
                    id="show-pw" 
                    checked={showPassword} 
                    onChange={(e) => setShowPassword(e.target.checked)} 
                    className="bg-transparent rounded border-white/10 text-[#a855f7] focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer" 
                  />
                  <label htmlFor="show-pw" className="text-[10px] font-mono text-[#dfe3e9]/55 uppercase tracking-wide cursor-pointer">Show character strings</label>
                </div>

                <button 
                  onClick={() => {
                    if (!currentPassword || !newPassword || !confirmPassword) {
                      setNotifications(p => ['Provide password fields fully to update core authentication.', ...p]);
                      return;
                    }
                    if (newPassword !== confirmPassword) {
                      setNotifications(p => ['New passwords do not match.', ...p]);
                      return;
                    }
                    setNotifications(p => ['Password configuration updated successfully.', ...p]);
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                  className="self-end px-5 py-2.5 bg-white/3 hover:bg-white/6 border border-white/5 rounded-xl text-xs font-mono font-bold text-white transition-all cursor-pointer"
                >
                  Update Password
                </button>
              </div>

              <hr className="border-white/5" />

              {/* Two Factor Block */}
              <div className="flex items-center justify-between p-4 bg-white/2 border border-white/5 rounded-2xl">
                <div className="flex flex-col gap-0.5 max-w-[70%] text-left">
                  <span className="text-xs font-bold text-white">Two-Factor Authentication (2FA)</span>
                  <span className="text-[10px] text-[#dfe3e9]/40 leading-relaxed font-mono">
                    Require a code generator token upon core transfer requests.
                  </span>
                </div>
                
                {/* Interactive Toggle Switch */}
                <button
                  onClick={() => {
                    setTwoFactorEnabled(!twoFactorEnabled);
                    setNotifications(p => [!twoFactorEnabled ? 'Two-Factor Authentication activated and secured.' : 'Two-Factor Authentication turned off.', ...p]);
                  }}
                  className={`w-12 h-6.5 rounded-full p-1 transition-colors relative cursor-pointer outline-none border-none ${
                    twoFactorEnabled ? 'bg-[#a855f7]' : 'bg-white/10'
                  }`}
                >
                  <div 
                    className={`w-4.5 h-4.5 bg-white rounded-full transition-all duration-300 transform shadow ${
                      twoFactorEnabled ? 'translate-x-[20px]' : 'translate-x-0'
                    }`} 
                  />
                </button>
              </div>

              {/* Connected Devices Details */}
              <div className="flex flex-col gap-3 mt-1 text-left">
                <span className="text-[11px] font-mono font-bold text-[#dfe3e9]/40 uppercase tracking-widest">Active Device Connections</span>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between p-3.5 bg-[#171c20] border border-white/5 rounded-xl">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-white font-mono">MacBook Pro (Chrome)</span>
                      <span className="text-[10px] text-[#dfe3e9]/45 font-mono">London, UK • Current active session</span>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-[#00e5ff] uppercase">ACTIVE NOW</span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 bg-[#171c20] border border-white/5 rounded-xl">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-white font-mono">Apple iPhone 15 (Safari)</span>
                      <span className="text-[10px] text-[#dfe3e9]/45 font-mono">Paris, France • 3.2 hours ago</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#dfe3e9]/30">LB REMOTE</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Notifications Section */}
          {settingsSubTab === 'notifications' && (
            <div className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-lg shadow-black/30 w-full">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#a855f7] font-mono flex items-center gap-2 mb-2">
                <BellRing className="w-4.5 h-4.5" />
                <span>Notification Preferences</span>
              </h2>

              <div className="flex flex-col gap-5 divide-y divide-white/5 font-sans">
                
                {/* Alert 1 */}
                <div className="flex items-center justify-between py-3 text-left">
                  <div className="flex flex-col gap-0.5 max-w-[80%]">
                    <span className="text-xs font-bold text-white">Trading Alerts Tickers</span>
                    <span className="text-[10px] text-[#dfe3e9]/40 font-mono leading-relaxed">
                      Send notifications instantly on key price spikes, margin breaches, or indicator thresholds.
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setNotifyTradingAlerts(!notifyTradingAlerts);
                      setNotifications(p => [!notifyTradingAlerts ? 'Trading alerts enabled.' : 'Trading alerts muted.', ...p]);
                    }}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors relative cursor-pointer shrink-0 border-none ${
                      notifyTradingAlerts ? 'bg-[#a855f7]' : 'bg-white/10'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform transform ${notifyTradingAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Alert 2 */}
                <div className="flex items-center justify-between py-4 text-left">
                  <div className="flex flex-col gap-0.5 max-w-[80%]">
                    <span className="text-xs font-bold text-white">Account Security & System Notifications</span>
                    <span className="text-[10px] text-[#dfe3e9]/40 font-mono leading-relaxed">
                      Receive direct security warnings, system updates, and authorization logs immediately.
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setNotifyAccountStatus(!notifyAccountStatus);
                      setNotifications(p => [!notifyAccountStatus ? 'Account security logs enabled.' : 'Account security logs muted.', ...p]);
                    }}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors relative cursor-pointer shrink-0 border-none ${
                      notifyAccountStatus ? 'bg-[#a855f7]' : 'bg-white/10'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform transform ${notifyAccountStatus ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Alert 3 */}
                <div className="flex items-center justify-between py-4 text-left">
                  <div className="flex flex-col gap-0.5 max-w-[80%]">
                    <span className="text-xs font-bold text-white">Ambient Sound FX</span>
                    <span className="text-[10px] text-[#dfe3e9]/40 font-mono leading-relaxed">
                      Toggle soft auditory clips in trading simulator on click actions.
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setNotifySoundEffects(!notifySoundEffects);
                      setNotifications(p => [!notifySoundEffects ? 'Trading click sound effects live.' : 'Click sound effects muted.', ...p]);
                    }}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors relative cursor-pointer shrink-0 border-none ${
                      notifySoundEffects ? 'bg-[#a855f7]' : 'bg-white/10'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform transform ${notifySoundEffects ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Alert 4 */}
                <div className="flex items-center justify-between py-4 text-left">
                  <div className="flex flex-col gap-0.5 max-w-[80%]">
                    <span className="text-xs font-bold text-white">Macro Analysis & Newsletter Digests</span>
                    <span className="text-[10px] text-[#dfe3e9]/40 font-mono leading-relaxed">
                      Deliver weekly summaries of economic reports and central bank policies directly to mailbox.
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setNotifyNewsletter(!notifyNewsletter);
                      setNotifications(p => [!notifyNewsletter ? 'Weekly newsletter subscribed.' : 'Newsletter subscription disabled.', ...p]);
                    }}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors relative cursor-pointer shrink-0 border-none ${
                      notifyNewsletter ? 'bg-[#a855f7]' : 'bg-white/10'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform transform ${notifyNewsletter ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* API Keys Section */}
          {settingsSubTab === 'api' && (
            <div className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-lg shadow-black/30 w-full">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#a855f7] font-mono flex items-center gap-2 mb-2">
                <Key className="w-4.5 h-4.5" />
                <span>API Credentials</span>
              </h2>

              <div className="flex flex-col gap-4 text-left">
                <span className="text-xs font-bold text-white">Generate Developer API Key</span>
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g. Backtest Server Endpoint"
                    className="flex-1 bg-[#171c20] text-xs font-semibold text-white px-4 py-3 rounded-xl border border-white/5 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]"
                  />
                  <button 
                    onClick={() => {
                      if (!newKeyName) {
                        setNotifications(p => ['Provide API Label description to generate credentials.', ...p]);
                        return;
                      }
                      const randHex = Array.from({length: 8}, () => Math.floor(Math.random()*16).toString(16)).join('');
                      const todayStr = new Date().toISOString().split('T')[0];
                      const newItem = {
                        id: String(apiKeys.length + 1),
                        name: newKeyName,
                        keyHex: `lb_live_${randHex}...${Math.floor(Math.random()*10000)}`,
                        created: todayStr,
                        status: 'Active'
                      };
                      setApiKeys(p => [...p, newItem]);
                      setNotifications(p => [`Generated core credentials for ${newKeyName}`, ...p]);
                      setNewKeyName('');
                    }}
                    className="px-4.5 py-3 rounded-xl text-xs font-mono font-bold text-white bg-[#a855f7] hover:bg-[#b76dff] shadow-md transition-all shrink-0 cursor-pointer border-none"
                  >
                    + Generate Key
                  </button>
                </div>
              </div>

              <hr className="border-white/5" />

              {/* List of Keys */}
              <div className="flex flex-col gap-3 text-left">
                <span className="text-[11px] font-mono font-bold text-[#dfe3e9]/40 uppercase tracking-widest">Active Programmatic Connectors</span>
                
                <div className="flex flex-col gap-3">
                  {apiKeys.length === 0 ? (
                    <div className="text-center py-6 text-xs text-[#dfe3e9]/30 font-mono">
                      No active developer tokens configured. Create a developer key to begin websocket feeds.
                    </div>
                  ) : (
                    apiKeys.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#171c20] border border-white/5 rounded-xl gap-4">
                        <div className="flex flex-col gap-1 text-left">
                          <span className="text-xs font-bold text-white">{item.name}</span>
                          <div className="flex items-center gap-2">
                            <code className="text-[10px] text-[#dfe3e9]/55 font-mono select-all bg-white/2 px-2 py-0.5 rounded">{item.keyHex}</code>
                            <button 
                              onClick={() => {
                                navigator.clipboard.writeText(item.keyHex);
                                setNotifications(p => [`Copied key token: ${item.keyHex}`, ...p]);
                              }}
                              className="text-xs text-[#a855f7] font-mono font-bold hover:underline cursor-pointer bg-transparent border-none outline-none p-0"
                            >
                              Copy
                            </button>
                          </div>
                          <span className="text-[9px] text-[#dfe3e9]/30 font-mono">Created: {item.created}</span>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/15 font-mono font-bold text-[9px]">
                            <span className="w-1.5 h-1.5 bg-[#a855f7] rounded-full" />
                            {item.status}
                          </span>
                          <button 
                            onClick={() => {
                              setApiKeys(p => p.filter(k => k.id !== item.id));
                              setNotifications(p => [`Revoked programmatic identifier of ${item.name}`, ...p]);
                            }}
                            className="p-2 bg-red-500/5 hover:bg-red-500/15 border border-red-500/10 hover:border-red-500/20 text-[#ffb4ab] rounded-xl cursor-pointer transition-colors"
                            title="Revoke and delete key"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </motion.div>
  );
};
