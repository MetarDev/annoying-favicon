/**
 * Saves the original title of the document if it's not already set.
 *
 * @returns
 */
export const saveOriginalTitle = () => {
  if (!window.TabGoesBrrr.originalTitle) {
    window.TabGoesBrrr.originalTitle = document.title;
  }
};
