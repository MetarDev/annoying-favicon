import { swapFavicon } from "./swapFavicon";
import { swapTitle } from "./swapTitle";
import { marqueeTitle } from "./marqueeTitle";
import { TabGoesBrrr } from "./Interfaces/TabGoesBrrr";
import { resetTitle } from "./resetTitle";
import { resetFavicon } from "./resetFavicon";

declare global {
  interface Window {
    TabGoesBrrr: TabGoesBrrr;
  }
}

window.TabGoesBrrr = window.TabGoesBrrr || {
  originalTitle: document.title,
  focusCallbacks: [],
  blurCallbacks: [],
	marqueeTitleInterval: null,
};

window.addEventListener("focus", () => {
  window.TabGoesBrrr.focusCallbacks.forEach((callback, i) => {
    callback();
  });
});

window.addEventListener("blur", () => {
  window.TabGoesBrrr.blurCallbacks.forEach((callback, i) => {
    callback();
  });
});

export { swapFavicon, swapTitle, resetTitle, resetFavicon, marqueeTitle };
