import { MarqueeTitleProps } from "./Interfaces/MarqueeTitleProps";
import { saveOriginalTitle } from "./helpers/saveOriginalTitle";

/**
 * Marquee the page title.
 *
 * @param title Page title to marquee
 * @param param0 Title marquee props
 * @param param0.interval Marquee interval, how long to wait between scrolling letters (in milliseconds)
 * @returns Interval ID
 */
export const marqueeTitle = ({ title, interval = 300 }: MarqueeTitleProps) => {
	saveOriginalTitle();
  document.title = `${title.trim()} `;
  let counter = 0;

  return setInterval(() => {
    document.title = `${title.substring(
      counter,
      title.length,
    )} ${title.substring(0, counter)}`;
    counter++;
    if (counter >= title.length) {
      counter = 0;
    }
  }, interval);
};
