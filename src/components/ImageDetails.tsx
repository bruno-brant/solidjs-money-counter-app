import { JSX } from "solid-js";
import { ProcessingResult } from "../lib/Predictor";
import { sum, zip } from "../utils";

export interface ImageDetailsProps {
	data: ProcessingResult,
	minScore: number
}

export function ImageDetails({data, minScore}: ImageDetailsProps): JSX.Element {
	const { boxes, labels, scores} = data;
	const filtered = Array.from(zip(boxes, labels, scores))
		.filter(([, , score]) => score >= minScore);

	return <>
		<h2>Details</h2>
		<table>
			<thead>
				<tr>
					<th>Information</th>
					<th>Value</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Coins</td><td>{filtered.length}</td>
				</tr>
				<tr>
					<td>Total Value</td><td>{sum(filtered.map(([, label, ]) => label))}</td>
				</tr>
			</tbody>
		</table>
	</>
}
