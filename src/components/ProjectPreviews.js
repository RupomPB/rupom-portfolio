// src/components/ProjectPreviews.js
"use client";

import {
  TrendingUp,
  CreditCard,
  MapPin,
  CheckCircle2,
  ShoppingCart,
  Play,
  Star,
  Activity,
} from "lucide-react";

export function FinEasePreview() {
  const chartBars = [
    { month: "Jan", income: 75, expense: 45 },
    { month: "Feb", income: 85, expense: 50 },
    { month: "Mar", income: 68, expense: 40 },
    { month: "Apr", income: 92, expense: 58 },
    { month: "May", income: 80, expense: 48 },
    { month: "Jun", income: 98, expense: 52 },
  ];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#090e0b] shadow-2xl transition duration-500 group-hover:border-emerald-500/30">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-rose-500/80" />
          <span className="size-2.5 rounded-full bg-amber-500/80" />
          <span className="size-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-[10px] tracking-wider text-white/50">
            finease.app / dashboard
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LIVE SYNC
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Balance Card */}
        <div className="rounded-xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-white/[0.02] to-transparent p-4">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>Net Financial Balance</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              <TrendingUp size={12} /> +14.2% MoM
            </span>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            $24,850.40
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs border-t border-white/5 pt-3">
            <div>
              <span className="text-white/40 block text-[10px] uppercase font-mono">Total Income</span>
              <span className="text-emerald-400 font-semibold font-mono">+$5,240.00</span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] uppercase font-mono">Total Expenses</span>
              <span className="text-rose-400 font-semibold font-mono">-$2,759.60</span>
            </div>
          </div>
        </div>

        {/* Analytics Chart Mockup */}
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <div className="flex items-center justify-between text-[11px] mb-3 text-white/60">
            <span className="font-mono uppercase text-[10px]">Monthly Cashflow Analytics</span>
            <span className="text-[10px] text-emerald-400/80 font-mono">Recharts Engine</span>
          </div>
          <div className="flex items-end justify-between gap-2 h-20 px-2">
            {chartBars.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div className="w-full flex items-end justify-center gap-1 h-16">
                  <div
                    style={{ height: `${item.income}%` }}
                    className="w-2.5 rounded-t-sm bg-gradient-to-t from-emerald-600 to-emerald-400 transition-all duration-500"
                  />
                  <div
                    style={{ height: `${item.expense}%` }}
                    className="w-2.5 rounded-t-sm bg-gradient-to-t from-rose-600/70 to-rose-400/70 transition-all duration-500"
                  />
                </div>
                <span className="text-[9px] font-mono text-white/40">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="rounded-xl border border-white/5 bg-white/[0.015] p-3 space-y-2">
          <div className="text-[10px] font-mono uppercase text-white/40 mb-2">Recent Transactions</div>
          <div className="flex items-center justify-between text-xs py-1 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="size-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                +$
              </span>
              <div>
                <p className="text-white font-medium text-[11px]">Client Web Development</p>
                <p className="text-white/40 text-[9px]">Stripe Payout · Today</p>
              </div>
            </div>
            <span className="font-mono text-emerald-400 font-semibold text-xs">+$1,850.00</span>
          </div>
          <div className="flex items-center justify-between text-xs py-1">
            <div className="flex items-center gap-2">
              <span className="size-6 rounded-md bg-rose-500/10 text-rose-400 flex items-center justify-center text-[10px] font-bold">
                -$
              </span>
              <div>
                <p className="text-white font-medium text-[11px]">AWS & MongoDB Atlas</p>
                <p className="text-white/40 text-[9px]">Cloud Hosting · Yesterday</p>
              </div>
            </div>
            <span className="font-mono text-rose-400 font-semibold text-xs">-$64.20</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StyleDecorPreview() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0d0912] shadow-2xl transition duration-500 group-hover:border-violet-500/30">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-rose-500/80" />
          <span className="size-2.5 rounded-full bg-amber-500/80" />
          <span className="size-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-[10px] tracking-wider text-white/50">
            styledecor.io / booking-studio
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[9px] text-violet-400">
          <span className="size-1.5 rounded-full bg-violet-400 animate-pulse" />
          STRIPE VERIFIED
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Service Hero Card */}
        <div className="rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/15 via-white/[0.02] to-transparent p-4">
          <div className="flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-violet-300 bg-violet-500/20 px-2 py-0.5 rounded-full">
              INTERIOR ARCHITECTURE
            </span>
            <div className="flex items-center gap-1 text-amber-400 text-xs">
              <Star size={12} fill="currentColor" />
              <span className="font-semibold text-[11px]">4.98</span>
              <span className="text-white/40 text-[10px]">(124 reviews)</span>
            </div>
          </div>
          <h4 className="mt-2 text-lg sm:text-xl font-bold text-white font-display">
            Nordic Minimalist Living Room
          </h4>
          <p className="mt-1 text-xs text-white/60">
            Complete architectural space planning, 3D render preview & material specs.
          </p>
        </div>

        {/* Booking & Payment Interface Drawer */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-white/70">
              <CreditCard size={14} className="text-violet-400" />
              <span className="text-[11px] font-semibold">Payment</span>
            </div>
            <div className="rounded-lg bg-black/40 p-2 border border-white/5 font-mono text-[10px]">
              <div className="text-white/40">Secured with Stripe</div>
              <div className="text-white mt-1">4242 •••• •••• 4242</div>
              <div className="text-emerald-400 text-[9px] mt-1 flex items-center gap-1">
                <CheckCircle2 size={10} /> 256-Bit SSL Encrypted
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-white/70">
              <MapPin size={14} className="text-emerald-400" />
              <span className="text-[11px] font-semibold">Map Coordinate</span>
            </div>
            <div className="rounded-lg bg-black/40 p-2 border border-white/5 font-mono text-[10px]">
              <div className="text-white/40">Leaflet.js Engine</div>
              <div className="text-white mt-1">Dhaka Studio Suite</div>
              <div className="text-white/50 text-[9px] mt-1">Lat: 23.81°N Lon: 90.41°E</div>
            </div>
          </div>
        </div>

        {/* Admin Dashboard Metrics */}
        <div className="rounded-xl border border-white/5 bg-white/[0.015] p-3">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase text-white/40 mb-2">
            <span>Admin Management Telemetry</span>
            <span className="text-violet-400 font-semibold">JWT Role: Admin</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-white/[0.02] p-2 border border-white/5">
              <span className="block text-[9px] text-white/40 font-mono">Bookings</span>
              <span className="text-sm font-bold text-white font-mono">18 Active</span>
            </div>
            <div className="rounded-lg bg-white/[0.02] p-2 border border-white/5">
              <span className="block text-[9px] text-white/40 font-mono">Completed</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">86 Done</span>
            </div>
            <div className="rounded-lg bg-white/[0.02] p-2 border border-white/5">
              <span className="block text-[9px] text-white/40 font-mono">Database</span>
              <span className="text-sm font-bold text-white font-mono">MongoDB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GadgetHubPreview() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#080c14] shadow-2xl transition duration-500 group-hover:border-sky-500/30">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-rose-500/80" />
          <span className="size-2.5 rounded-full bg-amber-500/80" />
          <span className="size-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-[10px] tracking-wider text-white/50">
            gadgethub.store / nextjs-app-router
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[9px] text-sky-400">
          <span className="size-1.5 rounded-full bg-sky-400 animate-pulse" />
          NEXTAUTH ACTIVE
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Next.js Storefront Header */}
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-gradient-to-r from-sky-500/10 via-white/[0.02] to-transparent p-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400">Next.js 14 Storefront</span>
            <h4 className="text-sm sm:text-base font-bold text-white font-display">Modern Hardware & Gadgets</h4>
          </div>
          <div className="flex items-center gap-2 bg-white/[0.05] border border-white/10 px-2.5 py-1.5 rounded-lg text-xs font-mono text-white">
            <ShoppingCart size={13} className="text-sky-400" />
            <span>Cart: 3 items</span>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 space-y-2">
            <div className="h-16 rounded-lg bg-gradient-to-tr from-sky-950/40 to-slate-900 flex items-center justify-center border border-white/5">
              <span className="font-mono text-[10px] text-sky-300">🎧 ANC Wireless Pro</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-white font-semibold text-[11px] truncate">Studio Audio</span>
              <span className="font-mono text-sky-400 font-bold">$289</span>
            </div>
            <div className="text-[9px] text-emerald-400 font-mono">In Stock · Fast SSR</div>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 space-y-2">
            <div className="h-16 rounded-lg bg-gradient-to-tr from-slate-950 to-indigo-950/40 flex items-center justify-center border border-white/5">
              <span className="font-mono text-[10px] text-sky-300">⌨️ Custom Optical Pro</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-white font-semibold text-[11px] truncate">Mechanical Board</span>
              <span className="font-mono text-sky-400 font-bold">$149</span>
            </div>
            <div className="text-[9px] text-emerald-400 font-mono">Top Rated · Express API</div>
          </div>
        </div>

        {/* Auth & API Telemetry */}
        <div className="rounded-xl border border-white/5 bg-white/[0.015] p-3 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-white/50">
            <span>Authentication Engine</span>
            <span className="text-emerald-400 font-semibold">Google OAuth & Credentials</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-black/40 px-3 py-2 border border-white/5 font-mono text-[10px]">
            <span className="text-white/60">Decoupled Express.js REST API</span>
            <span className="text-emerald-400 font-semibold">Status 200 OK (38ms)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EdTechPreview() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#120a06] shadow-2xl transition duration-500 group-hover:border-amber-500/30">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-rose-500/80" />
          <span className="size-2.5 rounded-full bg-amber-500/80" />
          <span className="size-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-[10px] tracking-wider text-white/50">
            edtech-platform.dev / course-hub
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[9px] text-amber-400">
          <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
          UNDER ACTIVE BUILD
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Video Course Player Mockup */}
        <div className="relative rounded-xl border border-white/10 bg-gradient-to-br from-amber-500/15 via-white/[0.02] to-transparent p-4 overflow-hidden">
          <div className="flex items-center justify-between text-xs text-amber-300 font-mono mb-2">
            <span>COURSE MODULE 03 / 08</span>
            <span className="bg-amber-500/20 px-2 py-0.5 rounded text-[10px]">NEXT.js APP ROUTER</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-white font-display">
            Full-Stack React Architecture
          </h4>
          <div className="mt-3 flex items-center gap-3">
            <span className="size-8 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold">
              <Play size={14} fill="currentColor" />
            </span>
            <div className="flex-1">
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-full w-[65%]" />
              </div>
              <span className="text-[10px] font-mono text-white/40 mt-1 block">Lesson 14/28 · Progress: 65%</span>
            </div>
          </div>
        </div>

        {/* Combo Package Showcase */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.05] p-3 flex items-center justify-between">
          <div>
            <span className="text-[9px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
              SPECIAL COMBO PACKAGE
            </span>
            <span className="text-xs font-semibold text-white">Full-Stack Developer Career Suite</span>
            <span className="text-[10px] text-white/50 block font-mono">Includes 3 Core Courses + 5 Projects</span>
          </div>
          <div className="text-right">
            <span className="text-xs line-through text-white/40 font-mono block">$199</span>
            <span className="text-base font-bold text-amber-400 font-mono">$119</span>
          </div>
        </div>

        {/* Work In Progress Banner */}
        <div className="rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-xs flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/70">
            <Activity size={14} className="text-amber-400" />
            <span className="text-[11px]">Engineering Status: Shopping Cart & Checkout</span>
          </div>
          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/80">Q1 2025</span>
        </div>
      </div>
    </div>
  );
}
