import * as solidjs from "solid-js";

import Typography from "@suid/material/Typography";
import Grid from "@suid/material/Grid";
import Stack from "@suid/material/Stack";
import useMediaQuery from "@suid/material/useMediaQuery";
import { mergeProps, Show } from "solid-js";
import { ChangeEvent } from "@suid/types";

/** Props for the component {@link ScoreSlider}. */
export interface ScoreSliderProps {
	/** The current mininum score */
	score: solidjs.Accessor<number>;
	/** The function to call when the score changes */
	setScore: solidjs.Setter<number>;
	/** The minimum value of the minimum score */
	min?: number;
	/** The maximum value of the minimum score */
	max?: number;
}

/**
 * Presents a slider to select eh minimum score for the bounding boxes.
 * @param param0 The props that controls component behavior.
 */
export function ScoreSlider(props: ScoreSliderProps) {

	const merged = mergeProps({ min: 0.3, max: 0.9 }, props);

	function constrainValue(target: HTMLInputElement) {
		const value = target.valueAsNumber;

		console.log("slider value", value);

		if (value > merged.max) {
			target.value = merged.max.toString();
		} else if (value < merged.min) {
			target.value = merged.min.toString();
		}
	}

	function onInput(e: InputEvent) {
		e.preventDefault();
		
		const target = e.target as HTMLInputElement;
		
		constrainValue(target);
		merged.setScore(parseFloat(target.value));
	}

	function onChange(e: ChangeEvent) {
		e.preventDefault();
		constrainValue(e.target as HTMLInputElement);
	}

	function onDrag(e: DragEvent) {
		e.preventDefault();
		constrainValue(e.target as HTMLInputElement);
	}

	const matches = useMediaQuery("(min-width: 240px)");

	return <>
		<Stack justifyContent='space-between'>
			<Grid container alignItems='center' justifyContent='space-between' spacing={1}>
				<Grid item xs={11} md={11}>
					<input id="score" style={{ width: "100%" }} type="range" min="0" max="1" step="0.1"
						value={merged.score()} onInput={onInput} onChange={onChange} onDrag={onDrag} />
				</Grid>
				<Grid item xs={1} md={1}>
					<Typography align='right'>{merged.score() * 100}%</Typography>
				</Grid>
			</Grid>
			<Show when={matches()}>
				<Typography variant='caption' align='center' >
					Mexa no slider para controlar o nível mínimo de confiança das detecções.
				</Typography>
			</Show>
		</Stack>
	</>;
}
