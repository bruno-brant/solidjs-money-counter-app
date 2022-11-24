import { timeout } from "../utils";

export interface DetectedCoin {
	/** Percentage of confidence in the result */
	score: number;
	/** Monetary value of the coin */
	value: number;
	/** Description of the coin */
	description: string;
	/** The bounding box of the coin in the image */
	boundingBox: {
		/** 
		 * X,Y of the top left vertex of the bounding box of the coin 
		 * 
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
	}
}

/**
 * The result of a prediction.
 */
export interface ProcessingResult {
	/** Bounding boxes of the prediction, each in the  */
	data: {
		/** Name of the model that processed this image */
		model: string;
		/** Details of the  image that was processed */
		image: {
			/** Format of the image when it was received */
			format: string;
			mode: string;
			/** Size of the image */
			size: {
				/** The height of the image, in pixels */
				height: number;
				/** The width of the image, in pixels */
				width: number;
			}
		},
		/** List of coins that were detected in the image */
		coins: DetectedCoin[],
	}
}

/** Simplifies interacting with the backend. */
export class Predictor {
	/**
	 * Initializes a new instance of the {@link Predictor} class.
	 * @param baseUrl The base url of the backend.
	 */
	constructor(private baseUrl: string) { }

	/**
	 * Process an image and gets the detected coins.
	 * @param imageBase64 The base64 encoded image to process.
	 * @returns Asyncronously returns the result of the prediction.
	 */
	@timeout(10_000)
	public async process(imageBase64: string): Promise<ProcessingResult> {
		const result = await fetch(`${this.baseUrl}/v1/predict`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				image: imageBase64
			}),
		});

		if (!result.ok) {
			throw new Error("Failed to predict the image");
		}

		return await result.json();
	}
}
