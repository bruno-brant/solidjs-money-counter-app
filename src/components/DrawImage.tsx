import { Accessor, createEffect } from "solid-js";
import { zip } from "../utils";
import { ProcessingResult } from "../lib/Predictor";
import Box from "@suid/material/Box";

/** 
 * Props for component {@link DrawImage}
 */
export interface DrawImageProps {
	pictureDataUrl: string;
	data: ProcessingResult
	minScore: Accessor<number>;
}

/**
 * Draws a image with the bounding boxes.
 * @param param0 Props for the component {@link DrawImage}
 */
export function DrawImage(props: DrawImageProps) {
	let canvas: HTMLCanvasElement;

	createEffect(() => {
		const ctx = canvas.getContext("2d");

		if (!ctx) {
			throw new Error("Can't load canvas context");
		}

		const img = new Image();
		const min = props.minScore();

		img.src = props.pictureDataUrl;
		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;

			ctx.drawImage(img, 0, 0);

			ctx.strokeStyle = "#FF0000";
			ctx.lineWidth = 2;

			for (const [box, label, score] of zip(props.data.boxes, props.data.labels, props.data.scores)) {
				const [xmin, ymin, xmax, ymax] = box;
				if (score >= min) {
					ctx.strokeRect(xmin, ymin, xmax - xmin, ymax - ymin);
					ctx.fillText(`${label} (${score})`, xmin, ymin);
				}
			}
		};
	});

	return <>
		<Box>
			<canvas ref={el => canvas = el} style={{ width: "100%", height: "100%" }} />
		</Box>
	</>;
}
