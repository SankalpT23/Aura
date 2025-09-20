"use client";
import { motion } from "framer-motion";

export default function AnimatedLineGraph() {
  const points = [
    [0, 80],
    [10, 75],
    [20, 78],
    [30, 70],
    [40, 65],
    [50, 62],
    [60, 58],
    [70, 55],
    [80, 52],
    [90, 50],
    [100, 48],
  ];
  const path = points.map(([x, y]) => `${x},${y}`).join(" ");

  return (
    <div className="w-full max-w-4xl mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-48 sm:h-64 md:h-72">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--chart-1)" />
            <stop offset="100%" stopColor="var(--chart-2)" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#27AE60" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="100" height="100" rx="6" fill="var(--card)" stroke="var(--border)" />

        <motion.polyline
          fill="url(#areaGradient)"
          points={`0,100 ${path} 100,100`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />

        <motion.polyline
          points={path}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="1.8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}