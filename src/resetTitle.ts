/**
 * Resets the title to the original.
 *
 * @returns {void}
 */
export const resetTitle = () => {
  if (
    window.TabkyJs.originalTitle &&
    window.TabkyJs.originalTitle !== document.title
  ) {
    document.title = window.TabkyJs.originalTitle;
  }

	if (window.TabkyJs.marqueeTitleInterval) {
		clearInterval(window.TabkyJs.marqueeTitleInterval);
		window.TabkyJs.marqueeTitleInterval = null;
	}
};
