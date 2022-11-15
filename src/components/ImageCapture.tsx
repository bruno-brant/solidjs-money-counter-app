import Alert from '@suid/material/Alert';
import Button from '@suid/material/Button';
import Typography from '@suid/material/Typography';
import { createSignal, createEffect, onMount, Show } from 'solid-js';
import { CameraVideo } from './CameraVideo';
import styles from './ImageCapture.module.scss';

import AddAPhotoIcon from '@suid/icons-material/AddAPhoto';
import ThumbUpAltIcon from '@suid/icons-material/ThumbUpAlt';
import RestartAltIcon from '@suid/icons-material/RestartAlt';
import Stack from '@suid/material/Stack';

/** Possible states of the ImageCapture component. */
enum ImageCaptureState {
	/** Camera is ready to be used */
	Camera,
	/** Picture was taken */
	Picture,
	/** Error initializing the camer */
	Error
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
export function ImageCapture({ onPictureTaken }: ImageCaptureProps) {
	let videoRef: HTMLVideoElement;
	let canvasRef: HTMLCanvasElement;

	const [state, setState] = createSignal(ImageCaptureState.Camera);

	function cameraInitialized(success: boolean) {
		if (success) {
			setState(ImageCaptureState.Camera);
		} else {
			setState(ImageCaptureState.Error);
		}
	}

	function pictureButtonClicked() {
		videoRef.pause();

		const mediaStream = videoRef.srcObject as MediaStream;
		const videoTrack = mediaStream.getVideoTracks()[0];

		canvasRef.width = videoTrack.getSettings().width ?? 0;
		canvasRef.height = videoTrack.getSettings().height ?? 0;

		const ctx = canvasRef.getContext('2d');
		ctx?.drawImage(videoRef, 0, 0, canvasRef.width, canvasRef.height);

		setState(ImageCaptureState.Picture);
	}

	function confirmButtonClicked() {
		const dataUrl = canvasRef.toDataURL('image/png');
		onPictureTaken?.(dataUrl);
		setState(ImageCaptureState.Camera);
	}

	function resetButtonClicked() {
		videoRef.play();
		setState(ImageCaptureState.Camera);
	}

	function getStyle(visibleOnState: ImageCaptureState) {
		return (visibleOnState === state())
			? {}
			: { display: 'none' }
	}

	return <>
		<Show when={state() === ImageCaptureState.Error}>
			<Alert>
				<Typography variant='body1'>❌ Error!</Typography>
			</Alert>
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
			<div style={{...getStyle(ImageCaptureState.Picture), width: "100%"}}>
				<canvas ref={el => canvasRef = el} style={{width: "100%"}} width="100%" />
			</div>
			<div class={styles.controls}>
				<Show when={state() === ImageCaptureState.Camera}>
					<Button type='button' variant='contained' onClick={pictureButtonClicked} fullWidth>
						<Stack direction='row' spacing={1} alignItems='end' justifyContent={'space-between'}>
							<AddAPhotoIcon fontSize='large' />
							<Typography variant='h5'>Click!</Typography>
						</Stack>
					</Button>
				</Show>
				<Show when={state() === ImageCaptureState.Picture}>
					<Stack direction='row' spacing={2}>
						<Button variant='contained' onClick={confirmButtonClicked} fullWidth><ThumbUpAltIcon fontSize='large' /></Button>
						<Button variant='contained' onClick={resetButtonClicked} fullWidth><RestartAltIcon fontSize='large' /></Button>
					</Stack>
				</Show>
			</div>
		</Show>
	</>;
}
