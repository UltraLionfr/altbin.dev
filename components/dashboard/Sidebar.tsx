"use client";

import LogoutButton from "@/components/ui/LogoutButton";
import { FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "My Pastes", href: "/dashboard", icon: FileText },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#11131c] border-r border-white/10 p-6">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-white">AltBin</h2>
        <p className="text-xs text-neutral-500">Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  active
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <LogoutButton />
      </div>
    </aside>
  );
}