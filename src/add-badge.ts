import {
  GenerateFaviconWithBadgeProps,
  generateFaviconWithBadge,
} from "./helpers/generate-favicon-with-badge";
import { saveOriginalFavicon } from "./helpers/save-original-favicon";
import { resetFavicon } from "./reset-favicon";
import { swapFavicon } from "./swap-favicon";

/**
 * Adds a badge to favicon
 *
 * @param param0 Add badge props
 * @param {string} param0.type Type of badge. Available options are 'dot' and 'count'.
 * @param {number|null} [param0.count] Number to show in the badge. Only used when type is 'count'.
 * @param {string} [param0.size] Size of badge. Available options: "xs" | "sm" | "md" | "lg" | "full";
 * @param {string} [param0.font] Override font for the count. Only used when type is 'count'.
 * @param {string} [param0.dotColor] Any valid CSS color for the dot.
 * @param {string} [param0.innerDotColor] Any valid CSS color for the inner dot. Only used when type is 'dot'.
 * @param {string} [param0.countColor] Any valid CSS color for the count. Only used when type is 'count'.
 * @param {string} [param0.position] Position of the badge. Available options: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
 * @returns {void}
 */
export const addBadge = (props: GenerateFaviconWithBadgeProps) => {
  const links = document.querySelectorAll("link[rel='icon']");
  resetFavicon();

  links.forEach((link: any) => {
    saveOriginalFavicon(link);

    generateFaviconWithBadge(link, { ...props }).then((favicon) => {
      swapFavicon({ favicon });
    });
  });
};
