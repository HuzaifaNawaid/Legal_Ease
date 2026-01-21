"use client";

import { motion } from "framer-motion";

export function HealthGauge({ score }: { score: number }) {
    // Color logic
    const getColor = (s: number) => {
        if (s >= 80) return "#22c55e"; // green
        if (s >= 50) return "#eab308"; // yellow
        return "#ef4444"; // red
    };

    const color = getColor(score);
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-zinc-800"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        cx="64"
                        cy="64"
                        r={radius}
                        stroke={color}
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute text-3xl font-bold font-mono">
                    {score}
                </div>
            </div>
            <span className="mt-2 text-sm text-zinc-400 font-medium">Health Score</span>
        </div>
    );
}
