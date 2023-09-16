import { saveOriginalTitle } from "./helpers/save-original-title";
import { resetTitle } from "./reset-title";

export interface MarqueeTitleProps {
  title: string;
  interval?: number;
}

/**
 * Marquee the page title.
 *
 * @param {Object} param0 Title marquee props
 * @param {string} param0.title Page title to marquee.
 * @param {number} [param0.interval] Marquee interval, how long to wait between scrolling letters (in milliseconds)
 * @returns {Interval}
 */
export const marqueeTitle = ({
  title,
  interval = 300,
}: MarqueeTitleProps): ReturnType<typeof setInterval> => {
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

    document.title = newTitle;
  }, interval);

  window.TabkyJs.marqueeTitleInterval = titleInterval;

  return titleInterval;
};
