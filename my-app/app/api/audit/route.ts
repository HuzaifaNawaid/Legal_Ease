import { OpenAI } from "openai";
import { NextResponse } from "next/server";

export const runtime = "edge";

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
  "risk": [{"title": "", "summary": "", "plainEnglish": "", "riskLevel": "High", "fix": "Write a specific counter-offer clause here"}],
  "missing": ["List 3-5 standard legal clauses that are MISSING."],
  "valueAnalysis": "Evaluate the payment terms and usage rights. Are they fair market standard for a creator? If not, explain why."
}
Instructions:
1. Be extremely critical of liability, termination, and payment terms.
2. The 'plainEnglish' field must be a 1-sentence summary for a 10-year-old.
3. The 'fix' field should be a professionally written COUNTER-OFFER that the user can copy-paste.
4. Identify vital clauses that are missing.
5. Provide a 'valueAnalysis' assessing if the deal is fair or if they should ask for more.
`;

export async function POST(req: Request) {
    try {
        const { contractText } = await req.json();

        if (!contractText) {
            return NextResponse.json(
                { error: "Contract text is required" },
                { status: 400 }
            );
        }

        const completion = await openai.chat.completions.create({
            model: "openai/gpt-oss-120b:free",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: contractText },
            ],
            // response_format: { type: "json_object" }, // Removing this as it may cause 400 errors on some providers
        });

        const result = completion.choices[0].message.content;
        console.log("Raw OpenRouter Response:", result);

        if (!result) throw new Error("No content returned from AI");

        // Attempt to extract JSON if the model returns markdown code blocks
        const jsonMatch = result.match(/\{[\s\S]*\}/);
        const jsonString = jsonMatch ? jsonMatch[0] : result;

        try {
            const parsedResult = JSON.parse(jsonString);
            return NextResponse.json(parsedResult);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
            console.error("Failed JSON Content:", jsonString);
            return NextResponse.json(
                { error: "AI returned invalid JSON. Please try again." },
                { status: 500 }
            );
        }

    } catch (error: any) {
        console.error("Audit Error Detail:", error);
        return NextResponse.json(
            { error: error.message || "Failed to analyze contract" },
            { status: 500 }
        );
    }
}
