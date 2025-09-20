"use client";
import Image from "next/image";

export default function DashboardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="absolute -inset-6 bg-[radial-gradient(ellipse_at_top_left,rgba(255,107,53,0.25),transparent_60%)] blur-2xl" aria-hidden />
      <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_bottom_right,rgba(39,174,96,0.18),transparent_60%)] blur-3xl" aria-hidden />
      <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_0_60px_#FF6B3526] overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
        <div className="bg-gradient-to-b from-white/5 to-transparent px-4 py-2 border-b border-[var(--border)] flex gap-1">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
          <span className="h-3 w-3 rounded-full bg-green-400/80" />
        </div>
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Screenshot%202025-09-19%20210329-1758296337182.png"
          alt="AURA 2.0 dashboard screenshot"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />
      </div>
    </div>
  );
}