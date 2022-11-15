import * as solidjs from 'solid-js';

import Typography from '@suid/material/Typography';
import Grid from "@suid/material/Grid";
import Stack from '@suid/material/Stack';
import useMediaQuery from "@suid/material/useMediaQuery"
import { Show } from 'solid-js';


/** Props for the component {@link ScoreSlider}. */
export interface ScoreSliderProps {
	/** The current mininum score */
	score: solidjs.Signal<number>;
	/** The minimum value of the minimum score */
	min?: number;
	/** The maximum value of the minimum score */
	max?: number;
}

/**
 * Presents a slider to select eh minimum score for the bounding boxes.
 * @param param0 The props that controls component behavior.
 */
export function ScoreSlider({ score: [score, setScore], min = 0.3, max = 0.90 }: ScoreSliderProps) {
	function sliderChanged(e: InputEvent) {
		const target = e.target as HTMLInputElement;
		const value = target.valueAsNumber;

		if (value > max) {
			setScore(max);
		} else if (value < min) {
			setScore(min);
		} else {
			setScore(value);
		}
	}

	const matches = useMediaQuery("(min-width: 400px)");

	return <>
		<Stack justifyContent='space-between'>
			<Grid container alignItems='center' justifyContent='space-between' spacing={1}>
				<Grid item xs={11} md={11}>
					<input style={{ width: "100%" }} id="score" type="range" min="0" max="1" step="0.1" value={score().toString()} onInput={sliderChanged} />
				</Grid>
				<Grid item xs={1} md={1}>
					<Typography align='right'>{score() * 100}%</Typography>
				</Grid>
			</Grid>
			<Show when={matches()}>
				<Typography variant='caption' align='center' >
					Mexa no slider para controlar o nível mínimo de confiança das detecções.
				</Typography>
			</Show>
		</Stack>
	</>
}
