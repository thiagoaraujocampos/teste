export function normalizeText(text: string) {
    return text
        .replace(/[^\p{L}\s\d]/gu, "")
        .replace(/\s+/g, " ")
        .trim();
}