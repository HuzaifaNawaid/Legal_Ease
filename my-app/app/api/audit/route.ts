import { OpenAI } from "openai";
import { NextResponse } from "next/server";

export const runtime = "edge";

// 🔒 Hard fail early if env is missing (prevents silent Vercel crashes)
if (!process.env.OPENROUTER_API_KEY) {
  throw new Error("OPENROUTER_API_KEY is not defined");
}

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const SYSTEM_PROMPT = `
You are an expert Corporate Legal Counsel. Analyze the following contract for risk.
You must return ONLY a JSON object.

JSON Format:
{
  "healthScore": 0-100,
  "safe": [{"title": "", "summary": "", "plainEnglish": ""}],
  "review": [{"title": "", "summary": "", "plainEnglish": "", "reason": ""}],
  "risk": [{
    "title": "",
    "summary": "",
    "plainEnglish": "",
    "riskLevel": "High",
    "fix": "Write a specific counter-offer clause here"
  }],
  "missing": ["List 3-5 standard legal clauses that are MISSING."],
  "valueAnalysis": "Evaluate the payment terms and usage rights."
}

Rules:
1. Be extremely critical of liability, termination, and payment terms.
2. 'plainEnglish' must be understandable by a 10-year-old.
3. 'fix' must be a professional counter-offer clause.
4. Identify missing clauses.
5. Assess if the deal is fair market value.
`;

export async function POST(req: Request) {
  try {
    // 🔹 Parse request body safely
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body" },
        { status: 400 }
      );
    }

    const contractText = body?.contractText;

    if (!contractText || typeof contractText !== "string") {
      return NextResponse.json(
        { error: "Contract text is required" },
        { status: 400 }
      );
    }

    // 🔹 Call OpenRouter
    const completion = await openai.chat.completions.create({
      // ❗ DO NOT use :free in production
      model: "meta-llama/llama-3.3-70b-instruct",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: contractText },
      ],
      temperature: 0.2,
    });

    const content = completion?.choices?.[0]?.message?.content;

    // 🔴 Handle empty AI response (VERY COMMON ON VERCEL)
    if (!content) {
      return NextResponse.json(
        { error: "AI returned empty response" },
        { status: 502 }
      );
    }

    // 🔹 Parse JSON safely
    let parsedResult;
    try {
      // Best case: pure JSON
      parsedResult = JSON.parse(content);
    } catch {
      // Fallback: extract JSON from text / markdown
      const match = content.match(/\{[\s\S]*\}$/);
      if (!match) {
        return NextResponse.json(
          {
            error: "AI response was not valid JSON",
            raw: content.slice(0, 500),
          },
          { status: 502 }
        );
      }

      try {
        parsedResult = JSON.parse(match[0]);
      } catch {
        return NextResponse.json(
          {
            error: "Failed to parse extracted JSON",
            raw: match[0].slice(0, 500),
          },
          { status: 502 }
        );
      }
    }

    // ✅ Success
    return NextResponse.json(parsedResult);

  } catch (err: any) {
    // 🔥 Guaranteed JSON response (prevents frontend crash)
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
