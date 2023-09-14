/**
 * Saves the original title of the document if it's not already set.
 *
 * @returns
 */
export const saveOriginalTitle = () => {
  if (!window.TabkyJs.originalTitle) {
    window.TabkyJs.originalTitle = document.title;
  }
};
