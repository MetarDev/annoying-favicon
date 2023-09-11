/**
 * Resets the favicon to the original.
 *
 * @returns {void}
 */
export const resetFavicon = () => {
  document.querySelectorAll("link[rel='icon']").forEach((link: any) => {
    link.href = link.getAttribute("data-original-href") || link.href;
  });
};
