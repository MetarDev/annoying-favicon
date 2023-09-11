import { isEmoji } from "./isEmoji";

/**
 * Returns the favicon href as an SVG if emoji, or as a URL if not.
 *
 * @param favicon The favicon URL or emoji.
 * @returns
 */
export const getFaviconHref = (favicon: string) => {
  if (isEmoji(favicon)) {
    return `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${favicon}</text></svg>`;
  } else {
    return favicon;
  }
};
