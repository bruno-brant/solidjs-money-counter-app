import Alert from "@suid/material/Alert";
import Fab from "@suid/material/Fab";
import Stack from "@suid/material/Stack";
import { JSX, createResource, Show, Switch, Match, createSignal, For, } from "solid-js";
import { Video } from "./Video";
import FlipCameraIosIcon from "@suid/icons-material/FlipCameraIos";
import { TextualSpinner } from "./TextualSpinner";
import Box from "@suid/material/Box";
import { DebugBox, DebugContext } from "./Debugging";

interface _VideoProps {
	availableDevices: string[];
	videoRef?: JSX.VideoHTMLAttributes<HTMLVideoElement>["ref"];
	onCameraInitialized?(success: boolean): void;
}

function _CameraVideo(props: _VideoProps) {
	const [videoDeviceIndex, setVideoDeviceIndex] = createSignal(0);

	const [videoStream] = createResource(videoDeviceIndex, async (deviceIndex) => {
		console.log("Getting video stream for device", deviceIndex);

		const stream = await navigator.mediaDevices.getUserMedia({
			video: {
				deviceId: props.availableDevices[deviceIndex]
			}
		});

		props.onCameraInitialized?.(true);

		return stream;
	});

	async function flipCamera() {
		console.info(`Flipping camera from ${videoDeviceIndex()}...`);
		setVideoDeviceIndex(idx => idx + 1 % props.availableDevices.length);
		console.info(`... to ${videoDeviceIndex()}`);
	}

	return <>
		<Switch fallback={<Alert severity="error">Error initializing camera!</Alert>}>
			<Match when={videoStream.loading}>
				<TextualSpinner text="Initializing camera..." />
			</Match>
			<Match when={true}>
				<Stack justifyContent='end'>
					<Box sx={{ position: "relative" }}>
						<Video videoRef={props.videoRef} stream={videoStream()} autoplay width="100%" />
						<Show when={props.availableDevices.length}>
							<Fab sx={{ position: "absolute", right: "5%", bottom: "5%" }} onClick={() => flipCamera()}>
								<FlipCameraIosIcon />
							</Fab>
						</Show>
					</Box>
					{/* Create a context for debugging */}
					<DebugBox>Current device: {props.availableDevices[videoDeviceIndex()]}</DebugBox>
				</Stack>
			</Match>
		</Switch>
	</>;
}

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
export function CameraVideo(props: CameraVideoProps) {
	const [availableDevicesResource] = createResource(async () => {
		const devices = await navigator.mediaDevices.enumerateDevices();
		const videoDevices = devices.filter(d => d.kind === "videoinput");
		const videoDevicesIds = videoDevices.map(d => d.deviceId);

		return videoDevicesIds;
	});

	return <>
		<Switch fallback={<Alert severity="error">Error getting devices!</Alert>}>
			<Match when={availableDevicesResource.loading}>
				<TextualSpinner text="Getting available video devices..." />
			</Match>
			<Match when={true}>
				<DebugBox>
					Devices:
					<ul>
						<For each={availableDevicesResource()}>
							{device => <li>{device}</li>}
						</For>
					</ul>
				</DebugBox>
				<_CameraVideo availableDevices={availableDevicesResource()!} videoRef={props.videoRef} onCameraInitialized={e => props.onCameraInitialized?.(e)} />
			</Match>
		</Switch>

	</>;
}
