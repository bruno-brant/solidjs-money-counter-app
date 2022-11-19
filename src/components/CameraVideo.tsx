import Alert from "@suid/material/Alert";
import Fab from "@suid/material/Fab";
import Stack from "@suid/material/Stack";
import { JSX, createResource, Show, Switch, Match, createSignal, useContext } from "solid-js";
import { Video } from "./Video";
import FlipCameraIosIcon from "@suid/icons-material/FlipCameraIos";
import { TextualSpinner } from "./TextualSpinner";
import Box from "@suid/material/Box";
import { DebugBox, DebugContext } from "./Debugging";
import { AutoTable } from "./AutoTable";

interface _VideoProps {
	videoInputDevices: MediaDeviceInfo[];
	videoRef?: JSX.VideoHTMLAttributes<HTMLVideoElement>["ref"];
	onCameraInitialized?(success: boolean): void;
}

enum FacingMode {
	Environment = "environment",
	User = "user",
}

function _CameraVideo(props: _VideoProps) {
	const [facingMode, setFacingMode] = createSignal(FacingMode.Environment);

	const [videoStream] = createResource(facingMode, async (facingMode) => {
		console.log("Getting video stream for device", facingMode);

		const stream = await navigator.mediaDevices.getUserMedia({
			video: {
				facingMode: {
					ideal: facingMode,
				}
			}
		});

		return stream;
	});

	const debug = useContext(DebugContext);

	async function flipCamera() {
		setFacingMode(mode => mode === FacingMode.Environment
			? FacingMode.User
			: FacingMode.Environment);
	}

	return <>
		<Switch fallback={<Alert severity="error">Error initializing camera!</Alert>}>
			<Match when={videoStream.loading}>
				<TextualSpinner text="Initializing camera..." />
			</Match>
			<Match when={true}>
				<Stack justifyContent='end'>
					<Box sx={{ position: "relative" }}>
						<Video videoRef={props.videoRef} stream={videoStream()} autoplay width="100%" onInitialized={success => props.onCameraInitialized?.(success)} />
						<Show when={debug || props.videoInputDevices.length > 1}>
							<Fab sx={{ position: "absolute", right: "5%", bottom: "5%" }} onClick={() => flipCamera()}>
								<FlipCameraIosIcon />
							</Fab>
						</Show>
					</Box>
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
		return devices;
	});

	function getDevices() {
		if (availableDevicesResource.loading) {
			return [];
		}

		return availableDevicesResource()!.map(_ => {
			return {
				label: _.label,
				kind: _.kind,
				deviceId: _.deviceId,
				groupId: _.groupId
			};
		});
	}

	return <>
		<Show when={!availableDevicesResource.loading && availableDevicesResource()!.length > 0}>
			<DebugBox message="Devices">
				<AutoTable source={getDevices()} />
			</DebugBox>
		</Show>
		<Switch fallback={<Alert severity="error">Error getting devices!</Alert>}>
			<Match when={availableDevicesResource.loading}>
				<TextualSpinner text="Getting available video devices..." />
			</Match>
			<Match when={true}>
				<_CameraVideo videoInputDevices={availableDevicesResource()!.filter(_ => _.kind == "videoinput")} videoRef={props.videoRef} onCameraInitialized={e => props.onCameraInitialized?.(e)} />
			</Match>
		</Switch>

	</>;
}
