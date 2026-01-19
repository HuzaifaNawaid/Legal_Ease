export function anonymizeText(text: string): string {
    // 1. Email Addresses
    let processed = text.replace(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
        "[REDACTED_EMAIL]"
    );

    // 2. Phone Numbers (Rough regex for common formats)
    processed = processed.replace(
        /(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g,
        "[REDACTED_PHONE]"
    );

    // 3. Dollar Amounts
    processed = processed.replace(
        /\$\s?(\d{1,3}(\,\d{3})*(\.\d{2})?)/g,
        "[REDACTED_AMOUNT]"
    );

    // 4. Dates (MM/DD/YYYY or similar)
    processed = processed.replace(
        /\b\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}\b/g,
        "[REDACTED_DATE]"
    );

    // 5. Addresses (Very hard to do perfectly with regex, identifying "St", "Ave", "Blvd")
    processed = processed.replace(
        /\d+\s[A-z]+\s(St|Ave|Blvd|Road|Ln|Dr|Drive|Street|Avenue)\b/gi,
        "[REDACTED_ADDRESS]"
    );

    return processed;
}
