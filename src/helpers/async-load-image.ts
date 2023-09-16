/**
 * Load an image from a given URL
 *
 * @param {string} url The URL of the image resource
 * @returns {Promise<HTMLImageElement>} The loaded image
 */
export const asyncLoadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
};
