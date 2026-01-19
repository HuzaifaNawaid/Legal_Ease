import { Shield } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-zinc-800 bg-zinc-950 py-12 mt-auto">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-zinc-600" />
                    <span className="font-bold text-zinc-600">LegalEase</span>
                </div>
                <p className="text-zinc-500 text-sm">
                    © {new Date().getFullYear()} LegalEase AI. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
