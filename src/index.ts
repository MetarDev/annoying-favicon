import { swapFavicon } from "./swapFavicon";
import { swapTitle } from "./swapTitle";
import { marqueeTitle } from "./marqueeTitle";
import { resetTitle } from "./resetTitle";
import { resetFavicon } from "./resetFavicon";

interface TabkyJs {
  originalTitle: string;
  focusCallbacks: CallableFunction[];
  blurCallbacks: CallableFunction[];
  marqueeTitleInterval: ReturnType<typeof setInterval> | null;
}

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
    window.TabkyJs.focusCallbacks.forEach((callback: CallableFunction) => {
      callback();
    });
  });

  window.addEventListener("blur", () => {
    window.TabkyJs.blurCallbacks.forEach((callback: CallableFunction) => {
      callback();
    });
  });
}

export {
  swapFavicon,
  swapTitle,
  resetTitle,
  resetFavicon,
  marqueeTitle,
  TabkyJs,
};
