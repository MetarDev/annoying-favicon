import { swapFavicon } from "./swapFavicon";
import { swapTitle } from "./swapTitle";
import { marqueeTitle } from "./marqueeTitle";
import { AnnoyingFavicon } from "./Interfaces/AnnoyingFavicon";
import { resetTitle } from "./resetTitle";
import { resetFavicon } from "./resetFavicon";

declare global {
	interface Window { AnnoyingFavicon: AnnoyingFavicon; }
}

window.AnnoyingFavicon = window.AnnoyingFavicon || {};

export {
	swapFavicon,
	swapTitle,
	resetTitle,
	resetFavicon,
	marqueeTitle,
}
