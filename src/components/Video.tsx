import { JSX, onMount } from "solid-js";
import { callOrAssign } from "../utils";

/**
 * Props for the Video component
 */
type VideoProps = {
	/** Stream to set the video src to. */
	stream?: MediaStream;
	/** Gets a ref to the <video> element. */
	videoRef: JSX.VideoHTMLAttributes<HTMLVideoElement>["ref"];
} & JSX.VideoHTMLAttributes<HTMLVideoElement>

/**
 * Facilitator to set a srcObject to a \<video\> element
 * @param {VideoProps} props Props for the element 
 */
export function Video(props: VideoProps) {
	let myVideoRef: HTMLVideoElement;
	
	onMount(() => {
		if (myVideoRef && props.stream) {
			myVideoRef.srcObject = props.stream;
		}
	});

	return <video ref={el => { myVideoRef = el; if (props.videoRef) callOrAssign(props.videoRef, el); }} {...props} />;
}
