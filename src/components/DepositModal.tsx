'use client';

import React from 'react';
import { X, ChevronDown, DollarSign, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';

export const DepositModal: React.FC = () => {
  const {
    showDepositModal,
    setShowDepositModal,
    depositAmount,
    setDepositAmount,
    depositSlip,
    setDepositSlip,
    setFiatBalance,
    setBalanceUSD,
    setNotifications
  } = useDashboard();

  const executeDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount) && amount > 0) {
      setFiatBalance(prev => prev + amount);
      setBalanceUSD(prev => prev + amount);
      setNotifications(prev => [
        `Successfully deposited $${amount.toFixed(2)} USD via ${depositSlip}.`,
        ...prev
      ]);
      setShowDepositModal(false);
    }
  };

  return (
    <AnimatePresence>
      {showDepositModal && (
        <div className="fixed inset-0 bg-[#0f1418]/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="glass-panel w-full max-w-md rounded-2xl p-6 relative"
          >
            {/* Close Button */}
            <button 
              onClick={() => setShowDepositModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer border-none outline-none"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            <h2 className="text-lg font-bold text-white mb-1 tracking-wide">Quick Deposit Slip</h2>
            <p className="text-xs text-[#dfe3e9]/55 mb-6">Select currency and amount to instantly credit your fiat balance simulator.</p>

            <form onSubmit={executeDeposit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-[#dfe3e9]/50 uppercase tracking-wider">Method</label>
                <div className="relative">
                  <select 
                    value={depositSlip}
                    onChange={(e) => setDepositSlip(e.target.value)}
                    className="appearance-none w-full bg-[#171c20] text-xs font-semibold text-white pl-4 pr-10 py-3 rounded-xl border border-[#988d9f]/10 outline-none"
                  >
                    <option value="Dollar USA">Dollar USA (USD Transfer)</option>
                    <option value="Euro EUR">Euro EUR (SEPA Debit)</option>
                    <option value="Stripe Secure">Stripe Secure (Credit Card)</option>
                    <option value="Coinbase Pay">Coinbase Wallet Connect</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-white/50 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-[#dfe3e9]/50 uppercase tracking-wider">Amount</label>
                <div className="relative">
                  <input 
                    type="number" 
                    step="50"
                    min="10"
                    className="glass-input w-full rounded-xl pl-8 pr-4 py-3 text-sm text-white font-mono"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    required
                  />
                  <DollarSign className="w-4 h-4 text-[#dfe3e9]/40 absolute left-3 top-3.5 pointer-events-none" />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#a855f7] hover:bg-[#b76dff] text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer border-none"
              >
                Confirm Deposit
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
