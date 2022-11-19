import { createMemo, createResource, createSignal, Match, Show, Switch } from "solid-js";
import { ImageCapture } from "../components/ImageCapture";
import { DrawImage } from "../components/DrawImage";
import { ImageDetails } from "../components/ImageDetails";
import { Predictor } from "../lib/Predictor";
import { ScoreSlider } from "../components/ScoreSlider";
import Alert from "@suid/material/Alert";
import Stack from "@suid/material/Stack";
import AddAPhotoIcon from "@suid/icons-material/AddAPhoto";
import { MyIconButton } from "../components/MyIconButton";
import { DebugBox } from "../components/Debugging";

/**
 * Possible states of the {@link Home} component.
 */
enum HomeState {
	/** Capturing a picture */
	Capture,
	/** Result of the picture */
	Result
}

export function Home() {
	const [state, setState] = createSignal(HomeState.Capture);
	const [picture, setPicture] = createSignal<string | null>(null);
	const predictor = new Predictor(import.meta.env.VITE_BACKEND_BASE_URL);

	function pictureTaken(picture: string) {
		setPicture(picture);
		setState(HomeState.Result);
	}

	const [detectionResult] = createResource(picture, async (pic) => {
		if (!pic) throw new Error("picture is null or undefined, can't process");

		const base64 = pic.split(",")[1];
		setMinScore(0.5);
		return await predictor.process(base64);
	});

	// The minimum score to consider a coin
	const [minScore, setMinScore] = createSignal(0.5);

	const coins = createMemo(() => {
		if (!detectionResult()) return [];

		console.log(`Beforing filtering: ${detectionResult()!.data.coins.length} coins`);
		
		const filtered = detectionResult()!.data.coins.filter(_ => _.score >= minScore());
		
		console.log(`After filtering: ${filtered.length} coins with score >= ${minScore()}`);
		
		return filtered;
	});

	return <>
		<DebugBox message={`URL: ${import.meta.env.VITE_BACKEND_BASE_URL}`} />
		<Show when={state() === HomeState.Capture}>
			<ImageCapture onPictureTaken={pictureTaken} />
		</Show>
		<Show when={state() === HomeState.Result}>
			<Switch fallback={<span>⏳ Processing picture...</span>}>
				<Match when={detectionResult.state === "errored"}>
					<Alert severity='error'>Failed to process picture {detectionResult.error.match ? ":" : ""}{detectionResult.error.match}</Alert>
				</Match>
				<Match when={detectionResult.state === "ready"}>
					<Stack spacing={1}>
						<DrawImage pictureDataUrl={picture()!} coins={coins} />
						<ScoreSlider score={minScore} setScore={setMinScore} />
						<ImageDetails coins={coins()} />
						<MyIconButton icon={<AddAPhotoIcon fontSize="large" />} onClick={() => setState(HomeState.Capture)} text="Tirar outra!" />
					</Stack>
				</Match>
			</Switch>
		</Show>
	</>;
}
