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
       {/* Project Cover Image */}
      <div className="w-full aspect-video overflow-hidden">
        <img
          src="https://i.ibb.co.com/FqX4zmg0/image.png"
          alt="FinEase Project Cover"
          className="w-full h-full object-cover object-top"
        />
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


       {/* Project Cover Image */}
      <div className="w-full aspect-video overflow-hidden">
        <img
          src="https://i.ibb.co.com/hJXSjtP5/image.png"
          alt="StyleDecor Project Cover"
          className="w-full h-full object-cover object-top"
        />
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

 {/* Project Cover Image */}
      <div className="w-full aspect-video overflow-hidden">
        <img
          src="https://i.ibb.co.com/B24g0kkM/nextjs-ss.png"
          alt="GadgetHub Project Cover"
          className="w-full h-full object-cover object-top"
        />
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

       {/* Project Cover Image */}
      <div className="w-full aspect-video overflow-hidden">
        <img
          src="https://i.ibb.co.com/20JgQY6Y/image.png"
          alt="EdTech Project Cover"
          className="w-full h-full object-cover object-top"
        />
      </div>

      
    </div>
  );
}
