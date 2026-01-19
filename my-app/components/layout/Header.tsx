"use client";

import Link from "next/link";
import { Shield, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 w-full z-50 border-b bg-zinc-950/80 border-zinc-800 backdrop-blur-md">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <Shield className="w-6 h-6 text-indigo-500 transition-transform group-hover:scale-110" />
                    <span className="font-bold text-lg tracking-tight text-white">
                        LegalEase
                    </span>
                </Link>
                <nav className="flex items-center gap-6">
                    <Link
                        href="/dashboard"
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                            pathname === "/dashboard"
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                                : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
                        )}
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        Scan Contract
                    </Link>
                </nav>
            </div>
        </header>
    );
}
