'use client';

import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  ChevronDown, 
  ArrowUpRight, 
  Percent, 
  CalendarDays, 
  Coins, 
  ArrowDownRight, 
  Info,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboard, CHART_DATA_PRESETS, ECONOMIC_EVENTS } from '../context/DashboardContext';

export const DiscoverView: React.FC = () => {
  const {
    activeTimeframe,
    setActiveTimeframe,
    setNotifications,
    balanceUSD,
    calcAsset,
    setCalcAsset,
    depositSlip,
    setDepositSlip,
    openingPrice,
    setOpeningPrice,
    stopLossPrice,
    setStopLossPrice,
    accountBalance,
    setAccountBalance,
    riskPercent,
    setRiskPercent,
    calcResult,
    markets,
    priceFlash,
    activeMapCity,
    setActiveMapCity,
    selectedMapTimezone,
    setSelectedMapTimezone
  } = useDashboard();

  // Component-specific local hover states for chart
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  // Preset Balance Chart Config
  const currentChartPreset = useMemo(() => {
    return CHART_DATA_PRESETS[activeTimeframe];
  }, [activeTimeframe]);

  // Custom Chart SVG points path builder
  const chartPathData = useMemo(() => {
    const values = currentChartPreset.values;
    const max = Math.max(...values) * 1.1;
    const min = Math.min(...values) * 0.9;
    const range = max - min;
    
    // SVGs dimensions
    const width = 600;
    const height = 180;
    const padding = 20;
    const readableWidth = width - padding * 2;
    const readableHeight = height - padding * 2;

    const points = values.map((val, idx) => {
      const x = padding + (idx / (values.length - 1)) * readableWidth;
      const y = padding + readableHeight - ((val - min) / range) * readableHeight;
      return { x, y };
    });

    // Build cubic bezier curve string
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const cpX1 = points[i].x + (points[i+1].x - points[i].x) / 3;
      const cpY1 = points[i].y;
      const cpX2 = points[i].x + 2 * (points[i+1].x - points[i].x) / 3;
      const cpY2 = points[i+1].y;
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${points[i+1].x} ${points[i+1].y}`;
    }

    const areaPath = `${path} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

    return {
      linePath: path,
      areaPath: areaPath,
      points: points
    };
  }, [currentChartPreset]);

  // Dynamic Tooltip and Crosshair Point Calculation
  const tooltipContent = useMemo(() => {
    const activeIdx = hoveredIndex !== null ? hoveredIndex : 4;
    const label = currentChartPreset.labels[activeIdx];
    const baseVal = currentChartPreset.values[activeIdx];
    
    // Smoothly scale values to give exact user-like numbers
    let displayValString = '';
    if (activeTimeframe === '6 Month') {
      const vals = ['$28,150.00', '$30,240.00', '$34,980.00', '$24,120.00', '$36,126.00', '$32,450.00'];
      displayValString = vals[activeIdx] || `$${(baseVal * 7.225).toFixed(2)}`;
    } else if (activeTimeframe === '1 Month') {
      const vals = ['$8,120.00', '$9,800.00', '$10,450.00', '$11,950.00', '$12,420.00', '$11,300.00'];
      displayValString = vals[activeIdx] || `$${(baseVal * 2.5).toFixed(2)}`;
    } else { // 1 Year
      const vals = ['$52,400.00', '$64,180.00', '$71,000.00', '$78,450.00', '$82,340.00', '$80,120.00'];
      displayValString = vals[activeIdx] || `$${(baseVal * 16.5).toFixed(2)}`;
    }

    return {
      value: displayValString,
      label: label,
    };
  }, [hoveredIndex, activeTimeframe, currentChartPreset]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT: BALANCE WIDGET (Spans 8 cols) --- */}
        <div id="balance-widget" className="lg:col-span-8 glass-panel rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden group hover:border-[#a855f7]/25 transition-all duration-500">
          
          {/* Visual Accent Glow on balance item hover */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-60" />

          <div className="flex items-center justify-between mb-4 z-10">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white tracking-wide">Balance</span>
            </div>
            
            {/* Action Filters and Dropdowns (Matches Header Row of chart widget) */}
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg bg-white/5 border border-[#988d9f]/10 text-[#dfe3e9]/65 hover:text-white transition-all hover:bg-white/10 cursor-pointer border-none outline-none">
                <SlidersHorizontal className="w-4 h-4" />
              </button>
              
              {/* Interactive Dropdown select */}
              <div className="relative">
                <select 
                  id="timeframe-select"
                  value={activeTimeframe} 
                  onChange={(e) => {
                    setActiveTimeframe(e.target.value as any);
                    setNotifications(p => [`Updated Chart time range to: ${e.target.value}`, ...p]);
                  }}
                  className="appearance-none bg-[#171c20] hover:bg-[#1b2024] text-xs font-semibold text-white pl-3.5 pr-8 py-2 rounded-lg border border-[#988d9f]/10 outline-none select-none cursor-pointer tracking-wider font-mono transition-colors"
                >
                  <option value="1 Month">1 Month</option>
                  <option value="6 Month">6 Month</option>
                  <option value="1 Year">1 Year</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-white/50 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Sub-Total Display with Profit pills */}
          <div className="flex items-baseline gap-3 mb-6 z-10 selection:bg-transparent">
            <span id="balance-total-value" className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-none">
              ${balanceUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            
            {/* Dynamic Trend Indicator */}
            <span className="bg-[#a855f7]/20 border border-[#a855f7]/30 text-[#a855f7] text-[11px] font-mono font-bold px-2.5 py-1 rounded-full animate-pulse">
              {currentChartPreset.percent}
            </span>
          </div>

          {/* --- CUSTOM GRAPH CANVAS --- */}
          <div id="chart-canvas-view" className="relative h-48 md:h-56 mt-4 flex items-end">
            
            {/* Grid Lines in background for premium layout styling */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
              <div className="border-b border-white/5 w-full h-0" />
              <div className="border-b border-white/5 w-full h-0" />
              <div className="border-b border-white/5 w-full h-0" />
              <div className="border-b border-white/5 w-full h-0" />
            </div>

            {/* SVG graph visualization */}
            <svg className="w-full h-full overflow-visible z-10" preserveAspectRatio="none">
              <defs>
                <linearGradient id="purpleAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
                  <stop offset="60%" stopColor="#a855f7" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                </linearGradient>
                <filter id="purpleGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Translucent area helper spline curve shadow */}
              <motion.path 
                key={`area-${activeTimeframe}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                d={chartPathData.areaPath} 
                fill="url(#purpleAreaGrad)" 
              />

              {/* Glowing Purple Active Core Spline Path Line */}
              <motion.path 
                key={`line-${activeTimeframe}`}
                initial={{ pathLength: 0, opacity: 0.5 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                d={chartPathData.linePath} 
                fill="none" 
                stroke="#a855f7" 
                strokeWidth="3.5" 
                strokeLinecap="round"
                filter="url(#purpleGlow)"
              />

              {/* Dynamic vertical crosshair line that snaps to closest active node */}
              {(() => {
                const activeIdx = hoveredIndex !== null ? hoveredIndex : 4;
                const activeNode = chartPathData.points[activeIdx];
                return (
                  <motion.line
                    animate={{
                      x1: activeNode.x,
                      x2: activeNode.x,
                    }}
                    transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                    y1={0}
                    y2={180}
                    stroke="#a855f7"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    opacity={0.65}
                    className="pointer-events-none"
                  />
                );
              })()}

              {/* Interactive Dots representing monthly nodes */}
              {chartPathData.points.map((pt, idx) => {
                const activeIdx = hoveredIndex !== null ? hoveredIndex : 4;
                const isTargetHigh = idx === activeIdx;
                return (
                  <g key={idx}>
                    <circle 
                      cx={pt.x} 
                      cy={pt.y} 
                      r={isTargetHigh ? "7" : "4.5"} 
                      className={`fill-[#a855f7] stroke-[#0f1418] stroke-2 transition-all duration-200 ${
                        isTargetHigh ? 'r-7 shadow-lg shadow-purple-950/50' : 'opacity-85'
                      }`}
                    />
                  </g>
                );
              })}

              {/* Glowing intersection focal dot that glides smoothly dynamically */}
              {(() => {
                const activeIdx = hoveredIndex !== null ? hoveredIndex : 4;
                const activeNode = chartPathData.points[activeIdx];
                return (
                  <g className="pointer-events-none">
                    <motion.circle
                      animate={{
                        cx: activeNode.x,
                        cy: activeNode.y,
                      }}
                      transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                      r="13"
                      className="fill-none stroke-[#a855f7]/55 stroke animate-pulse"
                    />
                    <motion.circle
                      animate={{
                        cx: activeNode.x,
                        cy: activeNode.y,
                      }}
                      transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                      r="5"
                      className="fill-[#00e5ff] stroke-[#0f1418] stroke-2"
                    />
                  </g>
                );
              })()}

              {/* Invisible high-precision touch/mouse cursor capture rect zone */}
              <rect
                width="600"
                height="180"
                fill="transparent"
                className="cursor-crosshair"
                onPointerMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const localX = (x / rect.width) * 600;
                  
                  let index = Math.round(((localX - 20) / 560) * (currentChartPreset.values.length - 1));
                  index = Math.max(0, Math.min(currentChartPreset.values.length - 1, index));
                  
                  setHoveredIndex(index);
                  setIsHovering(true);
                }}
                onPointerLeave={() => {
                  setHoveredIndex(null);
                  setIsHovering(false);
                }}
              />
            </svg>

            {/* Centered Floating Tooltip Box (Mirrors EXACTLY the visual tooltip: "upArrow $36,126.00 Total") */}
            {(() => {
              const activeIdx = hoveredIndex !== null ? hoveredIndex : 4;
              const activeNode = chartPathData.points[activeIdx];
              return (
                <motion.div 
                  className="absolute z-20 pointer-events-none select-none"
                  animate={{
                    left: `${(activeNode.x / 600) * 100}%`,
                    top: `${(activeNode.y / 180) * 100}%`,
                  }}
                  transition={{ type: 'spring', damping: 26, stiffness: 210 }}
                  style={{ transform: 'translate(-50%, -100%)', marginTop: '-14px' }}
                >
                  <div className="bg-[#1b2024]/95 backdrop-blur border border-purple-500/35 rounded-xl px-4 py-2.5 flex items-center gap-2.5 shadow-2xl relative min-w-[135px]">
                    <div className="w-5 h-5 rounded bg-[#a855f7]/15 flex items-center justify-center">
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#00e5ff] animate-bounce" />
                    </div>
                    <div className="flex flex-col">
                      <span id="floating-tooltip-value" className="text-white font-mono text-xs font-black tracking-tight select-none">
                        {tooltipContent.value}
                      </span>
                      <span className="text-[9px] text-[#00e5ff] uppercase font-mono tracking-wider font-semibold">
                        {tooltipContent.label} Total
                      </span>
                    </div>
                    {/* Soft physical indicator bottom-aligned caret anchor */}
                    <div className="w-2.5 h-2.5 bg-[#1b2024] border-r border-b border-purple-500/35 absolute rotate-45 bottom-[-5px] left-1/2 -translate-x-1/2" />
                  </div>
                </motion.div>
              );
            })()}
          </div>

          {/* X-axis indicators matching JetBrains Mono labels styling */}
          <div id="chart-x-axis" className="flex items-center justify-between mt-3 font-mono text-[11px] text-[#dfe3e9]/45 px-2 select-none border-t border-white/5 pt-3">
            {currentChartPreset.labels.map((lbl, idx) => (
              <span key={idx}>{lbl}</span>
            ))}
          </div>
        </div>

        {/* --- RIGHT: POSITION SIZE CALCULATOR (Spans 4 cols) --- */}
        <div id="calculator-widget" className="lg:col-span-4 glass-panel rounded-3xl p-6 md:p-7 flex flex-col border border-[#988d9f]/15 relative select-none">
          
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm font-semibold text-white tracking-wide">Position size calculator</span>
          </div>

          {/* Inputs responsive standard bento-grid (2x2) */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="flex flex-col">
              <label className="text-[10px] text-[#dfe3e9]/50 uppercase tracking-widest font-mono mb-1.5 pl-1">Funds</label>
              <input 
                type="text" 
                className="glass-input rounded-xl px-3.5 py-2.5 text-xs text-white font-mono uppercase font-semibold text-center bg-white/3" 
                value={calcAsset}
                onChange={(e) => setCalcAsset(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] text-[#dfe3e9]/50 uppercase tracking-widest font-mono mb-1.5 pl-1">Deposit Slip</label>
              <input 
                type="text" 
                className="glass-input rounded-xl px-3.5 py-2.5 text-xs text-white font-mono text-center bg-white/3" 
                value={depositSlip}
                onChange={(e) => setDepositSlip(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] text-[#dfe3e9]/50 uppercase tracking-widest font-mono mb-1.5 pl-1">Opening Price</label>
              <input 
                type="number" 
                step="0.00001"
                className="glass-input rounded-xl px-3.5 py-2.5 text-xs text-white font-mono text-center bg-white/3" 
                value={openingPrice}
                onChange={(e) => setOpeningPrice(parseFloat(e.target.value) || 0)}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] text-[#dfe3e9]/50 uppercase tracking-widest font-mono mb-1.5 pl-1">Stop loss price</label>
              <input 
                type="number" 
                step="0.00001"
                className="glass-input rounded-xl px-3.5 py-2.5 text-xs text-white font-mono text-center bg-white/3" 
                value={stopLossPrice}
                onChange={(e) => setStopLossPrice(parseFloat(e.target.value) || 0)}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] text-[#dfe3e9]/50 uppercase tracking-widest font-mono mb-1.5 pl-1">Account balance</label>
              <input 
                type="number" 
                className="glass-input rounded-xl px-3.5 py-2.5 text-xs text-white font-mono text-center bg-white/3" 
                value={accountBalance}
                onChange={(e) => setAccountBalance(parseFloat(e.target.value) || 0)}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] text-[#dfe3e9]/50 uppercase tracking-widest font-mono mb-1.5 pl-1">Risky %</label>
              <div className="relative">
                <input 
                  type="number" 
                  className="glass-input w-full rounded-xl pl-3.5 pr-8 py-2.5 text-xs text-white font-mono text-center bg-white/3" 
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(parseFloat(e.target.value) || 0)}
                />
                <Percent className="w-3.5 h-3.5 text-[#dfe3e9]/40 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Calculate Trigger Button (Solid glowing Purple) */}
          <button 
            className="w-full bg-[#a855f7] hover:bg-[#b76dff] active:scale-95 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-md shadow-purple-900/30 font-display select-none tracking-wide cursor-pointer text-center mb-5 border-none"
          >
            Calculate
          </button>

          {/* Response Grid results */}
          <div className="grid grid-cols-2 gap-4">
            {/* Result Box 1: Units (deal size) */}
            <div className="glass-panel-heavy rounded-2xl p-4 flex flex-col border border-white/5 relative group hover:border-[#a855f7]/20 transition-all duration-300">
              <span className="text-[10px] text-[#dfe3e9]/50 font-sans leading-tight mb-2 uppercase tracking-wide">
                Units (deal size)
              </span>
              <div className="flex flex-col mt-auto">
                <span id="calc-units-integer" className="text-xs font-mono font-medium text-[#dfe3e9]/50">
                  {calcResult.unitsInt}
                </span>
                <span id="calc-units-decimal" className="text-2xl font-mono font-bold text-white tracking-tight pt-0.5">
                  {calcResult.unitsFract}
                </span>
              </div>
            </div>

            {/* Result Box 2: Amount at risk */}
            <div className="glass-panel-heavy rounded-2xl p-4 flex flex-col border border-white/5 relative group hover:border-[#a855f7]/20 transition-all duration-300">
              <span className="text-[10px] text-[#dfe3e9]/50 font-sans leading-tight mb-2 uppercase tracking-wide">
                Amount at risk
              </span>
              <div className="flex flex-col mt-auto">
                <span id="calc-risk-top" className="text-xs font-mono font-medium text-[#dfe3e9]/50">
                  USD
                </span>
                <span id="calc-risk-value" className="text-2xl font-mono font-bold text-white tracking-tight pt-0.5">
                  {calcResult.amountAtRisk}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- BOTTOM ROW DUAL LAYOUT: EVENTS, MARKETS, MARKET HOURS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mt-8">
        
        {/* --- ECONOMIC EVENTS WIDGET (Spans 4/12) --- */}
        <div id="economic-events-card" className="lg:col-span-4 glass-panel rounded-3xl p-6 relative flex flex-col hover:border-[#a855f7]/15 transition-all">
          <div className="flex items-center justify-between mb-5 select-none">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white tracking-wide">Economic Events</span>
              <span className="text-[11px] text-[#dfe3e9]/40 mt-0.5 font-mono">Friday, June 20</span>
            </div>
            
            {/* Calendar details trigger */}
            <button className="p-2 rounded-lg bg-white/5 text-[#dfe3e9]/50 hover:text-white transition-all hover:bg-white/10 cursor-pointer border-none outline-none">
              <CalendarDays className="w-4 h-4" />
            </button>
          </div>

          {/* Event list container */}
          <div className="flex flex-col gap-4 overflow-y-auto max-h-72 pr-1.5 custom-scrollbar">
            {ECONOMIC_EVENTS.map((evt, idx) => (
              <div 
                key={idx} 
                className="bg-white/2 border border-white/5 rounded-xl p-3.5 flex items-center justify-between gap-3 hover:bg-white/5 transition-all duration-300"
              >
                {/* Left: time and region flag */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#a855f7] font-bold">{evt.time}</span>
                  <div className="text-base select-none" title={evt.country}>
                    {evt.flag}
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white tracking-wide">{evt.title}</span>
                    <span className="text-[9px] text-[#dfe3e9]/40 uppercase font-mono">{evt.country}</span>
                  </div>
                </div>

                {/* Right: stats and indicator bar */}
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end gap-0.5 text-[11px] font-mono leading-none">
                    <span className="text-[#dfe3e9]/45">F: <strong className="text-white">{evt.forecast}</strong></span>
                    <span className="text-[#dfe3e9]/45 mt-1">P: <strong className="text-[#dfe3e9]/75">{evt.previous}</strong></span>
                  </div>
                  
                  {/* High-Impact neon bar design indicator */}
                  <div className="flex flex-col h-6 w-1 gap-0.5">
                    <div className={`w-1 h-2 rounded-t ${evt.impact === 'high' ? 'bg-[#a855f7]' : 'bg-[#988d9f]/20'}`} />
                    <div className={`w-1 h-2 ${evt.impact === 'high' || evt.impact === 'medium' ? 'bg-[#a855f7]' : 'bg-[#988d9f]/20'}`} />
                    <div className="w-1 h-2 rounded-b bg-[#a855f7]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- MARKETS TICKERS WIDGET (Spans 4/12) --- */}
        <div id="markets-widget-card" className="lg:col-span-4 glass-panel rounded-3xl p-6 relative flex flex-col hover:border-[#a855f7]/15 transition-all">
          <div className="flex items-center justify-between mb-5">
            <span className="text-sm font-semibold text-white tracking-wide">Markets</span>
            <div className="p-2 rounded-lg bg-white/5 text-[#dfe3e9]/50 hover:text-white transition-all">
              <Coins className="w-4 h-4" />
            </div>
          </div>

          <div className="flex flex-col gap-3.5 overflow-y-auto max-h-72 pr-1.5">
            {markets.map((m) => {
              const isDown = m.change < 0;
              const flash = priceFlash[m.symbol];

              return (
                <div 
                  key={m.symbol}
                  className={`border rounded-xl p-3.5 flex items-center justify-between gap-2 transition-all duration-300 ${
                    flash === 'up' 
                      ? 'bg-[#00e5ff]/5 border-[#00e5ff]/30' 
                      : flash === 'down' 
                        ? 'bg-[#ffb4ab]/5 border-[#ffb4ab]/30' 
                        : 'bg-white/2 border-white/5 hover:bg-white/5'
                  }`}
                >
                  {/* Avatar identifier */}
                  <div className="flex items-center gap-3">
                    <div className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center text-xs font-bold leading-none select-none text-white ${
                      m.symbol.includes('BTC') 
                        ? 'bg-[#f7931a]/15 text-[#f7931a]' 
                        : m.symbol.includes('ETH') 
                          ? 'bg-[#627eea]/15 text-[#627eea]' 
                          : 'bg-[#a855f7]/15 text-[#a855f7]'
                    }`}>
                      {m.logoChar}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-white tracking-wide">{m.symbol}</span>
                      <span className="text-[9px] text-[#dfe3e9]/40 leading-none truncate max-w-[90px]">{m.name}</span>
                    </div>
                  </div>

                  {/* Sparkline Visual Graphic built purely in SVG */}
                  <div className="w-16 h-8 opacity-60 hover:opacity-100 transition-opacity">
                    <svg className="w-full h-full" viewBox="0 0 100 40">
                      <path 
                        d={`M 10 ${20 + Math.sin(1) * 10} L 30 ${20 + Math.sin(2) * 5} L 50 ${20 - Math.sin(3) * 12} L 70 ${20 + Math.sin(4) * 8} L 90 ${20 - (isDown ? -8 : 10)}`} 
                        fill="none" 
                        stroke={isDown ? "#ffb4ab" : "#00e5ff"} 
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>

                  {/* Value and real-time updating delta indicator */}
                  <div className="flex flex-col items-end">
                    <span className="font-mono text-xs font-bold text-white">
                      {m.price.toLocaleString(undefined, { minimumFractionDigits: m.type === 'crypto' ? 2 : 5 })}
                    </span>
                    <span className={`font-mono text-[10px] uppercase font-semibold mt-0.5 leading-none flex items-center ${
                      isDown ? 'text-[#ffb4ab]' : 'text-[#00e5ff]'
                    }`}>
                      {isDown ? <ArrowDownRight className="w-3 h-3 mr-0.5" /> : <ArrowUpRight className="w-3 h-3 mr-0.5" />}
                      {m.changePercent > 0 ? '+' : ''}{m.changePercent}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- MARKET HOURS WORLD MATRIX (Spans 4/12) --- */}
        <div id="market-hours-widget-card" className="lg:col-span-4 glass-panel rounded-3xl p-6 relative flex flex-col hover:border-[#a855f7]/15 transition-all select-none">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-white tracking-wide">Market hours</span>
              <Info className="w-3.5 h-3.5 text-[#dfe3e9]/40" />
            </div>
            {/* Map Config Indicator */}
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 rounded-lg p-1 text-[10px] font-mono text-white/50 animate-fade-in">
              <button 
                onClick={() => setSelectedMapTimezone('LOCAL')}
                className={`px-1.5 py-0.5 rounded transition cursor-pointer border-none ${selectedMapTimezone === 'LOCAL' ? 'bg-[#a855f7] text-white font-bold' : 'hover:text-white'}`}
              >
                Local
              </button>
              <button 
                onClick={() => setSelectedMapTimezone('UTC')}
                className={`px-1.5 py-0.5 rounded transition cursor-pointer border-none ${selectedMapTimezone === 'UTC' ? 'bg-[#a855f7] text-white font-bold' : 'hover:text-white'}`}
              >
                UTC
              </button>
            </div>
          </div>

          {/* Styled dot-matrix & vector world map container */}
          <div className="relative h-44 w-full rounded-2xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#171a2e] via-[#0a0c16] to-[#040508] mt-1 mb-4 overflow-hidden flex items-center justify-center border border-white/5 shadow-[inset_0_0_20px_rgba(168,85,247,0.1)]">
            
            {/* World Silhouette Image Map */}
            <img 
              src="/world-map.png" 
              alt="World Clock Map" 
              className="absolute inset-0 w-full h-full object-cover opacity-85 pointer-events-none select-none" 
            />

            {/* Glowing Coordinate / Connecting Laser Overlays */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none select-none z-10" viewBox="0 0 320 180">
              <defs>
                <linearGradient id="neonGlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#bf5af2" stopOpacity="0.95" />
                  <stop offset="35%" stopColor="#a855f7" stopOpacity="0.85" />
                  <stop offset="70%" stopColor="#5e5ce6" stopOpacity="0.80" />
                  <stop offset="100%" stopColor="#0a84ff" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              {/* Laser Connecting Streams */}
              <path d="M 68,48 Q 110,34 152,35" fill="none" stroke="#bf5af2" strokeWidth="0.75" strokeDasharray="1.5 1.5" className="opacity-45" />
              <path d="M 152,35 Q 215,28 282,38" fill="none" stroke="#5e5ce6" strokeWidth="0.75" strokeDasharray="1.5 1.5" className="opacity-45" />

              {/* Live Glowing City Pointer Nodes */}
              {(() => {
                const points = {
                  'New York': { x: 68, y: 48 },
                  'London': { x: 152, y: 35 },
                  'Tokyo': { x: 282, y: 38 },
                };
                const activePt = points[activeMapCity as keyof typeof points] || points['New York'];
                return (
                  <g>
                    {/* Pulsing ring */}
                    <circle cx={activePt.x} cy={activePt.y} r="14" fill="none" stroke="#bf5af2" strokeWidth="0.75" strokeDasharray="1 2" className="opacity-60 animate-spin" style={{ animationDuration: '20s' }} />
                    <circle cx={activePt.x} cy={activePt.y} r="6" fill="none" stroke="#0a84ff" strokeWidth="0.75" className="opacity-50 animate-ping" />
                  </g>
                );
              })()}
            </svg>

            {/* Micro-coordinate label overlay */}
            {[
              { label: 'New York', flag: '🇺🇸', x: '21.5%', y: '25%', ref: 'New York', color: '#bf5af2' },
              { label: 'London', flag: '🇬🇧', x: '47.5%', y: '18%', ref: 'London', color: '#5e5ce6' },
              { label: 'Tokyo', flag: '🇯🇵', x: '88%', y: '21%', ref: 'Tokyo', color: '#0a84ff' }
            ].map((node) => {
              const isActive = activeMapCity === node.ref;
              return (
                <div 
                  key={node.ref}
                  onClick={() => {
                    setActiveMapCity(node.ref as any);
                    setNotifications(prev => [`Focused on ${node.label} Market Hours`, ...prev]);
                  }}
                  style={{ left: node.x, top: node.y }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-20"
                >
                  <div className={`w-3 h-3 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive ? 'bg-[#131525] border border-white/25 shadow-lg shadow-black' : 'hover:scale-110'
                  }`}>
                    <div 
                      style={{ backgroundColor: node.color }}
                      className={`w-1 h-1 rounded-full transition-all duration-350 ${
                        isActive ? 'scale-125' : 'opacity-40 group-hover:opacity-90'
                      }`} 
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Highly Polished Borderless Triple Clock Tab row directly underneath the map matching the crop */}
          <div className="grid grid-cols-3 gap-0.5 text-center mt-auto w-full select-none pt-4 border-t border-white/5">
            {/* New York Button */}
            <button 
              onClick={() => {
                setActiveMapCity('New York');
                setNotifications(p => [`Selected New York session`, ...p]);
              }}
              className="flex flex-col items-center justify-center transition-all duration-300 group cursor-pointer focus:outline-none bg-transparent hover:bg-white/1 rounded-xl py-2 border-none outline-none"
            >
              <div className="relative mb-2 flex items-center justify-center h-8">
                <Sun 
                  strokeWidth={1.8}
                  className={`w-[26px] h-[26px] transition-all duration-300 ${
                    activeMapCity === 'New York' 
                      ? 'text-[#bf5af2] drop-shadow-[0_0_10px_rgba(191,90,242,0.85)] scale-110' 
                      : 'text-[#bf5af2]/40 group-hover:text-[#bf5af2]/70 group-hover:scale-105'
                  }`} 
                />
              </div>
              <span className={`text-[12px] transition-all duration-300 ${
                activeMapCity === 'New York' 
                  ? 'text-white font-bold font-sans tracking-wide py-0.5' 
                  : 'text-[#dfe3e9]/45 font-medium font-sans group-hover:text-[#dfe3e9]/70 py-0.5'
              }`}>
                New York
              </span>
            </button>

            {/* London Button */}
            <button 
              onClick={() => {
                setActiveMapCity('London');
                setNotifications(p => [`Selected London session`, ...p]);
              }}
              className="flex flex-col items-center justify-center transition-all duration-300 group cursor-pointer focus:outline-none bg-transparent hover:bg-white/1 rounded-xl py-2 border-none outline-none"
            >
              <div className="relative mb-2 flex items-center justify-center h-8">
                <Moon 
                  strokeWidth={1.8}
                  className={`w-[24px] h-[24px] transition-all duration-300 ${
                    activeMapCity === 'London' 
                      ? 'text-[#a855f7] drop-shadow-[0_0_10px_rgba(168,85,247,0.85)] scale-110' 
                      : 'text-[#706b8f]/50 group-hover:text-[#706b8f]/80 group-hover:scale-105'
                  }`} 
                />
              </div>
              <span className={`text-[12px] transition-all duration-300 ${
                activeMapCity === 'London' 
                  ? 'text-white font-bold font-sans tracking-wide py-0.5' 
                  : 'text-[#dfe3e9]/45 font-medium font-sans group-hover:text-[#dfe3e9]/70 py-0.5'
              }`}>
                London
              </span>
            </button>

            {/* Tokyo Button */}
            <button 
              onClick={() => {
                setActiveMapCity('Tokyo');
                setNotifications(p => [`Selected Tokyo session`, ...p]);
              }}
              className="flex flex-col items-center justify-center transition-all duration-300 group cursor-pointer focus:outline-none bg-transparent hover:bg-white/1 rounded-xl py-2 border-none outline-none"
            >
              <div className="relative mb-2 flex items-center justify-center h-8">
                <Moon 
                  strokeWidth={1.8}
                  className={`w-[24px] h-[24px] transition-all duration-300 ${
                    activeMapCity === 'Tokyo' 
                      ? 'text-[#a855f7] drop-shadow-[0_0_10px_rgba(168,85,247,0.85)] scale-110' 
                      : 'text-[#706b8f]/50 group-hover:text-[#706b8f]/80 group-hover:scale-105'
                  }`} 
                />
              </div>
              <span className={`text-[12px] transition-all duration-300 ${
                activeMapCity === 'Tokyo' 
                  ? 'text-white font-bold font-sans tracking-wide py-0.5' 
                  : 'text-[#dfe3e9]/45 font-medium font-sans group-hover:text-[#dfe3e9]/70 py-0.5'
              }`}>
                Tokyo
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
