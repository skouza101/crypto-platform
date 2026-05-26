'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabase';

// --- DATA DEFINITIONS AND SIMULATION CONSTANTS ---

export interface MarketAsset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  logoChar: string;
  type: 'crypto' | 'fiat';
  sparkline: number[];
}

export interface EconomicEvent {
  time: string;
  country: string;
  flag: string;
  title: string;
  forecast: string;
  previous: string;
  impact: 'high' | 'medium' | 'low';
}

export interface AssetBalance {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  valueUSD: number;
  priceUSD: number;
  change24h: number;
  type: string;
}

export interface ApiKey {
  id: string;
  name: string;
  keyHex: string;
  created: string;
  status: string;
}

interface ProfileRow {
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  fiat_balance: number | null;
  trading_balance: number | null;
}

interface UserAssetRow {
  id: string;
  name: string;
  symbol: string;
  balance: number | null;
  value_usd: number | null;
  price_usd: number | null;
  change_24h: number | null;
  type: string;
}

const INITIAL_MARKETS: MarketAsset[] = [
  { symbol: 'BTC/USDT', name: 'Bitcoin', price: 104312.73, change: -557.34, changePercent: -0.53, logoChar: 'B', type: 'crypto', sparkline: [105000, 104800, 104100, 104600, 104312] },
  { symbol: 'ETH/USDT', name: 'Ethereum', price: 2509.44, change: -15.23, changePercent: -0.60, logoChar: 'E', type: 'crypto', sparkline: [2540, 2530, 2490, 2515, 2509.44] },
  { symbol: 'GBP/USD', name: 'British Pound / US Dollar', price: 1.34654, change: 0.00444, changePercent: 0.33, logoChar: '£', type: 'fiat', sparkline: [1.341, 1.342, 1.345, 1.343, 1.34654] },
  { symbol: 'CAD/USD', name: 'Canadian Dollar / US Dollar', price: 0.72966, change: -0.0012, changePercent: -0.16, logoChar: 'C', type: 'fiat', sparkline: [0.731, 0.730, 0.728, 0.730, 0.72966] },
];

const DEFAULT_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzs3_e15iV11BeB_VM3YFqTB398gpK8vTfnzTNKbZfIydZEfZGJJNDYZs-vOv_FuKptHhreR8oGSaX4qyujssbh7xJ93AxzCa5L08hZdiE45jhuxbzXr8UQVuRSeK787DwqDncse5A2_WdkEgHno2sdwgM1fj55z3C_pp2c59sJ-jALKXNXxzV3hCkKZ4-e8kHmYeksTZRSy2twJiq8saojRMWnQV7C2hj2eYu4I9HAB70JA_pe0QnXxWM62aLX98B9JiaVTVQvUrK';
const DEFAULT_FIAT_BALANCE = 2000.00;
const DEFAULT_TRADING_BALANCE = 2999.95;

const INITIAL_ASSETS: AssetBalance[] = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', balance: 0.14502, valueUSD: 9850.25, priceUSD: 67923.10, change24h: 2.4, type: 'crypto' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', balance: 4.200, valueUSD: 14500.80, priceUSD: 3452.10, change24h: -1.2, type: 'crypto' },
  { id: 'sol', name: 'Solana', symbol: 'SOL', balance: 145.50, valueUSD: 2050.40, priceUSD: 14.09, change24h: 8.7, type: 'crypto' },
  { id: 'usd', name: 'US Dollar', symbol: 'USD', balance: 540.00, valueUSD: 540.00, priceUSD: 1.00, change24h: 0.0, type: 'fiat' }
];

export const ECONOMIC_EVENTS: EconomicEvent[] = [
  { time: '00:00', country: 'USA', flag: '🇺🇸', title: 'PPI MoM', forecast: '-0.4%', previous: '-0.2%', impact: 'high' },
  { time: '02:01', country: 'EUR', flag: '🇪🇺', title: 'PPI YoY', forecast: '-0.3%', previous: '-0.8%', impact: 'medium' },
  { time: '02:30', country: 'GB', flag: '🇬🇧', title: 'PPI MoM', forecast: '-0.2%', previous: '-0.6%', impact: 'high' },
  { time: '08:00', country: 'USD', flag: '🇺🇸', title: 'Core Retail Sales MoM', forecast: '0.2%', previous: '0.1%', impact: 'high' },
  { time: '14:30', country: 'CAD', flag: '🇨🇦', title: 'Manufacturing Sales MoM', forecast: '-0.5%', previous: '0.4%', impact: 'medium' }
];

export const CHART_DATA_PRESETS = {
  '1 Month': {
    labels: ['May 01', 'May 06', 'May 11', 'May 16', 'May 21', 'May 26'],
    values: [4500, 4320, 4850, 4610, 4999.95, 4750],
    hoverDesc: '↑ $12,420.00 Total Profit',
    percent: '↑ 11.1%',
    total: 4999.95
  },
  '6 Month': {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [4120, 4280, 4980, 3612, 4999.95, 4680],
    hoverDesc: '↑ $36,126.00 Total',
    percent: '↑ 20%',
    total: 4999.95
  },
  '1 Year': {
    labels: ['Q1 25', 'Q2 25', 'Q3 25', 'Q4 25', 'Q1 26', 'Q2 26'],
    values: [3200, 3800, 4100, 4650, 4999.95, 4910],
    hoverDesc: '↑ $82,340.00 Total Profit',
    percent: '↑ 56.2%',
    total: 4999.95
  }
};

interface DashboardContextType {
  session: Session | null;
  user: User | null;
  authLoading: boolean;
  signOut: () => Promise<void>;
  activeTab: 'Discover' | 'Assets' | 'Funds' | 'Economic Calendar' | 'Settings';
  setActiveTab: (tab: 'Discover' | 'Assets' | 'Funds' | 'Economic Calendar' | 'Settings') => void;
  assetFilter: 'All' | 'Crypto' | 'Fiat';
  setAssetFilter: (filter: 'All' | 'Crypto' | 'Fiat') => void;
  assets: AssetBalance[];
  setAssets: React.Dispatch<React.SetStateAction<AssetBalance[]>>;
  activeTimeframe: '1 Month' | '6 Month' | '1 Year';
  setActiveTimeframe: (timeframe: '1 Month' | '6 Month' | '1 Year') => void;
  activeMapCity: 'New York' | 'London' | 'Tokyo' | 'Sydney' | 'Frankfurt';
  setActiveMapCity: (city: 'New York' | 'London' | 'Tokyo' | 'Sydney' | 'Frankfurt') => void;
  selectedMapTimezone: 'UTC' | 'LOCAL';
  setSelectedMapTimezone: (tz: 'UTC' | 'LOCAL') => void;
  notifications: string[];
  setNotifications: React.Dispatch<React.SetStateAction<string[]>>;
  notificationOpen: boolean;
  setNotificationOpen: (open: boolean) => void;
  showDepositModal: boolean;
  setShowDepositModal: (show: boolean) => void;
  depositAmount: string;
  setDepositAmount: (amount: string) => void;
  balanceUSD: number;
  setBalanceUSD: React.Dispatch<React.SetStateAction<number>>;
  fiatBalance: number;
  setFiatBalance: React.Dispatch<React.SetStateAction<number>>;
  tradingBalance: number;
  setTradingBalance: React.Dispatch<React.SetStateAction<number>>;
  fundsTabAction: 'Deposit' | 'Withdraw';
  setFundsTabAction: (action: 'Deposit' | 'Withdraw') => void;
  selectedFundsAsset: 'USDT' | 'BTC' | 'ETH' | 'SOL';
  setSelectedFundsAsset: (asset: 'USDT' | 'BTC' | 'ETH' | 'SOL') => void;
  selectedFundsNetwork: 'TRC20' | 'ERC20' | 'BEP20';
  setSelectedFundsNetwork: (net: 'TRC20' | 'ERC20' | 'BEP20') => void;
  withdrawalAddress: string;
  setWithdrawalAddress: (addr: string) => void;
  withdrawalAmount: string;
  setWithdrawalAmount: (amount: string) => void;
  settingsSubTab: 'profile' | 'security' | 'notifications' | 'api';
  setSettingsSubTab: (tab: 'profile' | 'security' | 'notifications' | 'api') => void;
  profileFirstName: string;
  setProfileFirstName: (name: string) => void;
  profileLastName: string;
  setProfileLastName: (name: string) => void;
  profileEmail: string;
  setProfileEmail: (email: string) => void;
  profileAvatar: string;
  setProfileAvatar: (avatar: string) => void;
  currentPassword: string;
  setCurrentPassword: (p: string) => void;
  newPassword: string;
  setNewPassword: (p: string) => void;
  confirmPassword: string;
  setConfirmPassword: (p: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  twoFactorEnabled: boolean;
  setTwoFactorEnabled: (enabled: boolean) => void;
  notifyTradingAlerts: boolean;
  setNotifyTradingAlerts: (enabled: boolean) => void;
  notifyAccountStatus: boolean;
  setNotifyAccountStatus: (enabled: boolean) => void;
  notifyNewsletter: boolean;
  setNotifyNewsletter: (enabled: boolean) => void;
  notifySoundEffects: boolean;
  setNotifySoundEffects: (enabled: boolean) => void;
  apiKeys: ApiKey[];
  setApiKeys: React.Dispatch<React.SetStateAction<ApiKey[]>>;
  newKeyName: string;
  setNewKeyName: (name: string) => void;
  calcAsset: string;
  setCalcAsset: (asset: string) => void;
  depositSlip: string;
  setDepositSlip: (slip: string) => void;
  openingPrice: number;
  setOpeningPrice: (price: number) => void;
  stopLossPrice: number;
  setStopLossPrice: (price: number) => void;
  accountBalance: number;
  setAccountBalance: (bal: number) => void;
  riskPercent: number;
  setRiskPercent: (pct: number) => void;
  calcResult: {
    units: string;
    amountAtRisk: string;
    unitsInt: string;
    unitsFract: string;
  };
  markets: MarketAsset[];
  setMarkets: React.Dispatch<React.SetStateAction<MarketAsset[]>>;
  priceFlash: { [key: string]: 'up' | 'down' | null };
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const activeUserIdRef = useRef<string | null>(null);
  const [activeTab, setActiveTab] = useState<'Discover' | 'Assets' | 'Funds' | 'Economic Calendar' | 'Settings'>('Discover');
  const [assetFilter, setAssetFilter] = useState<'All' | 'Crypto' | 'Fiat'>('All');
  const [assets, setAssetsState] = useState<AssetBalance[]>(INITIAL_ASSETS);
  const [activeTimeframe, setActiveTimeframe] = useState<'1 Month' | '6 Month' | '1 Year'>('6 Month');
  const [activeMapCity, setActiveMapCity] = useState<'New York' | 'London' | 'Tokyo' | 'Sydney' | 'Frankfurt'>('London');
  const [selectedMapTimezone, setSelectedMapTimezone] = useState<'UTC' | 'LOCAL'>('LOCAL');
  const [notifications, setNotifications] = useState<string[]>([
    'Welcome back! Your balance is up 20% over the last 6 months.',
    'BTC/USDT updated stop loss suggestion triggers near $102,800 USD.',
    'PPI News Alert: High volatility forecasts on USA PPI release later today.'
  ]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('1000.00');
  const [balanceUSD, setBalanceUSDState] = useState(DEFAULT_FIAT_BALANCE + DEFAULT_TRADING_BALANCE);
  const [fiatBalance, setFiatBalanceState] = useState(DEFAULT_FIAT_BALANCE);
  const [tradingBalance, setTradingBalanceState] = useState(DEFAULT_TRADING_BALANCE);

  // --- FUNDS VIEW CUSTOM STATES ---
  const [fundsTabAction, setFundsTabAction] = useState<'Deposit' | 'Withdraw'>('Deposit');
  const [selectedFundsAsset, setSelectedFundsAsset] = useState<'USDT' | 'BTC' | 'ETH' | 'SOL'>('USDT');
  const [selectedFundsNetwork, setSelectedFundsNetwork] = useState<'TRC20' | 'ERC20' | 'BEP20'>('TRC20');
  const [withdrawalAddress, setWithdrawalAddress] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');

  // --- SETTINGS VIEW CUSTOM STATES ---
  const [settingsSubTab, setSettingsSubTab] = useState<'profile' | 'security' | 'notifications' | 'api'>('profile');
  const [profileFirstName, setProfileFirstNameState] = useState('Alex');
  const [profileLastName, setProfileLastNameState] = useState('Chen');
  const [profileEmail, setProfileEmail] = useState('alex.chen@example.com');
  const [profileAvatar, setProfileAvatarState] = useState(DEFAULT_AVATAR);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const [notifyTradingAlerts, setNotifyTradingAlerts] = useState(true);
  const [notifyAccountStatus, setNotifyAccountStatus] = useState(true);
  const [notifyNewsletter, setNotifyNewsletter] = useState(false);
  const [notifySoundEffects, setNotifySoundEffects] = useState(true);

  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { id: '1', name: 'Master Core Read-Only', keyHex: 'lb_live_9a2f6de7...82f1', created: '2025-11-20', status: 'Active' },
    { id: '2', name: 'Trading API Assistant', keyHex: 'lb_live_cf18ad20...112e', created: '2026-03-12', status: 'Active' }
  ]);
  const [newKeyName, setNewKeyName] = useState('');

  // --- POSITION SIZE CALCULATOR STATES ---
  const [calcAsset, setCalcAsset] = useState('XAG/USD');
  const [depositSlip, setDepositSlip] = useState('Dollar USA');
  const [openingPrice, setOpeningPrice] = useState<number>(36.31400);
  const [stopLossPrice, setStopLossPrice] = useState<number>(35.5877);
  const [accountBalance, setAccountBalance] = useState<number>(100000);
  const [riskPercent, setRiskPercent] = useState<number>(2);

  const [calcResult, setCalcResult] = useState({
    units: '2,753.68',
    amountAtRisk: '2,000.00',
    unitsInt: '2',
    unitsFract: '753,759',
  });

  // Live Crypto Prices
  const [markets, setMarkets] = useState<MarketAsset[]>(INITIAL_MARKETS);
  const [priceFlash, setPriceFlash] = useState<{ [key: string]: 'up' | 'down' | null }>({});

  const persistProfile = useCallback(async (patch: Partial<ProfileRow>) => {
    const userId = activeUserIdRef.current;
    if (!supabase || !userId) return;

    const { error } = await supabase
      .from('profiles')
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq('id', userId);

    if (error) {
      setNotifications(prev => [`Profile sync failed: ${error.message}`, ...prev]);
    }
  }, []);

  const persistAssets = useCallback(async (nextAssets: AssetBalance[]) => {
    const userId = activeUserIdRef.current;
    if (!supabase || !userId) return;

    const { error } = await supabase
      .from('user_assets')
      .upsert(
        nextAssets.map(asset => ({
          user_id: userId,
          symbol: asset.symbol,
          name: asset.name,
          balance: asset.balance,
          value_usd: asset.valueUSD,
          price_usd: asset.priceUSD,
          change_24h: asset.change24h,
          type: asset.type
        })),
        { onConflict: 'user_id,symbol' }
      );

    if (error) {
      setNotifications(prev => [`Asset sync failed: ${error.message}`, ...prev]);
    }
  }, []);

  const setFiatBalance: React.Dispatch<React.SetStateAction<number>> = useCallback((value) => {
    setFiatBalanceState(prev => {
      const next = typeof value === 'function' ? value(prev) : value;
      setBalanceUSDState(total => total - prev + next);
      void persistProfile({ fiat_balance: next });
      return next;
    });
  }, [persistProfile]);

  const setTradingBalance: React.Dispatch<React.SetStateAction<number>> = useCallback((value) => {
    setTradingBalanceState(prev => {
      const next = typeof value === 'function' ? value(prev) : value;
      setBalanceUSDState(total => total - prev + next);
      void persistProfile({ trading_balance: next });
      return next;
    });
  }, [persistProfile]);

  const setBalanceUSD: React.Dispatch<React.SetStateAction<number>> = useCallback((value) => {
    setBalanceUSDState(prev => typeof value === 'function' ? value(prev) : value);
  }, []);

  const setAssets: React.Dispatch<React.SetStateAction<AssetBalance[]>> = useCallback((value) => {
    setAssetsState(prev => {
      const next = typeof value === 'function' ? value(prev) : value;
      void persistAssets(next);
      return next;
    });
  }, [persistAssets]);

  const setProfileFirstName = useCallback((name: string) => {
    setProfileFirstNameState(name);
    void persistProfile({ first_name: name });
  }, [persistProfile]);

  const setProfileLastName = useCallback((name: string) => {
    setProfileLastNameState(name);
    void persistProfile({ last_name: name });
  }, [persistProfile]);

  const setProfileAvatar = useCallback((avatar: string) => {
    setProfileAvatarState(avatar);
    void persistProfile({ avatar_url: avatar });
  }, [persistProfile]);

  const seedUserData = useCallback(async (authUser: User) => {
    if (!supabase) return;

    const firstName = typeof authUser.user_metadata?.first_name === 'string' ? authUser.user_metadata.first_name : 'Alex';
    const lastName = typeof authUser.user_metadata?.last_name === 'string' ? authUser.user_metadata.last_name : 'Chen';

    const { data: existingProfile, error: profileReadError } = await supabase
      .from('profiles')
      .select('first_name,last_name,avatar_url,fiat_balance,trading_balance')
      .eq('id', authUser.id)
      .maybeSingle<ProfileRow>();

    if (profileReadError) {
      setNotifications(prev => [`Profile load failed: ${profileReadError.message}`, ...prev]);
      return;
    }

    let profile = existingProfile;
    if (!profile) {
      const { data: insertedProfile, error: insertProfileError } = await supabase
        .from('profiles')
        .insert({
          id: authUser.id,
          first_name: firstName,
          last_name: lastName,
          avatar_url: DEFAULT_AVATAR,
          fiat_balance: DEFAULT_FIAT_BALANCE,
          trading_balance: DEFAULT_TRADING_BALANCE
        })
        .select('first_name,last_name,avatar_url,fiat_balance,trading_balance')
        .single<ProfileRow>();

      if (insertProfileError) {
        setNotifications(prev => [`Profile seed failed: ${insertProfileError.message}`, ...prev]);
        return;
      }
      profile = insertedProfile;
    }

    setProfileFirstNameState(profile.first_name || firstName);
    setProfileLastNameState(profile.last_name || lastName);
    setProfileEmail(authUser.email || '');
    setProfileAvatarState(profile.avatar_url || DEFAULT_AVATAR);
    setFiatBalanceState(profile.fiat_balance ?? DEFAULT_FIAT_BALANCE);
    setTradingBalanceState(profile.trading_balance ?? DEFAULT_TRADING_BALANCE);
    setBalanceUSDState((profile.fiat_balance ?? DEFAULT_FIAT_BALANCE) + (profile.trading_balance ?? DEFAULT_TRADING_BALANCE));

    const { data: assetRows, error: assetsError } = await supabase
      .from('user_assets')
      .select('id,name,symbol,balance,value_usd,price_usd,change_24h,type')
      .eq('user_id', authUser.id)
      .order('symbol')
      .returns<UserAssetRow[]>();

    if (assetsError) {
      setNotifications(prev => [`Asset load failed: ${assetsError.message}`, ...prev]);
      return;
    }

    if (!assetRows || assetRows.length === 0) {
      await persistAssets(INITIAL_ASSETS);
      setAssetsState(INITIAL_ASSETS);
      return;
    }

    setAssetsState(assetRows.map(asset => ({
      id: asset.id,
      name: asset.name,
      symbol: asset.symbol,
      balance: asset.balance ?? 0,
      valueUSD: asset.value_usd ?? 0,
      priceUSD: asset.price_usd ?? 0,
      change24h: asset.change_24h ?? 0,
      type: asset.type
    })));
  }, [persistAssets]);

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return;
    }

    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      const nextSession = data.session;
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      activeUserIdRef.current = nextSession?.user.id ?? null;
      if (nextSession?.user) {
        void seedUserData(nextSession.user).finally(() => {
          if (mounted) setAuthLoading(false);
        });
      } else {
        setAuthLoading(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      activeUserIdRef.current = nextSession?.user.id ?? null;
      if (nextSession?.user) {
        void seedUserData(nextSession.user);
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [seedUserData]);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) {
      setNotifications(prev => [`Sign out failed: ${error.message}`, ...prev]);
    }
  }, []);

  // Simulation effect for market assets tickers
  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets(prev => {
        const updated = prev.map(m => {
          const isUp = Math.random() > 0.45;
          const pct = (Math.random() * 0.15 + 0.01) * (isUp ? 1 : -1);
          const priceDiff = m.price * (pct / 100);
          const newPrice = Math.max(0.0001, parseFloat((m.price + priceDiff).toFixed(m.type === 'crypto' ? 2 : 5)));
          
          setPriceFlash(curr => ({
            ...curr,
            [m.symbol]: isUp ? 'up' : 'down'
          }));

          setTimeout(() => {
            setPriceFlash(curr => ({
              ...curr,
              [m.symbol]: null
            }));
          }, 800);

          return {
            ...m,
            price: newPrice,
            change: parseFloat((m.change + priceDiff).toFixed(m.type === 'crypto' ? 2 : 5)),
            changePercent: parseFloat((m.changePercent + pct).toFixed(2))
          };
        });
        return updated;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Live Position Size Calculation
  const runCalculator = () => {
    const diff = Math.abs(openingPrice - stopLossPrice);
    const amountAtRiskVal = accountBalance * (riskPercent / 100);
    const calculatedUnitsVal = diff > 0 ? amountAtRiskVal / diff : 0;

    let unitsInt = '0';
    let unitsFract = '000,000';

    if (calculatedUnitsVal > 0) {
      const wholeStr = Math.floor(calculatedUnitsVal).toString();
      if (wholeStr.length > 3) {
        unitsInt = wholeStr.substring(0, wholeStr.length - 3);
        const thousandsPart = wholeStr.substring(wholeStr.length - 3);
        const decimalPart = (calculatedUnitsVal % 1).toFixed(3).substring(2);
        unitsFract = `${thousandsPart},${decimalPart}`;
      } else {
        unitsInt = '0';
        unitsFract = `${wholeStr},${(calculatedUnitsVal % 1).toFixed(3).substring(2)}`;
      }
    }

    setCalcResult({
      units: calculatedUnitsVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      amountAtRisk: amountAtRiskVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      unitsInt: calculatedUnitsVal >= 1000 ? Math.floor(calculatedUnitsVal / 1000).toString() : '0',
      unitsFract: calculatedUnitsVal >= 1000 
        ? Math.floor(calculatedUnitsVal % 1000).toLocaleString(undefined, { minimumIntegerDigits: 3 }) + ',' + Math.round((calculatedUnitsVal % 1) * 1000).toString().padStart(3, '0')
        : Math.floor(calculatedUnitsVal).toString() + ',' + Math.round((calculatedUnitsVal % 1) * 1000).toString().padStart(3, '0')
    });
  };

  // Run calculator when inputs change
  useEffect(() => {
    runCalculator();
  }, [openingPrice, stopLossPrice, accountBalance, riskPercent]);

  return (
    <DashboardContext.Provider value={{
      session, user, authLoading, signOut,
      activeTab, setActiveTab,
      assetFilter, setAssetFilter,
      assets, setAssets,
      activeTimeframe, setActiveTimeframe,
      activeMapCity, setActiveMapCity,
      selectedMapTimezone, setSelectedMapTimezone,
      notifications, setNotifications,
      notificationOpen, setNotificationOpen,
      showDepositModal, setShowDepositModal,
      depositAmount, setDepositAmount,
      balanceUSD, setBalanceUSD,
      fiatBalance, setFiatBalance,
      tradingBalance, setTradingBalance,
      fundsTabAction, setFundsTabAction,
      selectedFundsAsset, setSelectedFundsAsset,
      selectedFundsNetwork, setSelectedFundsNetwork,
      withdrawalAddress, setWithdrawalAddress,
      withdrawalAmount, setWithdrawalAmount,
      settingsSubTab, setSettingsSubTab,
      profileFirstName, setProfileFirstName,
      profileLastName, setProfileLastName,
      profileEmail, setProfileEmail,
      profileAvatar, setProfileAvatar,
      currentPassword, setCurrentPassword,
      newPassword, setNewPassword,
      confirmPassword, setConfirmPassword,
      showPassword, setShowPassword,
      twoFactorEnabled, setTwoFactorEnabled,
      notifyTradingAlerts, setNotifyTradingAlerts,
      notifyAccountStatus, setNotifyAccountStatus,
      notifyNewsletter, setNotifyNewsletter,
      notifySoundEffects, setNotifySoundEffects,
      apiKeys, setApiKeys,
      newKeyName, setNewKeyName,
      calcAsset, setCalcAsset,
      depositSlip, setDepositSlip,
      openingPrice, setOpeningPrice,
      stopLossPrice, setStopLossPrice,
      accountBalance, setAccountBalance,
      riskPercent, setRiskPercent,
      calcResult,
      markets, setMarkets,
      priceFlash
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
