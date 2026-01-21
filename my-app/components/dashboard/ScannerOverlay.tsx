"use client";

import { motion } from "framer-motion";

export function ScannerOverlay({ isScanning }: { isScanning: boolean }) {
    if (!isScanning) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
            <motion.div
                initial={{ top: "-10%" }}
                animate={{ top: "110%" }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear",
                }}
                className="absolute left-0 right-0 h-1 bg-[#df2531] shadow-[0_0_20px_4px_rgba(223,37,49,0.5)]"
            />
            <div className="absolute inset-0 bg-[#df2531]/5 mix-blend-overlay" />
        </div>
    );
}
