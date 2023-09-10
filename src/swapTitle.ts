import { SwapTitleProps } from "./Interfaces/SwapTitleProps";
import { saveOriginalTitle } from "./helpers/saveOriginalTitle";
import { resetTitle } from "./resetTitle";

/**
 * Changes the title of the page.
 *
 * @param param0 Swap title props
 * @param param0.title The title to set.
 * @param param0.when When to swap the title. Available options are 'now', 'onfocus', and 'onblur'.
 * @param param0.reset Reset the title if needed. Available options are 'none', 'after', 'onfocus', and 'onblur'.
 * @param param0.resetAfterMs Used only with reset === 'after'. The number of milliseconds to wait before resetting the title.

 */
export const swapTitle = ({
	title,
	when = 'now',
	reset = 'none',
	resetAfterMs = 3000,
}: SwapTitleProps) => {
	saveOriginalTitle();

	if (when === "now") {
		document.title = title;
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
			resetTitle();
		}, resetAfterMs);
	}
};
