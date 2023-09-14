import { MarqueeTitleProps } from "./Interfaces/MarqueeTitleProps";
import { saveOriginalTitle } from "./helpers/saveOriginalTitle";
import { resetTitle } from "./resetTitle";

/**
 * Marquee the page title.
 *
 * @param title Page title to marquee
 * @param param0 Title marquee props
 * @param param0.interval Marquee interval, how long to wait between scrolling letters (in milliseconds)
 * @returns Interval ID
 */
export const marqueeTitle = ({ title, interval = 300 }: MarqueeTitleProps) => {
  resetTitle();
  saveOriginalTitle();
  const fixedTitle = `${title.trim()} `;
  let counter = 0;
  const titleInterval = setInterval(() => {
    let newTitle = `${fixedTitle.substring(
      counter,
      fixedTitle.length,
    )} ${fixedTitle.substring(0, counter)}`;
    counter++;
    if (counter >= fixedTitle.length) {
      counter = 0;
    }

    // If the first character is a space, just remove it and advance the counter since document title strips
		// any preceding spaces. Also we need to advance the counter since we're removing a character, otherwise
		// the animations seems to hang on the first letter of the word for 1 interval tick.
    if (newTitle[0] === " ") {
      newTitle = `${newTitle.substring(1, newTitle.length)}`;
      counter++;
    }

    // requestAnimationFrame(() => {
      document.title = newTitle;
    // });
  }, interval);

  window.TabkyJs.marqueeTitleInterval = titleInterval;

  return interval;
};
