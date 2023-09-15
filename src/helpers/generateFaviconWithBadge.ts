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

  // Draw the circle badge, 25% the size of the favicon, at the top right corner.
	const dotRadius = size / 4;
  context.beginPath();
  context.arc(size - dotRadius, dotRadius, dotRadius, 0, 2 * Math.PI, false);
  context.fillStyle = dotColor;
  context.fill();

  // Draw the inner circle badge, 25% the size of the favicon, inside the circle badge.
	const innerDotRadius = dotRadius / 4;
  context.beginPath();
	context.arc(size - dotRadius, dotRadius, innerDotRadius, 0, 2 * Math.PI, false);
  context.fillStyle = innerDotColor;
  context.fill();

  return canvas.toDataURL("image/png");
};
