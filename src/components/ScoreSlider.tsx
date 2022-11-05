import * as solidjs from 'solid-js';
import styles from './ScoreSlider.module.scss';

/** Props for the component {@link ScoreSlider}. */
export interface ScoreSliderProps {
	/** The minimum score */
	minScore: solidjs.Signal<number>;
}

/**
 * Presents a slider to select eh minimum score for the bounding boxes.
 * @param param0 The props that controls component behavior.
 */
export function ScoreSlider({ minScore: [minScore, setMinScore] = solidjs.createSignal(0.3) }: ScoreSliderProps) {
	function sliderChanged(e: Event) {
		const target = e.target as HTMLInputElement;
		const value = target.valueAsNumber;
		let finalValue;

		if (value == 1) {
			finalValue = 0.99;
		} else if (value < 0.3) {
			finalValue = 0.3;
		} else {
			finalValue = value;
		}

		setMinScore(finalValue);
	}

	return <>
		<div class={styles.container}>
			<input class={styles.slider}id="score" type="range" min="0.1" max="1" step="0.1" value={minScore()} oninput={sliderChanged} />
			<label for="score">({minScore() * 100}%)</label>
		</div>
	</>;
}
