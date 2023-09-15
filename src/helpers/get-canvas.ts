export const getCanvas = (size = 32) => {
  let canvas: HTMLCanvasElement|null = document.querySelector(`#canvas-${size}`);

	if (!canvas) {
		canvas = document.createElement("canvas");
		canvas.id = `canvas-${size}`;
		canvas.width = size;
		canvas.height = size;
		canvas.style.display = "none";
		document.body.appendChild(canvas);
	} else {
		// clear canvas
		const context = canvas.getContext("2d");
		context?.clearRect(0, 0, canvas.width, canvas.height);
	}

	return canvas;
}
