export type TextSegment = { text: string; bold: boolean };

// Splits "plain **bold** plain" into segments so the site and the PDF resume can share one markup.
export function boldSegments(text: string): TextSegment[] {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) => ({ text: part, bold: i % 2 === 1 }))
    .filter((segment) => segment.text.length > 0);
}
