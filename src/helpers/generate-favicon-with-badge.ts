import { asyncLoadImage } from "./async-load-image";
import { getCanvas } from "./get-canvas";

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HSL = `hsl(${number}, ${number}%, ${number}%)`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX | HSL;

export interface GenerateFaviconWithBadgeProps {
  type: "dot" | "count";
  count?: number | null;
  size?: "xs" | "sm" | "md" | "lg" | "full";
  font?: string;
  dotColor?: Color;
  innerDotColor?: Color;
  countColor?: Color;
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center";
}

/**
 * Converts the size prop to a percentage.
 *
 * @param size Size value to convert.
 * @param faviconSize The size of the favicon. Used to calculate the font-size, normalized to 32px
 * @returns { dot: number, fontSize: number }
 */
const convertSize = (
  size: GenerateFaviconWithBadgeProps["size"] = "md",
  faviconSize: number,
) => {
  const multiplierFromSize = faviconSize / 32;
  switch (size) {
    case "xs":
      return {
        dot: 0.2,
        fontSize: 14 * multiplierFromSize,
      };
    case "sm":
      return {
        dot: 0.25,
        fontSize: 18 * multiplierFromSize,
      };
    case "md":
      return {
        dot: 0.3,
        fontSize: 20 * multiplierFromSize,
      };
    case "lg":
      return {
        dot: 0.35,
        fontSize: 24 * multiplierFromSize,
      };
    case "full":
      return {
        dot: 0.5,
        fontSize: 32 * multiplierFromSize,
      };
  }
};

export const generateFaviconWithBadge = async (
  link: HTMLLinkElement,
  {
    type,
    count = null,
    size = "md",
    font = "sans-serif",
    dotColor = "#ff0000",
    innerDotColor = "#ffffff",
    countColor = "#ffffff",
    position = "top-right",
  }: GenerateFaviconWithBadgeProps,
) => {
  // Try to read size from favicon link. Use last size. If doesn't exist or "any", assume 32x32px
  // sizes = "16x16px"
  // sizes = "16x16px 32x32px"
  // sizes = "any"
  // sizes = undefined.
  let faviconSize = 32;
  if (link.sizes.toString() && link.sizes.toString() !== "any") {
    const sizes = link.sizes.toString().split(" ");
    const lastSize = sizes[sizes.length - 1];

    if (lastSize) {
      const lastSizeParts = lastSize.split("x");
      const width = parseInt(lastSizeParts[0], 10);
      faviconSize = width > 0 ? width : faviconSize;
    }
  }

  const canvas = getCanvas(faviconSize);
  const context = canvas.getContext("2d");

  if (!context) {
    return "";
  }

  // Clear canvas
  context?.clearRect(0, 0, canvas.width, canvas.height);

  const faviconImage = await asyncLoadImage(link.href);

  // Draw image first
  context.drawImage(
    faviconImage,
    0,
    0,
    faviconSize,
    faviconSize,
    0,
    0,
    faviconSize,
    faviconSize,
  );

  // Determine the circle position based on the position prop and the circle size.
  const dotRadius = faviconSize * convertSize(size, faviconSize).dot;
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
      x = faviconSize - dotRadius;
      y = dotRadius;
      innerX = x;
      innerY = y;
      break;
    case "bottom-left":
      x = dotRadius;
      y = faviconSize - dotRadius;
      innerX = x;
      innerY = y;
      break;
    case "bottom-right":
      x = faviconSize - dotRadius;
      y = faviconSize - dotRadius;
      innerX = x;
      innerY = y;
      break;
    case "center":
      x = faviconSize / 2;
      y = faviconSize / 2;
      innerX = x;
      innerY = y;
      break;
  }

  // Draw the circle badge on the x,y coordinates.
  context.beginPath();
  context.arc(x, y, dotRadius, 0, 2 * Math.PI, false);
  context.fillStyle = dotColor;
  context.fill();

  // Draw the inner circle badge, inside the circle badge on innerX, innerY coordinate. Only for dots
  if (type === "dot") {
    context.beginPath();
    context.arc(innerX, innerY, innerDotRadius, 0, 2 * Math.PI, false);
    context.fillStyle = innerDotColor;
    context.fill();
  }

  // Draw the count text, inside the circle badge on innerX, innerY coordinate. Only for count.
  if (type === "count" && count !== null) {
    context.font = `${convertSize(size, faviconSize).fontSize}px ${font}`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = countColor;
    context.fillText(count.toString(), innerX, innerY);
  }

  return canvas.toDataURL("image/png");
};
