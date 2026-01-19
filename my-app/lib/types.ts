export interface ClauseAnalysis {
    title: string;
    summary: string;
    plainEnglish: string;
    reason?: string; // for review/risk
    riskLevel?: "High" | "Medium" | "Low"; // for risk
    fix?: string; // for risk, suggested revision
}

export interface ContractReport {
    healthScore: number;
    safe: ClauseAnalysis[];
    review: ClauseAnalysis[];
    risk: ClauseAnalysis[];
    missing?: string[];
    valueAnalysis?: string; // Market Rate Benchmarking
}

export interface ClauseAnalysis {
    title: string;
    summary: string;
    plainEnglish: string;
    reason?: string;
    riskLevel?: "High" | "Medium" | "Low";
    fix?: string; // Suggested revision / Counter-offer
}

export type AnalysisStatus = "idle" | "scanning" | "analyzing" | "complete" | "error";
