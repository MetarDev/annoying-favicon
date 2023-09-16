import { getFaviconHref } from "./helpers/get-favicon-href";
import { saveOriginalFavicon } from "./helpers/save-original-favicon";
import { resetFavicon } from "./reset-favicon";

export interface SwapFaviconProps {
  favicon: string;
  when?: "now" | "onfocus" | "onblur";
  reset?: "none" | "after" | "onfocus" | "onblur";
  resetAfterMs?: number;
  emojiCompatibilityMode?: boolean;
}

/**
 * Changes the favicon of the page.
 *
 * @param param0 Swap favicon props
 * @param {string} param0.favicon The favicon URL or emoji.
 * @param {string} [param0.when] When to swap the favicon. Available options are 'now', 'onfocus', and 'onblur'.
 * @param {string} [param0.reset] Reset the favicon if needed. Available options are 'none', 'after', 'onfocus', and 'onblur'.
 * @param {number} [param0.resetAfterMs] Used only with reset === 'after'. The number of milliseconds to wait before resetting the favicon.
 * @param {boolean} [param0.emojiCompatibilityMode] If set to true, setting the emoji as favicon will draw it as a PNG image for better compatibility, (all major browsers support PNG favicons). If set to false, it will draw it as an SVG (Safari for example doesn't support it).
 * @returns {void}
 */
export const swapFavicon = ({
  favicon,
  when = "now",
  reset = "none",
  resetAfterMs = 3000,
  emojiCompatibilityMode = true,
}: SwapFaviconProps) => {
  const links = document.querySelectorAll("link[rel='icon']");

  links.forEach((link: any) => {
    saveOriginalFavicon(link);

    switch (when) {
      case "now":
        link.href = getFaviconHref(favicon, emojiCompatibilityMode);
        break;
      case "onblur":
        window.TabkyJs.blurCallbacks.push(() =>
          swapFavicon({ favicon, emojiCompatibilityMode }),
        );
        break;
      case "onfocus":
        window.TabkyJs.focusCallbacks.push(() =>
          swapFavicon({ favicon, emojiCompatibilityMode }),
        );
        break;
    }

    switch (reset) {
      case "onblur":
        window.TabkyJs.blurCallbacks.push(() => resetFavicon());
        break;
      case "onfocus":
        window.TabkyJs.focusCallbacks.push(() => resetFavicon());
        break;
      case "after":
        setTimeout(() => {
          resetFavicon();
        }, resetAfterMs);
        break;
    }

    if (reset === "after") {
      setTimeout(() => {
        resetFavicon();
      }, resetAfterMs);
    }
  });
};
