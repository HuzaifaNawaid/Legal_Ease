import { NextResponse } from "next/server";
import mammoth from "mammoth";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        let text = "";

        // Handle DOCX
        if (
            file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            file.name.endsWith(".docx")
        ) {
            try {
                const result = await mammoth.extractRawText({ buffer });
                text = result.value;
            } catch (docxError: any) {
                console.error("DOCX Parse Error:", docxError);
                throw new Error("Failed to read Word document.");
            }
        }
        // Fallback for TXT
        else {
            text = buffer.toString("utf-8");
        }

        const cleanedText = text
            .replace(/\r\n/g, "\n")
            .replace(/\n{3,}/g, "\n\n")
            .trim();

        return NextResponse.json({ text: cleanedText });
    } catch (error: any) {
        console.error("Parse Error:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error during file processing" },
            { status: 500 }
        );
    }
}
