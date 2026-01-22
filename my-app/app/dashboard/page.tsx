"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, FileText, Terminal, Eye, EyeOff, AlertCircle, Upload, Loader2, FileCode } from "lucide-react";
import { ScannerOverlay } from "@/components/dashboard/ScannerOverlay";
import { HealthGauge } from "@/components/dashboard/HealthGauge";
import { ClauseCard } from "@/components/analysis/ClauseCard";
import { Header } from "@/components/layout/Header";
import type { ContractReport, AnalysisStatus } from "@/lib/types";
import { anonymizeText } from "@/lib/anonymizer";
import { cn } from "@/lib/utils";

const THOUGHTS = [
    "Initializing Legal Neural Net...",
    "Scanning for Indemnity Loops...",
    "Detecting Hidden Liabilities...",
    "Masking PII & Sensitive Data...",
    "Comparing against Case Law...",
    "Optimizing for Plain English...",
    "Finalizing Risk Assessment...",
];

export default function Dashboard() {
    const [text, setText] = useState("");
    const [status, setStatus] = useState<AnalysisStatus>("idle");
    const [report, setReport] = useState<ContractReport | null>(null);
    const [thoughtIndex, setThoughtIndex] = useState(0);

    const [privacyMode, setPrivacyMode] = useState(false);
    const [isParsing, setIsParsing] = useState(false);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsParsing(true);
        setStatus("scanning"); // Show loading UI immediately

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/parse", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.ok && data.text) {
                setText(data.text);
                // AUTO-START ANALYSIS IMMEDIATELY
                startAnalysis(data.text);
            } else {
                throw new Error(data.error || "Failed to parse file");
            }
        } catch (err: any) {
            console.error(err);
            setStatus("error");
            alert("Error: " + err.message);
        } finally {
            setIsParsing(false);
            e.target.value = "";
        }
    };


    const startAnalysis = async (overriddenText?: string) => {
        const textToProcess = overriddenText || text;
        if (!textToProcess.trim()) return;

        setStatus("scanning");
        setThoughtIndex(0);
        setReport(null);

        // Privacy Mode Logic
        const textToAnalyze = privacyMode ? anonymizeText(textToProcess) : textToProcess;

        // If privacy mode is on and we are using overridden text (from file), 
        // update the UI text to show the redaction
        if (privacyMode && overriddenText) {
            setText(textToAnalyze);
        }

        const thoughtInterval = setInterval(() => {
            setThoughtIndex((prev) => (prev + 1) % THOUGHTS.length);
        }, 800);

        try {
            const res = await fetch("/api/audit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contractText: textToAnalyze }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Analysis failed");
            }

            setTimeout(() => {
                clearInterval(thoughtInterval);
                setReport(data);
                setStatus("complete");
            }, 1000);

        } catch (e: any) {
            console.error(e);
            clearInterval(thoughtInterval);
            setStatus("error");
            alert(e.message);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-[#df2531]/30">
            <Header />

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative pt-16">
                <ScannerOverlay isScanning={status === "scanning"} />

                {/* LEFT: Input Area */}
                <div className="flex-1 p-6 lg:border-r border-[#df2531]/20 flex flex-col h-[60vh] lg:h-auto overflow-hidden">
                    <div className="flex justify-between items-center mb-3">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                            <Terminal className="w-4 h-4" /> Contract Content
                        </label>

                        {/* Privacy Toggle */}
                        <button
                            onClick={() => setPrivacyMode(!privacyMode)}
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                                privacyMode
                                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                            )}
                        >
                            {privacyMode ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            {privacyMode ? "Privacy Protocol: ACTIVE" : "Privacy Protocol: OFF"}
                        </button>
                    </div>

                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        disabled={status === "scanning"}
                        placeholder="Paste your legal contract here or import a file..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl p-6 text-sm font-mono leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-[#df2531]/50 transition-all text-gray-300 placeholder:text-gray-700"
                    />

                    <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <label className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all border",
                                isParsing
                                    ? "bg-white/5 border-white/10 text-gray-500 cursor-not-allowed"
                                    : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                            )}>
                                {isParsing ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Upload className="w-4 h-4" />
                                )}
                                {isParsing ? "PARSING..." : "IMPORT DOCX/PDF"}
                                <input
                                    type="file"
                                    className="hidden"
                                    accept=".docx,.pdf,.txt"
                                    onChange={handleFileUpload}
                                    disabled={isParsing || status === "scanning"}
                                />
                            </label>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => startAnalysis()}
                                disabled={status === "scanning" || !text.trim()}
                                className="px-8 py-3 bg-[#df2531] hover:bg-[#df2531]/80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all shadow-lg shadow-[#df2531]/20 active:scale-95 text-sm"
                            >
                                {status === "scanning" ? "AUDITING..." : "RUN AUDIT"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Results Area */}
                <div className="flex-1 bg-black overflow-y-auto relative scroll-smooth p-6 pb-20">
                    <AnimatePresence mode="wait">
                        {/* IDLE STATE */}
                        {status === "idle" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full flex flex-col items-center justify-center text-gray-600 space-y-4"
                            >
                                <Shield className="w-16 h-16 opacity-20" />
                                <p>Ready to analyze. Paste a contract to begin.</p>
                            </motion.div>
                        )}

                        {/* SCANNING STATE */}
                        {status === "scanning" && (
                            <motion.div
                                key="scanning"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full flex flex-col items-center justify-center space-y-6"
                            >
                                <div className="relative">
                                    <div className="w-16 h-16 border-4 border-[#df2531]/30 border-t-[#df2531] rounded-full animate-spin" />
                                </div>
                                <div className="h-6 overflow-hidden relative w-64 text-center">
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={thoughtIndex}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            className="text-[#df2531] font-mono text-sm absolute w-full"
                                        >
                                            {THOUGHTS[thoughtIndex]}
                                        </motion.p>
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}

                        {/* ERROR STATE */}
                        {status === "error" && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex items-center justify-center text-red-500"
                            >
                                Analysis failed. Try Again.
                            </motion.div>
                        )}

                        {/* RESULTS STATE */}
                        {report && status === "complete" && (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="max-w-xl mx-auto space-y-8"
                            >
                                {/* HUD Header */}
                                <div className="flex items-center gap-6 mb-8 p-4 bg-white/5 rounded-xl border border-white/10">
                                    <HealthGauge score={report.healthScore} />
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-1">Audit Complete</h2>
                                        <p className="text-gray-400 text-sm">
                                            Found <span className="text-red-400">{report.risk.length} Risks</span>,{" "}
                                            <span className="text-yellow-400">{report.review.length} Warnings</span>.
                                        </p>
                                    </div>
                                </div>

                                {/* Missing Clauses (Ghost Detective) */}
                                {report.missing && report.missing.length > 0 && (
                                    <section className="bg-white/5 border border-[#df2531]/20 rounded-xl p-5 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <AlertCircle className="w-24 h-24 text-gray-500" />
                                        </div>
                                        <h3 className="text-[#df2531] font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider relative z-10">
                                            <span className="w-2 h-2 rounded-full bg-[#df2531] animate-pulse" /> Missing Clause Detective
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-3 relative z-10">
                                            We detected that this contract lacks the following standard protections:
                                        </p>
                                        <div className="space-y-2 relative z-10">
                                            {report.missing.map((clause, i) => (
                                                <div key={i} className="flex items-start gap-2 text-[#df2531]/80 text-sm font-medium">
                                                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#df2531]" />
                                                    {clause}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Value Analysis (Market Benchmarking) */}
                                {report.valueAnalysis && (
                                    <section className="bg-gradient-to-br from-emerald-900/10 to-emerald-500/5 border border-emerald-500/20 rounded-xl p-6">
                                        <h3 className="text-emerald-400 font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Market Value Analysis
                                        </h3>
                                        <p className="text-zinc-300 text-sm leading-relaxed">
                                            {report.valueAnalysis}
                                        </p>
                                    </section>
                                )}

                                {/* Risk Section */}
                                {report.risk.length > 0 && (
                                    <section>
                                        <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                            <span className="w-2 h-2 rounded-full bg-red-500" /> Critical Risks
                                        </h3>
                                        {report.risk.map((item, i) => (
                                            <ClauseCard key={i} item={item} type="risk" delay={i * 0.1} />
                                        ))}
                                    </section>
                                )}

                                {/* Review Section */}
                                {report.review.length > 0 && (
                                    <section>
                                        <h3 className="text-yellow-400 font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                            <span className="w-2 h-2 rounded-full bg-yellow-500" /> Needs Review
                                        </h3>
                                        {report.review.map((item, i) => (
                                            <ClauseCard key={i} item={item} type="review" delay={0.2 + i * 0.1} />
                                        ))}
                                    </section>
                                )}

                                {/* Safe Section */}
                                {report.safe.length > 0 && (
                                    <section>
                                        <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                            <span className="w-2 h-2 rounded-full bg-green-500" /> Safe Clauses
                                        </h3>
                                        {report.safe.map((item, i) => (
                                            <ClauseCard key={i} item={item} type="safe" delay={0.4 + i * 0.1} />
                                        ))}
                                    </section>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
