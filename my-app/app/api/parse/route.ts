import { NextResponse } from "next/server";
import mammoth from "mammoth";

// POLYFILLS for pdf-parse (which uses old pdf.js)
// 1. DOMMatrix (Minimal mock for text extraction)
if (typeof global.DOMMatrix === 'undefined') {
    (global as any).DOMMatrix = class DOMMatrix {
        a = 1; b = 0; c = 0; d = 1; e = 0; f = 0;
        constructor() { }
        setMatrixValue() { return this; }
        translate() { return this; }
        scale() { return this; }
        rotate() { return this; }
        multiply() { return this; }
        inverse() { return this; }
        toString() { return "matrix(1, 0, 0, 1, 0, 0)"; }
    }
}

// 2. Promise.withResolvers (Just in case, though pdf-parse might not need it)
if (typeof Promise.withResolvers === "undefined") {
    (Promise as any).withResolvers = function () {
        let resolve, reject;
        const promise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        return { promise, resolve, reject };
    };
}

// Import pdf-parse using require
const pdf = require("pdf-parse");

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        let text = "";

        if (file.type === "application/pdf") {
            // pdf-parse usage
            // It returns a promise that resolves to an object: { text: string, ... }
            const data = await pdf(buffer);
            text = data.text;
        } else if (
            file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            file.name.endsWith(".docx")
        ) {
            const result = await mammoth.extractRawText({ buffer });
            text = result.value;
        } else {
            // Fallback for text
            text = buffer.toString("utf-8");
        }

        return NextResponse.json({ text });
    } catch (error: any) {
        console.error("Parse Error:", error);
        return NextResponse.json(
            { error: "Failed to parse file: " + (error.message || String(error)) },
            { status: 500 }
        );
    }
}
