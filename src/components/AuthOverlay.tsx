'use client';

import React, { useState } from 'react';
import { AlertCircle, ArrowRight, CheckCircle2, Lock, Mail, Sparkles, UserRound } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { isSupabaseConfigured, supabase } from '../context/supabase';

type AuthMode = 'signin' | 'signup';
type AlertState = { type: 'success' | 'error' | 'info'; message: string } | null;

export const AuthOverlay: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState<AlertState>(null);
  const [submitting, setSubmitting] = useState(false);

  const isSignup = mode === 'signup';

  const submitAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase) {
      setAlert({ type: 'error', message: 'Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable authentication.' });
      return;
    }

    setSubmitting(true);
    setAlert(null);

    const result = isSignup
      ? await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName.trim() || 'Alex',
              last_name: lastName.trim() || 'Chen'
            }
          }
        })
      : await supabase.auth.signInWithPassword({ email, password });

    setSubmitting(false);

    if (result.error) {
      setAlert({ type: 'error', message: result.error.message });
      return;
    }

    setAlert({
      type: 'success',
      message: isSignup
        ? 'Account created. Check your email if confirmation is enabled, otherwise your simulator is loading now.'
        : 'Signed in. Loading your persistent simulator.'
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#080b10] text-white relative flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(0,229,255,0.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.2),transparent_32%),radial-gradient(circle_at_50%_88%,rgba(247,147,26,0.12),transparent_30%)]" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <motion.section
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[460px] glass-panel-heavy rounded-2xl p-6 sm:p-8 shadow-2xl shadow-purple-950/30"
      >
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#a855f7] to-[#00e5ff] flex items-center justify-center shadow-lg shadow-purple-950/50">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display font-black uppercase tracking-wider text-lg leading-none">
                Little<span className="text-[#a855f7]">bee</span>
              </h1>
              <p className="text-[11px] text-[#dfe3e9]/45 font-mono mt-1">Persistent crypto simulator</p>
            </div>
          </div>
          <span className="hidden sm:inline-flex w-2.5 h-2.5 rounded-full bg-[#00e5ff] shadow-[0_0_16px_rgba(0,229,255,0.8)]" />
        </div>

        <div className="relative grid grid-cols-2 rounded-xl bg-white/5 p-1 border border-white/10 mb-6">
          <motion.div
            layout
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-[#a855f7]/25 border border-[#a855f7]/30 ${isSignup ? 'left-[calc(50%+0px)]' : 'left-1'}`}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          />
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`relative z-10 py-2.5 rounded-lg text-xs font-mono font-bold transition-colors ${!isSignup ? 'text-white' : 'text-[#dfe3e9]/45 hover:text-white'}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`relative z-10 py-2.5 rounded-lg text-xs font-mono font-bold transition-colors ${isSignup ? 'text-white' : 'text-[#dfe3e9]/45 hover:text-white'}`}
          >
            Create Account
          </button>
        </div>

        {!isSupabaseConfigured && (
          <div className="mb-5 rounded-xl border border-[#ffb4ab]/20 bg-[#ffb4ab]/10 p-3 text-xs text-[#ffd8d3] leading-relaxed">
            Supabase env vars are missing. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, then restart the dev server.
          </div>
        )}

        <form onSubmit={submitAuth} className="flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {isSignup && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-hidden"
              >
                <Field icon={<UserRound className="w-4 h-4" />} label="First Name" value={firstName} onChange={setFirstName} autoComplete="given-name" />
                <Field icon={<UserRound className="w-4 h-4" />} label="Last Name" value={lastName} onChange={setLastName} autoComplete="family-name" />
              </motion.div>
            )}
          </AnimatePresence>

          <Field icon={<Mail className="w-4 h-4" />} label="Email" value={email} onChange={setEmail} type="email" autoComplete="email" required />
          <Field icon={<Lock className="w-4 h-4" />} label="Password" value={password} onChange={setPassword} type="password" autoComplete={isSignup ? 'new-password' : 'current-password'} required />

          <AnimatePresence>
            {alert && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`flex gap-2 rounded-xl border p-3 text-xs leading-relaxed ${
                  alert.type === 'success'
                    ? 'border-[#00e5ff]/20 bg-[#00e5ff]/10 text-[#b9f8ff]'
                    : 'border-[#ffb4ab]/20 bg-[#ffb4ab]/10 text-[#ffd8d3]'
                }`}
              >
                {alert.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                <span>{alert.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={submitting || !isSupabaseConfigured}
            className="mt-2 w-full rounded-xl bg-[#a855f7] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-950/30 hover:bg-[#b76dff] disabled:cursor-not-allowed disabled:opacity-55 transition-all flex items-center justify-center gap-2"
          >
            {submitting ? 'Connecting...' : isSignup ? 'Create Account' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </motion.section>
    </main>
  );
};

interface FieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}

const Field: React.FC<FieldProps> = ({ icon, label, value, onChange, type = 'text', autoComplete, required }) => (
  <label className="flex flex-col gap-1.5">
    <span className="text-[10px] uppercase tracking-widest text-[#dfe3e9]/45 font-mono font-bold">{label}</span>
    <span className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#dfe3e9]/35">{icon}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        required={required}
        className="glass-input w-full rounded-xl py-3.5 pl-10 pr-4 text-sm font-semibold text-white placeholder:text-white/20"
      />
    </span>
  </label>
);
