export interface TabkyJs {
  originalTitle: string;
  focusCallbacks: CallableFunction[];
  blurCallbacks: CallableFunction[];
	marqueeTitleInterval: ReturnType<typeof setInterval>|null;
}
