import { JSX } from "solid-js";
import { ProcessingResult } from "../lib/Predictor";
import { sum, zip } from "../utils";

import Paper from "@suid/material/Paper";
import Table from "@suid/material/Table";
import TableBody from "@suid/material/TableBody";
import TableCell from "@suid/material/TableCell";
import TableContainer from "@suid/material/TableContainer";
import TableRow from "@suid/material/TableRow";
import Typography from "@suid/material/Typography";

export interface ImageDetailsProps {
	data: ProcessingResult,
	minScore: number
}

export function ImageDetails(props: ImageDetailsProps): JSX.Element {
	const filtered = () => {
		const { boxes, labels, scores } = props.data;
		return Array.from(zip(boxes, labels, scores))
			.filter(([, , score]) => score >= props.minScore);
	};

	const totalValue = () => sum(filtered().map(([, label,]) => label));

	return <>
		<Typography variant="h4">Detalhes</Typography>
		<TableContainer component={Paper}>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell variant="head">Quantidade de moedas</TableCell>
						<TableCell align="right">{filtered().length}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell variant="head">Valor total</TableCell>
						<TableCell align="right">{totalValue()}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	</>;
}
