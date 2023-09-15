import { swapFavicon } from "./swap-favicon";
import { swapTitle } from "./swap-title";
import { marqueeTitle } from "./marquee-title";
import { resetTitle } from "./reset-title";
import { resetFavicon } from "./reset-favicon";
import { addBadge } from "./add-badge";

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
	addBadge,
  TabkyJs,
};
