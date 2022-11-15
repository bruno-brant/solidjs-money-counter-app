/**
 * The result of a prediction.
 */
export interface ProcessingResult {
	/** Bounding boxes of the prediction, each in the  */
	boxes: [xmin: number, ymin: number, xmax: number, ymax: number][];
	labels: number[];
	scores: number[];
}

/** Simplifies interacting with the backend. */
export class Predictor {
	/**
	 * Initializes a new instance of the {@link Predictor} class.
	 * @param baseUrl The base url of the backend.
	 */
	constructor(private baseUrl: string) {
		console.log(`Intialized predictor with base url ${baseUrl}`);
	}

	public async process(imageBase64: string) {
		const result = await fetch(`${this.baseUrl}/predict`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				image: imageBase64
			}),
		})

		if (!result.ok) {
			throw new Error("Failed to predict the image");
		}

		return await result.json();
	}
}
