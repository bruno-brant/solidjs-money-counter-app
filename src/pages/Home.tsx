import { createResource, createSignal, Match, Show, Switch } from "solid-js";
import { ImageCapture } from "../components/ImageCapture";
import { DrawImage } from "../components/DrawImage";
import { ImageDetails } from "../components/ImageDetails";
import { Predictor } from "../lib/Predictor";
import { ScoreSlider } from "../components/ScoreSlider";

/** Props for the component {@link Home} */
export interface HomeProps {

}

/**
 * Possible states of the {@link Home} component.
 */
enum HomeState {
	/** Capturing a picture */
	Capture,
	/** Result of the picture */
	Result
}

export function Home({}: HomeProps) {
	const [state, setState] = createSignal(HomeState.Capture);
	const [picture, setPicture] = createSignal<string | null>(null);
	const predictor = new Predictor(import.meta.env.VITE_BACKEND_BASE_URL);

	function pictureTaken(picture: string) {
		setPicture(picture);
		setState(HomeState.Result);
	}

	const [data] = createResource(picture, async (pic) => {
		if (!pic) throw new Error("picture is null or undefined, can't process");

		const base64 = pic.split(',')[1];
		return predictor.process(base64);
	});

	const [minScore, setMinScore] = createSignal(0.3);

	return <>
		<Show when={state() === HomeState.Capture}>
			<ImageCapture onPictureTaken={pictureTaken} />
		</Show>
		<Show when={state() === HomeState.Result}>
			<Switch fallback={<span>⏳ Processing picture...</span>}>
				<Match when={data.state === "errored"}>
					<span>❌ Failed to process picture: {data.error.match}</span>
				</Match>
				<Match when={data.state === "ready"}>
					<div>
						<DrawImage pictureDataUrl={picture()!} data={data()} minScore={minScore} />
						<ScoreSlider minScore={[minScore, setMinScore]} />
						<ImageDetails data={data()} minScore={minScore()} />
						<button onClick={() => setState(HomeState.Capture)}>📷 Take another picture!</button>
					</div>
				</Match>
			</Switch>
		</Show>
	</>
}
