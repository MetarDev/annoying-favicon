/**
 * Resets the title to the original.
 *
 * @returns {void}
 */
export const resetTitle = () => {
  if (
    window.TabGoesBrrr.originalTitle &&
    window.TabGoesBrrr.originalTitle !== document.title
  ) {
    document.title = window.TabGoesBrrr.originalTitle;
  }

	if (window.TabGoesBrrr.marqueeTitleInterval) {
		clearInterval(window.TabGoesBrrr.marqueeTitleInterval);
		window.TabGoesBrrr.marqueeTitleInterval = null;
	}
};
