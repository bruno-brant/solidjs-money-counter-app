import { createEffect, createSignal, JSX } from "solid-js";
import { callOrAssign } from "../utils";

/**
 * Props for the Video component
 */
type VideoProps = {
	/** Stream to set the video src to. */
	stream?: MediaStream;
	/** Gets a ref to the <video> element. */
	videoRef: JSX.VideoHTMLAttributes<HTMLVideoElement>["ref"];
	/** Called when the video has been initialized */
	onInitialized?: (success: boolean) => void;
	/** Whether the video is paused or not. */
	isPaused: boolean;
} & JSX.VideoHTMLAttributes<HTMLVideoElement>

/**
 * Facilitator to set a srcObject to a \<video\> element
 * @param {VideoProps} props Props for the element 
 */
export function Video(props: VideoProps) {
	const [myVideoRef, setMyVideoRef] = createSignal<HTMLVideoElement>();

	createEffect(() => {
		const videoRef = myVideoRef();

		if (!(videoRef && props.stream)) return;

		console.log("Video: setting videoRef");

		videoRef.srcObject = props.stream;

		props.onInitialized?.(true);
	});

	// Apply pause when video is set to pause.
	createEffect(() => {
		const videoRef = myVideoRef();

		if (!(videoRef && props.stream)) return;

		if (videoRef.paused != props.isPaused) {
			if (props.isPaused) {
				videoRef.pause();
			} else {
				videoRef.play();
			}
		}
	});

	return <video ref={el => { setMyVideoRef(el); if (props.videoRef) callOrAssign(props.videoRef, el); }} {...props} />;
}
