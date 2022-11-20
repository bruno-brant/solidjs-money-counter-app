import Alert from "@suid/material/Alert";
import Typography from "@suid/material/Typography";
import { createSignal, Show } from "solid-js";
import { CameraVideo } from "./CameraVideo";
import styles from "./ImageCapture.module.scss";

import AddAPhotoIcon from "@suid/icons-material/AddAPhoto";
import ThumbUpAltIcon from "@suid/icons-material/ThumbUpAlt";
import RestartAltIcon from "@suid/icons-material/RestartAlt";
import Stack from "@suid/material/Stack";
import { MyIconButton } from "./MyIconButton";
import { TextualSpinner } from "./TextualSpinner";

/** Possible states of the ImageCapture component. */
enum ImageCaptureState {
	/** Camera is ready to be used. */
	Camera,
	/** Picture was taken. */
	Picture,
	/** Error initializing the camera. */
	Error,
	Initializing
}

/** Props for the {@link ImageCapture} component. */
interface ImageCaptureProps {
	/** 
	 * Called when a picture is taken. 
	 * @param pictureBase64 The picture taken, in dataUrl format.
	 */
	onPictureTaken?: (pictureDataUrl: string) => void;
}

/**
 * Component that allows capturing an image from the camera.
 */
export function ImageCapture(props: ImageCaptureProps) {
	let videoRef: HTMLVideoElement;
	let canvasRef: HTMLCanvasElement;

	const [state, setState] = createSignal(ImageCaptureState.Initializing);

	function cameraInitialized(success: boolean) {
		if (success) {
			setState(ImageCaptureState.Camera);
		} else {
			setState(ImageCaptureState.Error);
		}
	}

	function takePictureButtonClicked() {
		videoRef.pause();

		const mediaStream = videoRef.srcObject as MediaStream;
		const videoTrack = mediaStream.getVideoTracks()[0];

		canvasRef.width = videoTrack.getSettings().width ?? 0;
		canvasRef.height = videoTrack.getSettings().height ?? 0;

		const ctx = canvasRef.getContext("2d");
		ctx?.drawImage(videoRef, 0, 0, canvasRef.width, canvasRef.height);

		setState(ImageCaptureState.Picture);
	}

	function confirmButtonClicked() {
		const dataUrl = canvasRef.toDataURL("image/png");
		props.onPictureTaken?.(dataUrl);
		setState(ImageCaptureState.Camera);
	}

	function resetButtonClicked() {
		videoRef.play();
		setState(ImageCaptureState.Camera);
	}

	function getStyle(visibleOnState: ImageCaptureState) {
		return (visibleOnState === state())
			? {}
			: { display: "none" };
	}

	// TODO: Review the divs below
	return <>
		<Show when={state() === ImageCaptureState.Error}>
			<Alert severity='error'>
				<Typography variant='body1'>❌ Error!</Typography>
			</Alert>
		</Show>
		<Show when={state() === ImageCaptureState.Initializing}>
			<TextualSpinner text="Initializing camera..." />
		</Show>
		<Show when={state() !== ImageCaptureState.Error}>
			{/* 
				Can't use show below because we need to hook the ref in canvas and CameraVideo simultaneously.
				For that to happen, both components need to be rendered at the same time.
				So we just hide one of them from the DOM but still render it.
			*/}
			<div style={getStyle(ImageCaptureState.Camera)} >
				<CameraVideo videoRef={el => videoRef = el} onCameraInitialized={cameraInitialized} />
			</div>
			<div style={{ ...getStyle(ImageCaptureState.Picture), width: "100%" }}>
				<canvas ref={el => canvasRef = el} style={{ width: "100%" }} width="100%" />
			</div>
			<div class={styles.controls}>
				<Show when={state() === ImageCaptureState.Camera}>
					<MyIconButton icon={<AddAPhotoIcon fontSize='large' />} text='Click!' onClick={takePictureButtonClicked} />
				</Show>
				<Show when={state() === ImageCaptureState.Picture}>
					<Stack direction='row' spacing={2}>
						<MyIconButton icon={<ThumbUpAltIcon fontSize='large' />} onClick={confirmButtonClicked} />
						<MyIconButton icon={<RestartAltIcon fontSize='large' />} onClick={resetButtonClicked} />
					</Stack>
				</Show>
			</div>
		</Show>
	</>;
}
