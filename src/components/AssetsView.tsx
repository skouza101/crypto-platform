'use client';

import React from 'react';
import { 
  ArrowLeftRight, 
  Send, 
  MoreHorizontal, 
  Bitcoin, 
  DollarSign, 
  ArrowUp, 
  ArrowDown, 
  Filter, 
  TrendingUp 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';

export const AssetsView: React.FC = () => {
  const {
    assets,
    assetFilter,
    setAssetFilter,
    setNotifications,
    setActiveTab,
    setSettingsSubTab
  } = useDashboard();

  return (
    <motion.div
      key="assets"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col gap-8 select-none w-full"
    >
      {/* Top Row: Hero Stats & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Total Portfolio Value Card */}
        <div className="glass-panel rounded-2xl p-6 lg:p-8 col-span-1 lg:col-span-2 relative overflow-hidden flex flex-col justify-between min-h-[224px]">
          {/* Decorative soft purple radial glow inside card resembling the reference image theme */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#a855f7]/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div>
            <h2 className="text-sm text-[#dfe3e9]/50 uppercase tracking-widest font-mono font-semibold">Total Portfolio Value</h2>
            <div className="flex flex-wrap items-baseline gap-4 mt-2.5">
              <span className="text-4xl md:text-5xl font-extrabold text-[#dfe3e9] tracking-tight leading-none font-display">
                ${assets.reduce((sum, item) => sum + item.valueUSD, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs font-mono font-bold text-[#00e5ff] flex items-center bg-[#00e5ff]/10 px-2.5 py-1 rounded-lg border border-[#00e5ff]/20">
                <TrendingUp className="w-3.5 h-3.5 mr-1 animate-pulse" />
                +5.2%
              </span>
            </div>
          </div>
          
          <div className="flex gap-4 mt-8">
            {/* Polished, custom visual styled buttons for Trade & Transfer */}
            <button 
              onClick={() => {
                setActiveTab('Discover');
                setNotifications(p => ['Welcome back to the trading deck. Specify params or use leverage calculators block below.', ...p]);
              }}
              className="flex-grow flex-1 bg-white/2 hover:bg-[#a855f7]/15 border border-white/5 hover:border-[#a855f7]/40 text-[#dfe3e9] hover:text-white font-medium text-xs md:text-sm py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer border-none"
            >
              <ArrowLeftRight className="w-4 h-4 text-[#a855f7]/80 group-hover:text-[#a855f7] transition-transform group-hover:rotate-180 duration-500" />
              <span>Trade</span>
            </button>
            <button 
              onClick={() => {
                setActiveTab('Funds');
                setNotifications(p => ['Navigated to transfer channels drawer. Securely move funds instantly.', ...p]);
              }}
              className="flex-grow flex-1 bg-white/2 hover:bg-[#00e5ff]/15 border border-white/5 hover:border-[#00e5ff]/40 text-[#dfe3e9] hover:text-white font-medium text-xs md:text-sm py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer border-none"
            >
              <Send className="w-4 h-4 text-[#00e5ff]/80 group-hover:text-[#00e5ff] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
              <span>Transfer</span>
            </button>
          </div>
        </div>

        {/* Distribution Chart Card */}
        <div className="glass-panel rounded-2xl p-6 col-span-1 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-white tracking-wide">Distribution</h3>
            <button 
              onClick={() => setNotifications(p => ['Portfolio distribution balanced dynamically.', ...p])}
              className="text-[#dfe3e9]/40 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5 cursor-pointer border-none bg-transparent outline-none"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-grow flex items-center justify-center relative my-4">
            {/* SVG Circular Doughnut gradient simulation centered perfect design */}
            <div 
              style={{
                background: 'conic-gradient(#f7931a 0% 45%, #627eea 45% 75%, #d1bcff 75% 90%, #a855f7 90% 100%)'
              }}
              className="w-36 h-36 rounded-full relative shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center animate-fade-in"
            >
              <div className="absolute inset-[15%] rounded-full bg-[#1b2024] shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border border-white/5 flex flex-col items-center justify-center">
                <span className="text-[9px] uppercase font-bold text-[#dfe3e9]/35 tracking-wider font-mono">Total Assets</span>
                <span className="text-xl font-extrabold text-white mt-0.5 leading-none font-mono">4</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-y-2.5 gap-x-2 mt-auto pt-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#f7931a] shadow-[0_0_8px_rgba(247,147,26,0.5)]" />
              <span className="text-[11px] text-[#dfe3e9]/65">BTC <span className="text-white font-mono font-bold ml-1">45%</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#627eea] shadow-[0_0_8px_rgba(98,126,234,0.5)]" />
              <span className="text-[11px] text-[#dfe3e9]/65">ETH <span className="text-white font-mono font-bold ml-1">30%</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#d1bcff] shadow-[0_0_8px_rgba(209,188,255,0.5)]" />
              <span className="text-[11px] text-[#dfe3e9]/65">SOL <span className="text-white font-mono font-bold ml-1">15%</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#a855f7] shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
              <span className="text-[11px] text-[#dfe3e9]/65">Others <span className="text-white font-mono font-bold ml-1">10%</span></span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Row: Table & Activities */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Your Assets Table widget */}
        <div className="glass-panel rounded-2xl p-6 xl:col-span-2 overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
              <h3 className="text-lg font-bold text-white tracking-wide">Your Assets</h3>
              
              {/* Active Filter categories */}
              <div className="bg-white/2 p-1 rounded-xl flex border border-white/5 self-start sm:self-auto select-none">
                {(['All', 'Crypto', 'Fiat'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setAssetFilter(filter);
                      setNotifications(p => [`Filtered list to: ${filter}`, ...p]);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 border-none bg-transparent outline-none ${
                      assetFilter === filter 
                        ? 'bg-white/5 text-white shadow-sm' 
                        : 'text-[#dfe3e9]/40 hover:text-[#dfe3e9]/80'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] uppercase font-bold text-[#dfe3e9]/40 tracking-wider font-mono">
                    <th className="pb-4 font-semibold pl-2">Asset</th>
                    <th className="pb-4 font-semibold text-right">Balance</th>
                    <th className="pb-4 font-semibold text-right">Price</th>
                    <th className="pb-4 font-semibold text-right pr-2">24h Change</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-[#ffffff03] text-white">
                  {assets
                    .filter(a => assetFilter === 'All' || a.type.toLowerCase() === assetFilter.toLowerCase())
                    .map((asset) => {
                      const isPositive = asset.change24h > 0;
                      const isNeutral = asset.change24h === 0;
                      return (
                        <tr key={asset.id} className="hover:bg-white/1.5 transition-colors group">
                          <td className="py-4 pl-2">
                            <div className="flex items-center gap-3.5">
                              <div className="w-10 h-10 rounded-full bg-white/2 border border-white/5 flex items-center justify-center font-bold">
                                {asset.symbol === 'BTC' && <Bitcoin className="w-4.5 h-4.5 text-[#f7931a] drop-shadow-[0_0_6px_rgba(247,147,26,0.3)]" />}
                                {asset.symbol === 'ETH' && <span className="text-[#627eea] font-mono text-base font-semibold">Ξ</span>}
                                {asset.symbol === 'SOL' && <span className="text-[#d1bcff] font-mono text-xs font-extrabold tracking-tight">SOL</span>}
                                {asset.symbol === 'USD' && <DollarSign className="w-4.5 h-4.5 text-[#00e5ff]" />}
                              </div>
                              <div>
                                <div className="font-bold text-white text-[14px] leading-tight">{asset.name}</div>
                                <div className="text-[10px] text-[#dfe3e9]/40 font-mono font-semibold uppercase mt-0.5">{asset.symbol}</div>
                              </div>
                            </div>
                          </td>
                          
                          <td className="py-4 text-right">
                            <div className="font-bold text-white font-mono text-[13px] tracking-tight">
                              {asset.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5 })}
                            </div>
                            <div className="text-[10px] text-[#dfe3e9]/35 font-mono mt-0.5">
                              ${asset.valueUSD.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </div>
                          </td>
                          
                          <td className="py-4 text-right font-mono text-[13px] text-[#dfe3e9]/80">
                            ${asset.priceUSD.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </td>
                          
                          <td className="py-4 text-right pr-2">
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg border inline-flex items-center gap-0.5 ${
                              isNeutral 
                                ? 'bg-white/5 text-[#dfe3e9]/35 border-transparent' 
                                : isPositive 
                                  ? 'bg-[#00e5ff]/10 text-[#00e5ff] border-[#00e5ff]/10' 
                                  : 'bg-[#ffb4ab]/10 text-[#ffb4ab] border-[#ffb4ab]/10'
                            }`}>
                              {!isNeutral && (
                                isPositive ? <ArrowUp className="w-3 h-3 text-[#00e5ff]" /> : <ArrowDown className="w-3 h-3 text-[#ffb4ab]" />
                              )}
                              {isNeutral ? '0.0%' : `${isPositive ? '+' : ''}${asset.change24h}%`}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          
          <button 
            onClick={() => setNotifications(p => ['Loading auxiliary assets. Standard test-ledger limit reached.', ...p])}
            className="mt-6 w-full py-2.5 border-t border-white/5 text-[#a855f7] hover:text-[#b76dff] text-xs font-mono font-bold hover:bg-white/1 rounded-b-xl cursor-pointer transition-colors border-none bg-transparent"
          >
            View All Assets
          </button>
        </div>

        {/* Recent Activities Panel widget */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-bold text-white tracking-wide">Recent Activities</h3>
              <button 
                onClick={() => {
                  setNotifications(p => ['Filtered activities feed by standard ledger logic.', ...p]);
                }}
                className="text-[#dfe3e9]/40 hover:text-white transition-all p-1 rounded-lg hover:bg-white/5 cursor-pointer border-none bg-transparent"
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3.5">
              {/* Deposit BTC */}
              <div className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/2 transition-all cursor-pointer group border border-transparent hover:border-white/5">
                <div className="w-9 h-9 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] flex items-center justify-center group-hover:scale-105 transition-transform border border-[#00e5ff]/10 animate-fade-in">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
                <div className="flex-grow">
                  <div className="text-[13px] font-semibold text-white leading-tight">Deposit BTC</div>
                  <div className="text-[10px] text-[#dfe3e9]/35 font-mono mt-0.5">Today, 14:32</div>
                </div>
                <div className="text-right flex flex-col items-end shrink-0">
                  <div className="text-[12px] font-bold font-mono text-[#00e5ff]">+0.05 BTC</div>
                  <div className="text-[9px] text-[#dfe3e9]/30 mt-0.5">Completed</div>
                </div>
              </div>

              {/* Trade ETH */}
              <div className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/2 transition-all cursor-pointer group border border-transparent hover:border-white/5">
                <div className="w-9 h-9 rounded-full bg-[#a855f7]/10 text-[#a855f7] flex items-center justify-center group-hover:scale-105 transition-transform border border-[#a855f7]/10 animate-fade-in">
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </div>
                <div className="flex-grow">
                  <div className="text-[13px] font-semibold text-white leading-tight">Trade ETH to SOL</div>
                  <div className="text-[10px] text-[#dfe3e9]/35 font-mono mt-0.5">Yesterday, 09:15</div>
                </div>
                <div className="text-right flex flex-col items-end shrink-0">
                  <div className="text-[12px] font-bold font-mono text-white">45 SOL</div>
                  <div className="text-[9px] text-[#dfe3e9]/30 mt-0.5">Completed</div>
                </div>
              </div>

              {/* Withdraw USD */}
              <div className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/2 transition-all cursor-pointer group border border-transparent hover:border-white/5">
                <div className="w-9 h-9 rounded-full bg-[#ffb4ab]/10 text-[#ffb4ab] flex items-center justify-center group-hover:scale-105 transition-transform border border-[#ffb4ab]/10 animate-fade-in">
                  <ArrowUp className="w-3.5 h-3.5" />
                </div>
                <div className="flex-grow">
                  <div className="text-[13px] font-semibold text-white leading-tight">Withdraw USD</div>
                  <div className="text-[10px] text-[#dfe3e9]/35 font-mono mt-0.5">Oct 24, 18:00</div>
                </div>
                <div className="text-right flex flex-col items-end shrink-0">
                  <div className="text-[12px] font-bold font-mono text-[#ffb4ab]">-$1,200.00</div>
                  <div className="text-[9px] text-[#ffb4ab]/60 mt-0.5">Processing</div>
                </div>
              </div>

              {/* Deposit USDT */}
              <div className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/2 transition-all cursor-pointer group border border-transparent hover:border-white/5">
                <div className="w-9 h-9 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] flex items-center justify-center group-hover:scale-105 transition-transform border border-[#00e5ff]/10 animate-fade-in">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
                <div className="flex-grow">
                  <div className="text-[13px] font-semibold text-white leading-tight">Deposit USDT</div>
                  <div className="text-[10px] text-[#dfe3e9]/35 font-mono mt-0.5">Oct 20, 11:45</div>
                </div>
                <div className="text-right flex flex-col items-end shrink-0">
                  <div className="text-[12px] font-bold font-mono text-[#00e5ff]">+5,000.00</div>
                  <div className="text-[9px] text-[#dfe3e9]/30 mt-0.5">Completed</div>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setNotifications(p => ['No older activities in this test log check.', ...p])}
            className="mt-6 w-full py-2.5 border-t border-white/5 text-[#dfe3e9]/40 hover:text-white font-semibold text-[11px] hover:bg-white/1 rounded-b-xl cursor-pointer transition-colors border-none bg-transparent"
          >
            View History
          </button>
        </div>

      </div>
    </motion.div>
  );
};
