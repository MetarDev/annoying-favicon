import { swapFavicon } from "./swapFavicon";
import { swapTitle } from "./swapTitle";
import { marqueeTitle } from "./marqueeTitle";
import { TabkyJs } from "./Interfaces/TabkyJs";
import { resetTitle } from "./resetTitle";
import { resetFavicon } from "./resetFavicon";

declare global {
  interface Window {
    TabkyJs: TabkyJs;
  }
}

if (typeof window !== "undefined") {
	window.TabkyJs = window.TabkyJs || {
		originalTitle: document.title,
		focusCallbacks: [],
		blurCallbacks: [],
		marqueeTitleInterval: null,
	};

	window.addEventListener("focus", () => {
		window.TabkyJs.focusCallbacks.forEach((callback, i) => {
			callback();
		});
	});

	window.addEventListener("blur", () => {
		window.TabkyJs.blurCallbacks.forEach((callback, i) => {
			callback();
		});
	});
}

export { swapFavicon, swapTitle, resetTitle, resetFavicon, marqueeTitle };
