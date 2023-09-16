export const getCanvas = (size = 32): HTMLCanvasElement => {
	const sizeString = size.toString();
	if (window?.TabkyJs?.canvas[sizeString]) {
		return window.TabkyJs.canvas[sizeString];
	}
	
	let canvas: HTMLCanvasElement|null = document.querySelector(`#canvas-${size}`);
	if (!canvas) {
		canvas = document.createElement("canvas");
		canvas.id = `canvas-${size}`;
		canvas.width = size;
		canvas.height = size;
		canvas.style.display = "none";
		document.body.appendChild(canvas);
	}

	window.TabkyJs.canvas[sizeString] = canvas;
	return canvas;
}
