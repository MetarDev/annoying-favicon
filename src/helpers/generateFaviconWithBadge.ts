import { asyncLoadImage } from "./asyncLoadImage";
import { getCanvas } from "./getCanvas";

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HSL = `hsl(${number}, ${number}%, ${number}%)`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX | HSL;

export interface GenerateFaviconWithBadgeProps {
  type: "dot" | "count";
  dotColor: Color;
	innerDotColor: Color;
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center";
}

export const generateFaviconWithBadge = async (
  link: HTMLLinkElement,
  { dotColor, innerDotColor, position, type }: GenerateFaviconWithBadgeProps,
) => {
  // Try to read size from favicon link. Use last size. If doesn't exist or "any", assume 32x32px
  // sizes = "16x16px"
  // sizes = "16x16px 32x32px"
  // sizes = "any"
  // sizes = undefined.
  let size = 32;
  if (link.sizes.toString() && link.sizes.toString() !== "any") {
    const sizes = link.sizes.toString().split(" ");
    const lastSize = sizes[sizes.length - 1];

    if (lastSize) {
      const lastSizeParts = lastSize.split("x");
      const width = parseInt(lastSizeParts[0], 10);
      size = width > 0 ? width : size;
    }
  }

  const canvas = getCanvas(size);
  const context = canvas.getContext("2d");

  if (!context) {
    return "";
  }

  const faviconImage = await asyncLoadImage(link.href);

  // Draw image first
  context.drawImage(faviconImage, 0, 0, size, size, 0, 0, size, size);

	// Determine the circle position based on the position prop and the circle size.
	const dotRadius = size / 4;
	const innerDotRadius = dotRadius / 4;
	let x = 0;
	let y = 0;
	let innerX = 0;
	let innerY = 0;
	switch (position) {
		case "top-left":
			x = dotRadius;
			y = dotRadius;
			innerX = x;
			innerY = y;
			break;
		case "top-right":
			x = size - dotRadius;
			y = dotRadius;
			innerX = x;
			innerY = y;
			break;
		case "bottom-left":
			x = dotRadius;
			y = size - dotRadius;
			innerX = x;
			innerY = y;
			break;
		case "bottom-right":
			x = size - dotRadius;
			y = size - dotRadius;
			innerX = x;
			innerY = y;
			break;
		case "center":
			x = size / 2;
			y = size / 2;
			innerX = x;
			innerY = y;
			break;
	}

  // Draw the circle badge on the x,y coordinates.
  context.beginPath();
	context.arc(x, y, dotRadius, 0, 2 * Math.PI, false);
  context.fillStyle = dotColor;
  context.fill();

  // Draw the inner circle badge, inside the circle badge on innerX, innerY coordinate.
  context.beginPath();
	context.arc(innerX, innerY, innerDotRadius, 0, 2 * Math.PI, false);
  context.fillStyle = innerDotColor;
  context.fill();

  return canvas.toDataURL("image/png");
};
