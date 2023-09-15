import {
  GenerateFaviconWithBadgeProps,
  generateFaviconWithBadge,
} from "./helpers/generateFaviconWithBadge";
import { saveOriginalFavicon } from "./helpers/saveOriginalFavicon";
import { resetFavicon } from "./resetFavicon";
import { swapFavicon } from "./swapFavicon";

/**
 * Adds a badge to favicon
 *
 * @param param0 Add badge props
 * @param param0.dotColor The color of the badge. Can be any valid CSS color.
 */
export const addBadge = ({
	type,
  dotColor = "#ff0000",
	innerDotColor = "#ffffff",
  position = "top-right",
}: GenerateFaviconWithBadgeProps) => {
  const links = document.querySelectorAll("link[rel='icon']");
  resetFavicon();

  links.forEach((link: any) => {
    saveOriginalFavicon(link);

		generateFaviconWithBadge(link, { type, dotColor, innerDotColor, position }).then((favicon) => {
			swapFavicon({ favicon });
		});
  });
};
