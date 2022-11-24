import { createMemo, createResource, createSignal, Match, Switch } from "solid-js";

import Alert from "@suid/material/Alert";
import Stack from "@suid/material/Stack";
import AddAPhotoIcon from "@suid/icons-material/AddAPhoto";

import { BoundingBox, OverlayedImage, DebugBox, MyIconButton, TextualSpinner } from "../../components/";
import { Predictor } from "../../lib/Predictor";

import { ImageCapture } from "./ImageCapture";
import { ImageDetails } from "./ImageDetails";
import { ScoreSlider } from "./ScoreSlider";

/**
 * Possible states of the {@link Counter} component.
 */
enum CounterState {
	/** Capturing a picture */
	Capture,
	/** Result of the picture */
	Result
}

export function Counter() {
	const [state, setState] = createSignal(CounterState.Capture);
	const [picture, setPicture] = createSignal<string | null>(null);
	const predictor = new Predictor(import.meta.env.VITE_BACKEND_BASE_URL);

	function pictureTaken(picture: string) {
		setPicture(picture);
		setState(CounterState.Result);
	}

	const [detectionResult] = createResource(picture, async (pic) => {
		if (!pic) throw new Error("picture is null or undefined, can't process");

		const base64 = pic.split(",")[1];

		setMinScore(0.7);

		return await predictor.process(base64);
	});

	// The minimum score to consider a coin
	const [minScore, setMinScore] = createSignal(0.5);

	const coins = createMemo(() => {
		if (detectionResult.state != "ready") return [];

		const detection = detectionResult();

		if (!detection) return [];

		console.log(`Beforing filtering: ${detection.data.coins.length} coins`);

		const filtered = detection.data.coins.filter(_ => _.score >= minScore());

		console.log(`After filtering: ${filtered.length} coins with score >= ${minScore()}`);

		return filtered;
	});

	function OverlayedImageBoundingBoxes(): BoundingBox[] {
		return coins().map(_ => ({
			text: _.value.toFixed(2),
			topLeft: _.boundingBox.topLeft,
			bottomRight: _.boundingBox.bottomRight,
		}));
	}

	return <>
		<DebugBox message={`URL: ${import.meta.env.VITE_BACKEND_BASE_URL}`} />
		<Switch fallback={<Alert severity="error">Error processing the image.</Alert>}>
			<Match when={state() === CounterState.Capture}>
				<ImageCapture onPictureTaken={pictureTaken} />
			</Match>
			<Match when={state() === CounterState.Result}>
				<Switch fallback={<TextualSpinner text="Processando a imagem..." />}>
					<Match when={detectionResult.state === "errored"}>
						<Alert severity='error'>Falha ao processar a imagem{detectionResult.error ? ":" : ""}{detectionResult.error}</Alert>
					</Match>
					<Match when={detectionResult.state === "ready"}>
						<Stack spacing={1}>
							<OverlayedImage src={picture()!} boundingBoxes={OverlayedImageBoundingBoxes()} />
							<ScoreSlider score={minScore} setScore={setMinScore} />
							<ImageDetails coins={coins()} />
							<MyIconButton icon={<AddAPhotoIcon fontSize="large" />} onClick={() => setState(CounterState.Capture)} text="Tirar outra!" />
						</Stack>
					</Match>
				</Switch>
			</Match>
		</Switch>
	</>;
}
