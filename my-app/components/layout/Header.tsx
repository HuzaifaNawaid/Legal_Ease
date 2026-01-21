"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 w-full z-50 border-b border-[#df2531]/65 bg-black/80 backdrop-blur-md">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="material-symbols-outlined text-[#df2531] text-3xl">gavel</span>
                    <span className="text-xl font-bold tracking-tight text-white">
                        LegalEase
                    </span>
                </Link>
                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
                    <Link href="#features" className="hover:text-[#df2531] transition-colors">Features</Link>
                    <Link href="#solutions" className="hover:text-[#df2531] transition-colors">Solutions</Link>
                    <Link href="#pricing" className="hover:text-[#df2531] transition-colors">Pricing</Link>
                    <Link href="#about" className="hover:text-[#df2531] transition-colors">About</Link>
                </nav>
                <div>
                    <Link
                        href="/dashboard"
                        className={cn(
                            "inline-flex items-center justify-center px-6 py-2.5 rounded-lg font-semibold text-sm border border-[#df2531]/20 transition-all shadow-lg",
                            pathname === "/dashboard"
                                ? "bg-[#df2531] text-white"
                                : "bg-[#df2531]/65 hover:bg-[#df2531] text-white"
                        )}
                    >
                        Scan a Contract
                    </Link>
                </div>
            </div>
        </header>
    );
}
