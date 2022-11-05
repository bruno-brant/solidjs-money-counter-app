import { Accessor, createEffect, createMemo, createSignal, For, onMount } from "solid-js";
import { zip } from "../utils";
import { ProcessingResult } from "../lib/Predictor";

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
export function DrawImage({ pictureDataUrl, data, minScore }: DrawImageProps) {
	let canvas: HTMLCanvasElement;


	createEffect(() => {
		const ctx = canvas.getContext("2d");

		if (!ctx) {
			throw new Error("Can't load canvas context");
		}

		const img = new Image();
		const min = minScore();

		img.src = pictureDataUrl;
		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;

			ctx.drawImage(img, 0, 0);

			ctx.strokeStyle = "#FF0000";
			ctx.lineWidth = 2;

			for (const [box, label, score] of zip(data.boxes, data.labels, data.scores)) {
				const [xmin, ymin, xmax, ymax] = box;
				if (score >= min) {
					ctx.strokeRect(xmin, ymin, xmax - xmin, ymax - ymin);
					ctx.fillText(`${label} (${score})`, xmin, ymin);
				}
				// //ctx.strokeRect(xmin * img.width, ymin * img.height, (xmax - xmin) * img.width, (ymax - ymin) * img.height);
				// ctx.strokeRect(xmin, ymin, xmax - xmin, ymax - ymin);
			}
		}
	});

	const sum = createMemo(() => {
		return Array.from(zip(data.labels, data.scores))
			//.map(parseInt) // as ints
			.filter(([_, score]) => score >= minScore()) // filter by min score
			.map(([label, _]) => label)
			.reduce((a, b) => a + b, 0) // sum
	});

	return <div>
		<canvas ref={el => canvas = el} />
	</div>
}
