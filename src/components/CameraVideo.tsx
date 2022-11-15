import Alert from "@suid/material/Alert";
import CircularProgress from "@suid/material/CircularProgress";
import Stack from "@suid/material/Stack";
import Typography from "@suid/material/Typography";
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

	return <>
		<Show when={data.error}>
			<Alert severity="error">Error initializing camera!</Alert>
		</Show>
		<Show when={data.loading}>
			<Stack>
				<CircularProgress />
				<Typography>Initializing camera...</Typography>
			</Stack>
		</Show>
		<Show when={!data.loading && !data.error && data() != null}>
			<Video videoRef={videoRef} stream={data() as any} autoplay width="100%" />
		</Show>
	</>
}
