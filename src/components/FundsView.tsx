'use client';

import React, { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  Lock, 
  ChevronDown, 
  AlertTriangle, 
  Bitcoin, 
  DollarSign, 
  Copy, 
  Check, 
  Filter, 
  ArrowRight,
  ArrowDown,
  ArrowUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';

export const FundsView: React.FC = () => {
  const {
    fundsTabAction,
    setFundsTabAction,
    selectedFundsAsset,
    setSelectedFundsAsset,
    selectedFundsNetwork,
    setSelectedFundsNetwork,
    withdrawalAddress,
    setWithdrawalAddress,
    withdrawalAmount,
    setWithdrawalAmount,
    setNotifications
  } = useDashboard();

  const [copied, setCopied] = useState(false);

  return (
    <motion.div
      key="funds"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col gap-8 select-none w-full"
    >
      {/* Top Title: FUNDS MANAGEMENT */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-black text-white tracking-widest uppercase font-mono">
          Funds Management
        </h1>
      </div>

      {/* Top Row: Available Balance vs Locked Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Available Balance Card */}
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[190px] shadow-lg shadow-black/30">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#a855f7]/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#dfe3e9]/40 font-mono tracking-widest font-bold uppercase">Available Balance</span>
              <span className="text-3xl md:text-4xl font-extrabold text-white mt-2 leading-none font-mono">
                $10,240<span className="text-xl text-[#dfe3e9]/60 font-semibold">.00</span>
              </span>
            </div>
            {/* Squircle Wallet symbol icon */}
            <div className="w-10 h-10 rounded-xl bg-[#a855f7]/15 border border-[#a855f7]/30 flex items-center justify-center text-[#a855f7]">
              <Wallet className="w-5 h-5 text-[#a855f7]" />
            </div>
          </div>

          {/* SVG glowing graphic path lines resembling reference image */}
          <div className="mt-4 relative h-16 w-full overflow-hidden">
            <svg viewBox="0 0 500 80" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path 
                d="M 0 65 Q 100 70 180 50 T 320 35 T 420 20 T 500 15 L 500 80 L 0 80 Z" 
                fill="url(#glowGrad)" 
              />
              <path 
                d="M 0 65 Q 100 70 180 50 T 320 35 T 420 20 T 500 15" 
                fill="none" 
                stroke="#a855f7" 
                strokeWidth="2.5" 
                className="drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]"
              />
            </svg>
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono font-medium text-[#00e5ff] mt-1.5 px-1">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              +2.4% today
            </span>
          </div>
        </div>

        {/* Locked In Orders Card */}
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[190px] shadow-lg shadow-black/30">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#a855f7]/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#dfe3e9]/40 font-mono tracking-widest font-bold uppercase">Locked in Orders</span>
              <span className="text-3xl md:text-4xl font-extrabold text-white mt-2 leading-none font-mono">
                $2,210<span className="text-xl text-[#dfe3e9]/60 font-semibold">.00</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Vertical bars soundwave graphic */}
              <div className="flex items-end gap-1.5 h-12 select-none">
                {[16, 28, 48, 36, 64, 40, 32, 24, 44, 58, 72, 52].map((h, i) => (
                  <div 
                    key={i} 
                    style={{ height: `${h}%` }} 
                    className="w-1 ml-[1px] bg-[#a855f7] rounded-full shadow-[0_0_6px_rgba(168,85,247,0.5)] opacity-80" 
                  />
                ))}
              </div>

              {/* Locked Lock Icon */}
              <div className="w-10 h-10 rounded-xl bg-[#a855f7]/15 border border-[#a855f7]/30 flex items-center justify-center text-[#a855f7]">
                <Lock className="w-4.5 h-4.5 text-[#a855f7]" />
              </div>
            </div>
          </div>

          {/* Sliders Meter representing equity utilization limit */}
          <div className="mt-auto pt-6 flex flex-col gap-2">
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5 relative">
              <div 
                className="bg-gradient-to-r from-[#a855f7] to-[#b76dff] h-full rounded-full transition-all duration-1000" 
                style={{ width: '38%' }} 
              />
            </div>
            <div className="flex justify-end pr-1">
              <span className="text-[9px] font-mono text-[#dfe3e9]/50 tracking-wider">38% of Total Equity</span>
            </div>
          </div>
        </div>

      </div>

      {/* Middle Row: Forms Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Form Inputs and Selector Panel */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col gap-6 shadow-lg shadow-black/30">
          
          {/* Switch Pill Toggle of style exact image format */}
          <div className="bg-white/2 p-1 rounded-xl flex border border-white/5 max-w-[280px]">
            <button
              onClick={() => setFundsTabAction('Deposit')}
              className={`flex-1 py-1 px-4 mt-[1px] rounded-lg text-xs font-mono font-medium tracking-wide transition-all border-none ${
                fundsTabAction === 'Deposit' 
                  ? 'bg-white/5 text-[#a855f7] border border-white/5 shadow-inner' 
                  : 'text-[#dfe3e9]/40 hover:text-white hover:bg-white/1'
              }`}
            >
              Deposit
            </button>
            <button
              onClick={() => {
                setFundsTabAction('Withdraw');
                setNotifications(p => ['Reviewing external wallet channels to withdraw.', ...p]);
              }}
              className={`flex-1 py-1 px-4 mt-[1px] rounded-lg text-xs font-mono font-medium tracking-wide transition-all border-none ${
                fundsTabAction === 'Withdraw' 
                  ? 'bg-white/5 text-[#a855f7] border border-white/5 shadow-inner' 
                  : 'text-[#dfe3e9]/40 hover:text-white hover:bg-white/1'
              }`}
            >
              Withdraw
            </button>
          </div>

          {fundsTabAction === 'Deposit' ? (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-white tracking-wide">Deposit Crypto</h3>
              </div>

              {/* Dropdown SELECT ASSET component */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-mono font-bold text-[#dfe3e9]/40 tracking-wider">Select Asset</label>
                <div className="relative">
                  <select 
                    value={selectedFundsAsset}
                    onChange={(e) => {
                      const v = e.target.value as any;
                      setSelectedFundsAsset(v);
                      setNotifications(p => [`Selected deposit asset: ${v}`, ...p]);
                    }}
                    className="appearance-none w-full bg-[#171c20] text-xs font-semibold text-white pl-4 pr-10 py-3.5 rounded-xl border border-white/5 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all cursor-pointer"
                  >
                    <option value="USDT">USDT (Tether)</option>
                    <option value="BTC">BTC (Bitcoin)</option>
                    <option value="ETH">ETH (Ethereum)</option>
                    <option value="SOL">SOL (Solana)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-white/50 absolute right-4 top-4.5 pointer-events-none" />
                </div>
              </div>

              {/* Select network component */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-mono font-bold text-[#dfe3e9]/40 tracking-wider font-mono">Select Network</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['TRC20', 'ERC20', 'BEP20'] as const).map((net) => {
                    const isSelected = selectedFundsNetwork === net;
                    return (
                      <button
                        key={net}
                        onClick={() => setSelectedFundsNetwork(net)}
                        className={`py-3.5 rounded-xl text-xs font-mono font-bold tracking-widest border transition-all cursor-pointer text-center ${
                          isSelected 
                            ? 'bg-[#a855f7]/5 border-[#a855f7] text-[#a855f7] shadow-[0_0_12px_rgba(168,85,247,0.15)]' 
                            : 'bg-white/2 border-white/5 text-[#dfe3e9]/40 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {net}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Warning notice block */}
              <div className="flex gap-4 p-4 rounded-xl border border-orange-500/10 bg-orange-500/2 text-xs text-[#dfe3e9]/80 items-start select-none">
                <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-sans">
                  Ensure you only send <strong className="text-white">{selectedFundsAsset}</strong> via the <strong className="text-white">{selectedFundsNetwork === 'TRC20' ? 'TRON (TRC20)' : selectedFundsNetwork === 'ERC20' ? 'Ethereum (ERC20)' : 'BNB Chain (BEP20)'}</strong> network. Deposits via other networks will be lost permanently.
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-white tracking-wide">Withdraw Crypto</h3>
              </div>

              {/* Dropdown SELECT ASSET block */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-mono font-bold text-[#dfe3e9]/40 tracking-wider">Select Asset</label>
                <div className="relative">
                  <select 
                    value={selectedFundsAsset}
                    onChange={(e) => setSelectedFundsAsset(e.target.value as any)}
                    className="appearance-none w-full bg-[#171c20] text-xs font-semibold text-white pl-4 pr-10 py-3.5 rounded-xl border border-white/5 focus:outline-none focus:border-[#a855f7] cursor-pointer"
                  >
                    <option value="USDT">USDT (Tether)</option>
                    <option value="BTC">BTC (Bitcoin)</option>
                    <option value="ETH">ETH (Ethereum)</option>
                    <option value="SOL">SOL (Solana)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-white/50 absolute right-4 top-4.5 pointer-events-none" />
                </div>
              </div>

              {/* Withdraw address block */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-mono font-bold text-[#dfe3e9]/40 tracking-wider font-mono">Recipient Address</label>
                <input
                  type="text"
                  placeholder="Paste external wallet address..."
                  value={withdrawalAddress}
                  onChange={(e) => setWithdrawalAddress(e.target.value)}
                  className="w-full bg-[#171c20] text-xs font-semibold text-white px-4 py-3.5 rounded-xl border border-white/5 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] placeholder:text-white/20"
                />
              </div>

              {/* Withdraw amount block */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-mono font-bold text-[#dfe3e9]/40 tracking-wider font-mono">Withdraw Amount</label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Min 10.00"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    className="w-full bg-[#171c20] text-xs font-semibold text-white pl-4 pr-16 py-3.5 rounded-xl border border-white/5 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]"
                  />
                  <button 
                    onClick={() => {
                      if (selectedFundsAsset === 'USDT') setWithdrawalAmount('10240.00');
                      else if (selectedFundsAsset === 'BTC') setWithdrawalAmount('0.14502');
                      else if (selectedFundsAsset === 'ETH') setWithdrawalAmount('4.200');
                      else if (selectedFundsAsset === 'SOL') setWithdrawalAmount('145.50');
                    }}
                    className="absolute right-3.5 top-3.5 text-[9px] font-mono font-bold text-[#a855f7] uppercase hover:underline cursor-pointer bg-transparent border-none outline-none"
                  >
                    MAX
                  </button>
                </div>
              </div>

              {/* Withdraw Button */}
              <button
                onClick={() => {
                  if (!withdrawalAddress || !withdrawalAmount) {
                    setNotifications(p => ['Provide recipient address and amount to proceed withdrawal validation.', ...p]);
                    return;
                  }
                  const amt = parseFloat(withdrawalAmount);
                  if (isNaN(amt) || amt <= 0) {
                    setNotifications(p => ['Invalid withdraw amount parameters.', ...p]);
                    return;
                  }
                  setNotifications(p => [`Withdrawal of ${withdrawalAmount} ${selectedFundsAsset} initiated to ${withdrawalAddress.slice(0, 8)}...`, ...p]);
                  setWithdrawalAddress('');
                  setWithdrawalAmount('');
                }}
                className="w-full bg-[#a855f7] hover:bg-[#b76dff] text-white font-mono font-bold py-3.5 rounded-xl transition-all duration-300 shadow-md cursor-pointer mt-2 border-none"
              >
                Submit Withdrawal
              </button>
            </div>
          )}

        </div>

        {/* QR Code and Address info block */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-between text-center shadow-lg shadow-black/30">
          
          <div className="flex flex-col gap-6 items-center w-full">
            <span className="text-[10px] uppercase font-mono font-bold text-[#dfe3e9]/40 tracking-widest mt-1">Scan to Deposit</span>
            
            {/* Glowing Purple Box Frame containing QR code */}
            <div className="p-4 rounded-3xl bg-gradient-to-br from-[#a855f7]/20 to-transparent border border-[#a855f7]/40 ring-4 ring-[#a855f7]/10 flex items-center justify-center shadow-xl shadow-[#a855f7]/5">
              <div className="bg-white p-3.5 rounded-2xl w-40 h-40 flex items-center justify-center relative select-none">
                {/* High Fidelity Clean QR Code representation SVG */}
                <svg className="w-full h-full text-[#1b2024]" viewBox="0 0 100 100" fill="currentColor">
                  <rect width="100" height="100" fill="white" />
                  {/* Anchor squares */}
                  <path d="M5 5h20v20H5V5zm4 4v12h12V9H9zm2 2h8v8h-8V11z" />
                  <path d="M75 5h20v20H75V5zm4 4v12h12V9H79zm2 2h8v8h-8V11z" />
                  <path d="M5 75h20v20H5V75zm4 4v12h12V79H9zm2 2h8v8h-8V81z" />
                  {/* Custom grid pattern representing the QR data matrix */}
                  <path d="M35 5h4v4h-4zm8 0h8v4h-8zm12 0h4v8h-4zm12 0h4v4h-4zm-36 8h8v4h-8zm16 0h4v4h-4zm4 0h12v4H39zm-8 8h12v4H31v-4zm20 0h4v4h-4zm8 0h8v4h-8V21zm-16 8h4v8h-4zm8 0h12v4H43zm16 0h4v4h-4zM5 35h8v4H5v-4zm12 0h4v12h-4V35zm8 0h12v4H25v-4zm16 0h4v4h-4zm8 0h12v12H49V35zm16 0h8v4h-8zm12 0h12v4H77v-4zm-64 8h12v4H13v-4zm16 0h4v4h-4zm8 0h4v4h-4zm24 0h8v4h-8zm16 0h4v8h-4v-8zm12 0h4v4h-4zm-84 8h4v4H5zm12 0h4v12h-4V51zm8 0h4v4h-4zm8 0h12v4H33zm16 0h8v4h-8zm16 0h4v12h-4zm12 0h4v4h-4zm-88 8h8v4H5zm20 0h12v4H25zm16 0h4v4h-4zm8 0h8v4h-8zm12 0h4v8h-4zm12 0h4v4h-4z" />
                  <rect x="42" y="42" width="16" height="16" rx="4" fill="white" />
                  <circle cx="50" cy="50" r="5" fill="#a855f7" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col gap-1 w-full mt-2.5 px-6">
              <span className="text-[10px] uppercase font-mono font-bold text-[#dfe3e9]/35 tracking-widest">Deposit Address</span>
              
              {/* Copy Address display container */}
              <div className="flex items-center bg-[#171c20] border border-white/5 rounded-xl py-2.5 pl-4 pr-2 mt-1.5 w-full justify-between gap-2 overflow-hidden">
                <span className="text-xs font-mono font-bold text-white select-text truncate text-left tracking-normal leading-relaxed">
                  {selectedFundsAsset === 'USDT' ? 'T9y0iakj9j7xA8kdb6eix9haunkg' : 
                   selectedFundsAsset === 'BTC' ? '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' : 
                   selectedFundsAsset === 'ETH' ? '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' : 
                                                  '8K7LymsDof89Ykdf6eP7H62daN7h20Kq'}
                </span>
                
                <button
                  onClick={() => {
                    const addr = selectedFundsAsset === 'USDT' ? 'T9y0iakj9j7xA8kdb6eix9haunkg' : 
                                 selectedFundsAsset === 'BTC' ? '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' : 
                                 selectedFundsAsset === 'ETH' ? '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' : 
                                                                '8K7LymsDof89Ykdf6eP7H62daN7h20Kq';
                    navigator.clipboard.writeText(addr);
                    setCopied(true);
                    setNotifications(p => [`Copied ${selectedFundsAsset} deposit address: ${addr.slice(0, 10)}...`, ...p]);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="p-2.5 rounded-lg bg-white/2 hover:bg-white/5 border border-white/5 text-[#dfe3e9]/60 hover:text-white shrink-0 active:scale-95 transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#00e5ff]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-[#dfe3e9]/30 font-mono mt-6 leading-relaxed max-w-xs">
            * The QR and addresses represent direct ledger connectors. Verification takes an average of 4-6 system blocks.
          </div>

        </div>

      </div>

      {/* Funding History Table */}
      <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between shadow-lg shadow-black/30">
        
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white tracking-wide">Funding History</h3>
            <button 
              onClick={() => setNotifications(p => ['Filtered funding history records.', ...p])}
              className="text-[#dfe3e9]/40 hover:text-white transition-all p-1.5 rounded-lg hover:bg-white/5 cursor-pointer border-none bg-transparent"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase font-bold text-[#dfe3e9]/40 tracking-wider font-mono">
                  <th className="pb-4 font-semibold">Date</th>
                  <th className="pb-4 font-semibold">Asset</th>
                  <th className="pb-4 font-semibold text-center">Type</th>
                  <th className="pb-4 font-semibold text-right">Amount</th>
                  <th className="pb-4 font-semibold text-right pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-[#ffffff03] text-white">
                
                {/* Transaction 1 */}
                <tr className="hover:bg-white/1.5 transition-colors">
                  <td className="py-4 font-mono text-[#dfe3e9]/50">Oct 24, 2023 14:32</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6.5 h-6.5 rounded-full bg-[#a855f7]/15 flex items-center justify-center text-xs font-mono font-bold text-[#a855f7]">U</div>
                      <span className="font-bold text-white">USDT <span className="text-[#dfe3e9]/35 font-mono text-[9px] font-semibold ml-0.5">Tether</span></span>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <span className="text-[#a855f7] font-semibold font-mono">Deposit</span>
                  </td>
                  <td className="py-4 text-right font-bold text-white font-mono text-[13px] tracking-tight">
                    +5,090.00
                  </td>
                  <td className="py-4 text-right pr-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/15 font-mono font-bold text-[9px]">
                      <span className="w-1.5 h-1.5 bg-[#a855f7] rounded-full" />
                      Completed
                    </span>
                  </td>
                </tr>

                {/* Transaction 2 */}
                <tr className="hover:bg-white/1.5 transition-colors">
                  <td className="py-4 font-mono text-[#dfe3e9]/50">Oct 21, 2023 09:15</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6.5 h-6.5 rounded-full bg-[#f7931a]/15 flex items-center justify-center text-[#f7931a]"><Bitcoin className="w-3.5 h-3.5" /></div>
                      <span className="font-bold text-white">BTC <span className="text-[#dfe3e9]/35 font-mono text-[9px] font-semibold ml-0.5">Bitcoin</span></span>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <span className="text-[#ffb4ab] font-semibold font-mono">Withdraw</span>
                  </td>
                  <td className="py-4 text-right font-bold text-[#dfe3e9] font-mono text-[13px] tracking-tight">
                    -0.15000000
                  </td>
                  <td className="py-4 text-right pr-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/15 font-mono font-bold text-[9px]">
                      <span className="w-1.5 h-1.5 bg-[#a855f7] rounded-full" />
                      Completed
                    </span>
                  </td>
                </tr>

                {/* Transaction 3 */}
                <tr className="hover:bg-white/1.5 transition-colors">
                  <td className="py-4 font-mono text-[#dfe3e9]/50">Oct 18, 2023 18:46</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6.5 h-6.5 rounded-full bg-[#627eea]/15 flex items-center justify-center text-xs font-mono font-semibold text-[#627eea]">Ξ</div>
                      <span className="font-bold text-white">ETH <span className="text-[#dfe3e9]/35 font-mono text-[9px] font-semibold ml-0.5">Ethereum</span></span>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <span className="text-[#a855f7] font-semibold font-mono">Deposit</span>
                  </td>
                  <td className="py-4 text-right font-bold text-white font-mono text-[13px] tracking-tight">
                    +2.50000000
                  </td>
                  <td className="py-4 text-right pr-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-[#dfe3e9]/50 border border-transparent font-mono font-bold text-[9px]">
                      <span className="w-1.5 h-1.5 bg-[#dfe3e9]/40 rounded-full" />
                      Pending
                    </span>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        <button 
          onClick={() => setNotifications(p => ['Test transaction logs synchronized with offline bank simulators.', ...p])}
          className="mt-6 w-full py-2.5 border-t border-white/5 text-[#dfe3e9]/35 hover:text-[#dfe3e9] font-medium text-xs flex justify-center items-center gap-1 cursor-pointer transition-colors border-none bg-transparent"
        >
          <span>View All History</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

      </div>
    </motion.div>
  );
};
