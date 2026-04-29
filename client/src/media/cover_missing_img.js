// Inline SVG placeholder so a coverless book is still self-contained
// without bloating the document with a real PNG.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="192" viewBox="0 0 128 192"><rect width="128" height="192" fill="gainsboro" stroke="lightgray"/><text x="64" y="92" text-anchor="middle" fill="gray" font-family="sans-serif" font-size="11">Ingen</text><text x="64" y="108" text-anchor="middle" fill="gray" font-family="sans-serif" font-size="11">omslagsbild</text></svg>`;

const COVER_MISSING_IMG = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

export default COVER_MISSING_IMG;
