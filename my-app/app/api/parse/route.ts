import { NextResponse } from "next/server";
import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";
import path from "path";
import { pathToFileURL } from "url";

// Set the worker source for pdf-parse to avoid "Cannot find module" errors in Next.js
// On Windows, absolute paths must be converted to file:// URLs for ESM
const workerPath = path.resolve(process.cwd(), "node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs");
PDFParse.setWorker(pathToFileURL(workerPath).href);

export const runtime = 'nodejs';

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
        // Handle PDF
        else if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
            try {
                const parser = new PDFParse({ data: buffer });
                const result = await parser.getText();
                await parser.destroy();
                text = result.text;

                if (!text || text.trim().length === 0) {
                    throw new Error("PDF seems to be empty or image-only (scanned). OCR is not supported.");
                }
            } catch (pdfError: any) {
                console.error("PDF Parse Error:", pdfError);
                throw new Error(`Failed to read PDF document: ${pdfError.message || "Unknown PDF parsing error"}`);
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
