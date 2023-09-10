/**
 * Test if a string is a single emoji.
 *
 * @param maybeEmoji A string to test.
 * @returns
 */
export const isEmoji = (maybeEmoji: string) => {
  return maybeEmoji.match(/\p{Extended_Pictographic}/u) !== null;
};
