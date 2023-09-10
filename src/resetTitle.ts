/**
 * Resets the title to the original.
 *
 * @returns {void}
 */
export const resetTitle = () => {
  if (
    window.AnnoyingFavicon.originalTitle &&
    window.AnnoyingFavicon.originalTitle !== document.title
  ) {
    document.title = window.AnnoyingFavicon.originalTitle;
  }
};
