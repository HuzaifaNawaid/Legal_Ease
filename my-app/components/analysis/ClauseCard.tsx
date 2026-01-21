"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertTriangle, Octagon, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ClauseAnalysis } from "@/lib/types";

interface ClauseCardProps {
    item: ClauseAnalysis;
    type: "safe" | "review" | "risk";
    delay: number;
}

export function ClauseCard({ item, type, delay }: ClauseCardProps) {
    const [showPlain, setShowPlain] = useState(false);
    const [copied, setCopied] = useState(false);

    const copyFix = () => {
        if (item.fix) {
            navigator.clipboard.writeText(item.fix);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const getIcon = () => {
        switch (type) {
            case "safe": return <CheckCircle className="w-5 h-5 text-green-500" />;
            case "review": return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
            case "risk": return <Octagon className="w-5 h-5 text-red-500" />;
        }
    };

    const getBorderColor = () => {
        switch (type) {
            case "safe": return "border-green-500/20";
            case "review": return "border-yellow-500/20";
            case "risk": return "border-red-500/20";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className={cn(
                "p-4 rounded-lg bg-zinc-900 border mb-4 relative overflow-hidden group",
                getBorderColor()
            )}
        >
            <div className="flex items-start gap-3">
                <div className="mt-1">{getIcon()}</div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h3 className="text-zinc-100 font-semibold mb-1">{item.title}</h3>
                        {type === "risk" && (
                            <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">
                                HIGH RISK
                            </span>
                        )}
                    </div>

                    <div className="relative min-h-[3rem]">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={showPlain ? "plain" : "legal"}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-zinc-400 text-sm leading-relaxed"
                            >
                                {showPlain ? item.plainEnglish : item.summary}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {showPlain ? "Plain English" : "Legal Summary"}
                        </span>
                        <button
                            onClick={() => setShowPlain(!showPlain)}
                            className={cn(
                                "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#df2531] focus:ring-offset-2",
                                showPlain ? "bg-[#df2531]" : "bg-white/10"
                            )}
                        >
                            <span
                                className={cn(
                                    "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                                    showPlain ? "translate-x-4" : "translate-x-0"
                                )}
                            />
                        </button>
                    </div>

                    {type === "risk" && item.fix && (
                        <div className="mt-4 p-3 bg-white/5 rounded border border-[#df2531]/20">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[#df2531] text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                                    Safe-Swap™ Revision
                                </span>
                                <button
                                    onClick={copyFix}
                                    className="text-gray-500 hover:text-white transition-colors flex items-center gap-1 text-xs"
                                >
                                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                    {copied ? "Copied" : "Copy"}
                                </button>
                            </div>
                            <p className="text-gray-300 text-sm italic font-serif">
                                "{item.fix}"
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
