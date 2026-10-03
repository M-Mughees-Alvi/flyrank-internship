// Neutral "no image" placeholder, used when an exercise has no image
// or when an image URL fails to load.
const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260">
    <rect width="400" height="260" fill="#e3e7ed"/>
    <text x="50%" y="50%" fill="#5b6675" font-family="sans-serif"
          font-size="22" font-weight="600" text-anchor="middle"
          dominant-baseline="central">No image available</text>
  </svg>`;

export const PLACEHOLDER_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
