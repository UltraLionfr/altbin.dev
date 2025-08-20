"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import LordIcon from "./LordIcon";

export default function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: any;
  icon: string;
}) {
  const iconRef = useRef<any>(null);

  return (
    <motion.div
      className="rounded-2xl bg-[#11131c] p-5 border border-white/10 hover:border-blue-500/40 transition-colors shadow-md"
      whileHover={{ scale: 1.03 }}
      onMouseEnter={() => iconRef.current?.playFromBeginning()}
      onMouseLeave={() => iconRef.current?.goToFirstFrame()}
    >
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
          <LordIcon ref={iconRef} url={icon} size={28} colorize="#3b82f6" />
        </div>
        <div>
          <div className="text-sm text-neutral-400">{label}</div>
          <div className="text-xl font-bold text-white">{value}</div>
        </div>
      </div>
    </motion.div>
  );
}
