import { JSX, createResource, Show, } from "solid-js";
import { Video } from "./Video";

/** 
 * Props for the {@link CameraVideo} component.
 */
export interface CameraVideoProps {
	/** Gets a ref to the \<video\> element. */
	videoRef?: JSX.VideoHTMLAttributes<HTMLVideoElement>["ref"];
	/** Informs the result of camera initalization. */
	onCameraInitialized?(success: boolean): void;
}

/**
 * Display video from a camera.
 * @returns The CameraVideo component.
 */
export function CameraVideo({ videoRef, onCameraInitialized }: CameraVideoProps) {
	const [data] = createResource(() => navigator.mediaDevices.getUserMedia({ video: true, audio: false }))

	if (onCameraInitialized) {
		if (data.error) {
			onCameraInitialized(false);
		} else if (!data.loading) {
			onCameraInitialized(true);
		}
	}

	return <div class="camera-video">
		<div class="message">
			<Show when={data.error}>
				<span>❌ Error initializing camera!</span>
			</Show>
			<Show when={data.loading}>
				<span>⏳ Initializing camera...</span>
			</Show>
		</div>
		<div class="video-container">
			<Show when={!data.loading && !data.error && data() != null}>
				<Video videoRef={videoRef} stream={data() as any} autoplay />
			</Show>
		</div>
	</div>
}
