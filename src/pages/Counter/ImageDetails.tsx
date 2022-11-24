import { createSignal, For, JSX, Show } from "solid-js";
import { DetectedCoin } from "../../lib/Predictor";
import { sum } from "../../utils";

import Paper from "@suid/material/Paper";
import Table from "@suid/material/Table";
import TableBody from "@suid/material/TableBody";
import TableCell from "@suid/material/TableCell";
import TableContainer from "@suid/material/TableContainer";
import TableRow from "@suid/material/TableRow";
import Typography from "@suid/material/Typography";
import { ExpandLess, ExpandMore } from "@suid/icons-material";
import IconButton from "@suid/material/IconButton";
import Box from "@suid/material/Box";

export interface ImageDetailsProps {
	coins: DetectedCoin[],
}

export function ImageDetails(props: ImageDetailsProps): JSX.Element {
	const totalValue = () => sum(props.coins.map(_ => _.value));
	const [expanded, setExpanded] = createSignal(false);
	const ExpandButton = () => <>
		<IconButton onClick={() => setExpanded(x => !x)} disabled={props.coins.length == 0}>
			{expanded() ? <ExpandLess /> : <ExpandMore />}
		</IconButton>
	</>;

	const formatCurrency = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

	return <>
		<Typography variant="h4">Detalhes</Typography>
		<TableContainer component={Paper}>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell variant="head">Valor total</TableCell>
						<TableCell align="right">{formatCurrency(totalValue())}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell variant="head"><ExpandButton />Quantidade de moedas</TableCell>
						<TableCell align="right">{props.coins.length}</TableCell>
					</TableRow>
					<Show when={expanded()}>
						<TableRow>
							<TableCell colSpan={2}>
								<Box mx={10} my={1}>
									<Table>
										<TableBody>
											<For each={props.coins}>
												{(coin, idx) => <>
													<TableRow>
														<TableCell variant="head" sx={{ paddingLeft: "10" }}>Moeda #{idx()}</TableCell>
														<TableCell align="right">{formatCurrency(coin.value)}</TableCell>
													</TableRow>
												</>}
											</For>
										</TableBody>
									</Table>
								</Box>
							</TableCell>
						</TableRow>
					</Show>
				</TableBody>
			</Table>
		</TableContainer>
	</>;
}
