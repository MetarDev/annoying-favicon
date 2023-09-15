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
 * @param param0.dotColor The color of the badge. Can be any valid CSS color.
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
