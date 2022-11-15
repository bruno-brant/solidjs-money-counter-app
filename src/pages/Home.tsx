import { createResource, createSignal, Match, Show, Switch } from "solid-js";
import { ImageCapture } from "../components/ImageCapture";
import { DrawImage } from "../components/DrawImage";
import { ImageDetails } from "../components/ImageDetails";
import { Predictor } from "../lib/Predictor";
import { ScoreSlider } from "../components/ScoreSlider";
import Alert from "@suid/material/Alert";
import Stack from "@suid/material/Stack";
import AddAPhotoIcon from "@suid/icons-material/AddAPhoto";
import { MyIconButton } from "../components/MyIconButton";

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

	const [data] = createResource(picture, async (pic) => {
		if (!pic) throw new Error("picture is null or undefined, can't process");

		const base64 = pic.split(",")[1];
		return predictor.process(base64);
	});

	const [score, setScore] = createSignal(0.5);

	return <>
		<Show when={state() === HomeState.Capture}>
			<ImageCapture onPictureTaken={pictureTaken} />
		</Show>
		<Show when={state() === HomeState.Result}>
			<Switch fallback={<span>⏳ Processing picture...</span>}>
				<Match when={data.state === "errored"}>
					<Alert severity='error'>Failed to process picture {data.error.match ? ":" : ""}{data.error.match}</Alert>
				</Match>
				<Match when={data.state === "ready"}>
					<Stack spacing={1}>
						<DrawImage pictureDataUrl={picture()!} data={data()} minScore={score} />
						<ScoreSlider score={[score, setScore]} />
						<ImageDetails data={data()} minScore={score()} />
						<MyIconButton icon={<AddAPhotoIcon fontSize="large" />} onClick={() => setState(HomeState.Capture)} text="Tirar outra!" />
					</Stack>
				</Match>
			</Switch>
		</Show>
	</>;
}
