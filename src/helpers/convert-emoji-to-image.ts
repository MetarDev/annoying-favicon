import { getCanvas } from "./get-canvas";

export const convertEmojiToImage = (emoji: string, size = 32) => {
  const canvas = getCanvas(size);
  const context = canvas.getContext("2d");

	// Drawing the emoji this way makes it a bit bigger then drawing it as an SVG.
	// By adding an offset, we can make it roughly same size as the SVG version.
	const offset = 3;

	if (!context) {
		return '';
	}

  context.font = `${size - offset}px serif`;
  context.textAlign = "right";
  context.textBaseline = "bottom";
  context.fillText(emoji, size - offset, size);

	return canvas.toDataURL('image/png');
};
