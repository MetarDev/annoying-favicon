import { getFaviconHref } from "./helpers/getFaviconHref";
import { saveOriginalFavicon } from "./helpers/saveOriginalFavicon";
import { resetFavicon } from "./resetFavicon";

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
 * @param param0.favicon The favicon URL or emoji.
 * @param param0.when When to swap the favicon. Available options are 'now', 'onfocus', and 'onblur'.
 * @param param0.reset Reset the favicon if needed. Available options are 'none', 'after', 'onfocus', and 'onblur'.
 * @param param0.resetAfterMs Used only with reset === 'after'. The number of milliseconds to wait before resetting the favicon.
 * @param param0.emojiCompatibilityMode If set to true, setting the emoji as favicon will draw it as a PNG image for better compatibility, (all major browsers support PNG favicons). If set to false, it will draw it as an SVG (Safari for example doesn't support it).
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
