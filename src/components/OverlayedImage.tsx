import { createEffect } from "solid-js";
import Box from "@suid/material/Box";
import { mergeProps } from "solid-js";

/**
 * A bounding box to be draw.
 */
export interface BoundingBox {
	/**
	 * X,Y of the top left vertex of the bounding box of the coin
	 * @remarks
	 * Coordinates are in absolute pixels, not relative to the image size
	 */
	topLeft: [number, number];

	/**
	 * X,Y of the bottom right vertex of the bounding box of the coin
	 * 
	 * @remarks
	 * Coordinates are in absolute pixels, not relative to the image size
	 */
	bottomRight: [number, number];

	/** The text to be displayed above the bounding box. */
	text: string;
}

/** 
 * Props for component {@link OverlayedImage}
 */
export interface ImageWithBoundingBoxes {
	/** The image source over which we will draw the bounding boxes. */
	src: string;
	/** The coins to draw on the image */
	boundingBoxes: BoundingBox[]

	/** Color of the outline of the bouding box */
	outlineColor?: CanvasRenderingContext2D["strokeStyle"];

	/** Thickness of the outline of the bounding box */
	outlineThickness?: CanvasRenderingContext2D["lineWidth"];

	/** Color of the inside of the bounding box. Use transparency for a good effect. */
	fillColor?: CanvasRenderingContext2D["fillStyle"];

	/** Color of the text inside the bounding box */
	textColor?: CanvasRenderingContext2D["fillStyle"];

	/** Family of the font of the text inside the bounding box. */
	fontFamily?: string;
}

/**
 * A canvas element that draws an image and overlays detected coins on top of it.
 * @param param0 Props for the component {@link OverlayedImage}
 */
export function OverlayedImage(props_: ImageWithBoundingBoxes) {
	let canvas: HTMLCanvasElement;

	const props = mergeProps({
		outlineColor: "red",
		outlineThickness: 2,
		fillColor: "rgba(255, 0, 0, 0.2)",
		textColor: "red",
		fontFamily: "arial"
	}, props_);

	createEffect(() => {
		console.log("Drawing bounding boxes...");
		const ctx = canvas.getContext("2d");

		if (!ctx) throw new Error("Can't load canvas context");

		const img = new Image();
		img.src = props.src;

		const boundingBoxes = props.boundingBoxes;

		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;

			ctx.drawImage(img, 0, 0);

			for (const { topLeft, bottomRight, text } of boundingBoxes) {
				const [xmin, ymin, xmax, ymax] = [...topLeft, ...bottomRight];

				// Draw the outline of the bounding box
				ctx.strokeStyle = props.outlineColor!;
				ctx.lineWidth = props.outlineThickness;
				ctx.strokeRect(xmin, ymin, xmax - xmin, ymax - ymin);

				// Fill it with a transparent red
				ctx.fillStyle = props.fillColor;
				ctx.fillRect(xmin, ymin, xmax - xmin, ymax - ymin);

				// Write the value inside the image, centered
				// Define the font size based on the size of the bounding box
				ctx.font = `${Math.min(xmax - xmin, ymax - ymin) / 2}px ${props.fontFamily}`;
				ctx.fillStyle = props.textColor;
				ctx.textAlign = "center";
				// Align vertically the text in the middle of the bounding box
				ctx.textBaseline = "middle";
				// The magic number here is to cause a small shift down of the text, because it's otherwise misaligned
				ctx.fillText(text, (xmin + xmax) / 2, ((ymin + ymax) / 2) * 1.005);
			}
		};
		console.log("Done drawing bounding boxes...");
	});

	return <>
		<Box>
			<canvas ref={el => canvas = el} style={{ width: "100%", height: "100%" }} />
		</Box>
	</>;
}
