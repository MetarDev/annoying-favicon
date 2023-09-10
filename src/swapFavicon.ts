import { SwapFaviconProps } from "./Interfaces/SwapFaviconProps";
import { getFaviconHref } from "./helpers/getFaviconHref";
import { saveOriginalFavicon } from "./helpers/saveOriginalFavicon";
import { resetFavicon } from "./resetFavicon";

/**
 * Changes the favicon of the page.
 *
 * @param param0 Swap favicon props
 * @param param0.favicon The favicon URL or emoji.
 * @param param0.when When to swap the favicon. Available options are 'now', 'onfocus', and 'onblur'.
 * @param param0.reset Reset the favicon if needed. Available options are 'none', 'after', 'onfocus', and 'onblur'.
 * @param param0.resetAfterMs Used only with reset === 'after'. The number of milliseconds to wait before resetting the favicon.
 */
export const swapFavicon = ({
	favicon,
	when = 'now',
	reset = 'none',
	resetAfterMs = 3000,
}: SwapFaviconProps) => {
  const links = document.querySelectorAll("link[rel='icon']");
	
  links.forEach((link: any) => {
		saveOriginalFavicon(link);
    if (when === "now") {
      link.href = getFaviconHref(favicon);
    }

		if (when === 'onblur') {
			// Probably need some global event handler (setup as soon as your import this file) to handle this.
		}

		if (when === 'onfocus') {
			// Probably need some global event handler (setup as soon as your import this file) to handle this.
		}

		if (reset === 'onfocus') {
			// Probably need some global event handler (setup as soon as your import this file) to handle this.
		}

		if (reset === 'onblur') {
			// Probably need some global event handler (setup as soon as your import this file) to handle this.
		}

		if (reset === 'after') {
			setTimeout(() => {
				resetFavicon();
			}, resetAfterMs);
		}
  });
};
