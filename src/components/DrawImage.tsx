import { Accessor, createEffect, For } from "solid-js";
import { DetectedCoin } from "../lib/Predictor";
import Box from "@suid/material/Box";

/** 
 * Props for component {@link DrawImage}
 */
export interface DrawImageProps {
	pictureDataUrl: string;
	coins: Accessor<DetectedCoin[]>
}

/**
 * Draws a image with the bounding boxes.
 * @param param0 Props for the component {@link DrawImage}
 */
export function DrawImage(props: DrawImageProps) {
	let canvas: HTMLCanvasElement;

	createEffect(() => {
		console.log("Drawing bounding boxes...");
		const ctx = canvas.getContext("2d");

		if (!ctx) throw new Error("Can't load canvas context");

		const img = new Image();
		img.src = props.pictureDataUrl;

		const coins = props.coins();

		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;

			ctx.drawImage(img, 0, 0);

			ctx.strokeStyle = "#FF0000";
			ctx.lineWidth = 2;
			ctx.fillStyle = "#FF000030";

			for (const {boundingBox, value} of coins) {
				const [xmin, ymin, xmax, ymax] = [...boundingBox.topLeft, ...boundingBox.bottomRight];
				
				ctx.strokeRect(xmin, ymin, xmax - xmin, ymax - ymin);
				ctx.fillRect(xmin, ymin, xmax - xmin, ymax - ymin);
				// Draw the value inside the image, centered
				// Define the font size based on the size of the bounding box
				ctx.font = `${Math.min(xmax - xmin, ymax - ymin) / 2}px Arial`;
				ctx.fillStyle = "#FF0000";
				ctx.textAlign = "center";
				// Align vertically the text in the middle of the bounding box
				ctx.textBaseline = "middle";
				ctx.fillText(value.toString(), (xmin + xmax) / 2, ((ymin + ymax) / 2) * 1.005);
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
