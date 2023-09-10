/**
 * Saves the original title if we don't already have a reference to it.
 *
 * @param title The title URL or emoji.
 * @returns
 */
export const saveOriginalTitle = () => {
  if (window.AnnoyingFavicon.originalTitle === undefined) {
    window.AnnoyingFavicon.originalTitle = document.title;
  }
};
