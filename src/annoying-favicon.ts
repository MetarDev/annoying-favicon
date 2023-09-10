import { swapFavicon } from "./swapFavicon";
import { swapTitle } from "./swapTitle";
import { marqueeTitle } from "./marqueeTitle";
import { AnnoyingFavicon } from "./Interfaces/AnnoyingFavicon";
import { resetTitle } from "./resetTitle";
import { resetFavicon } from "./resetFavicon";

declare global {
	interface Window { AnnoyingFavicon: AnnoyingFavicon; }
}

window.AnnoyingFavicon = window.AnnoyingFavicon || {
	originalTitle: document.title,
	focusCallbacks: [],
	blurCallbacks: [],
};

window.addEventListener('focus', () => {
	window.AnnoyingFavicon.focusCallbacks.forEach((callback, i) => {
		callback();
	});
});

window.addEventListener('blur', () => {
	window.AnnoyingFavicon.blurCallbacks.forEach((callback, i) => {
		callback();
	});
});

export {
	swapFavicon,
	swapTitle,
	resetTitle,
	resetFavicon,
	marqueeTitle,
}
