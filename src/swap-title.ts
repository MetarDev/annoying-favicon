import { saveOriginalTitle } from "./helpers/save-original-title";
import { resetTitle } from "./reset-title";

export interface SwapTitleProps {
  title: string;
	when?: "now" | "onfocus" | "onblur";
  reset?: "none" | "after" | "onfocus" | "onblur";
  resetAfterMs?: number;
}

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
  when = "now",
  reset = "none",
  resetAfterMs = 3000,
}: SwapTitleProps) => {
	saveOriginalTitle();
  switch (when) {
    case "now":
			resetTitle();
      document.title = title;
      break;
    case "onblur":
      window.TabkyJs.blurCallbacks.push(() => swapTitle({ title }));
      break;
    case "onfocus":
      window.TabkyJs.focusCallbacks.push(() => swapTitle({ title }));
      break;
  }

  switch (reset) {
    case "onblur":
      window.TabkyJs.blurCallbacks.push(() => resetTitle());
      break;
    case "onfocus":
      window.TabkyJs.focusCallbacks.push(() => resetTitle());
      break;
    case "after":
      setTimeout(() => {
        resetTitle();
      }, resetAfterMs);
      break;
  }
};
