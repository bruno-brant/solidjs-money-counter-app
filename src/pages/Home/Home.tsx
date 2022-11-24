import { For } from "solid-js";
import { useNavigate } from "@solidjs/router";

import useMediaQuery from "@suid/material/useMediaQuery";
import Typography from "@suid/material/Typography";
import Box from "@suid/material/Box";
import Container from "@suid/material/Container";
import Stack from "@suid/material/Stack";
import Paper from "@suid/material/Paper";
import Alert from "@suid/material/Alert";
import Button from "@suid/material/Button";

/**
 * Simple component that renders a list of images
 */
function ImageSamples() {
	return <>
		<Stack direction="row" spacing={1}>
			<For each={["coins1.jpg", "coins2.jpg", "coins3.jpg"]}>
				{image => <>
					<img src={"/images/" + image}
						alt="Exemplo de foto de moedas"
						style={{ "max-height": "192px", "max-width": "96px" }} />
				</>}
			</For>
		</Stack>
	</>;
}

/**
 * Landing page for the app.
 * @returns The landing page component.
 */
export function Home() {
	const navigate = useNavigate();

	const minWidth600 = useMediaQuery("(min-width: 600px)");

	const maxWidth = () => minWidth600() ? "50vw" : "100vw";

	// Position a Paper component in the middle of the screen
	return <Box sx={{ height: "100vh" }}>
		<Container sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
			<Paper sx={{ p: 4, maxWidth: maxWidth() }} elevation={4}>
				<Stack direction="column" spacing={2} alignItems="center">
					<Typography variant="h4" component="h1" gutterBottom>
						Bem vindo!
					</Typography>
					<Typography variant="body1" component="p">
						Criamos Moedeiro para nos auxiliar na chata tarefa de <strong><span style={{ color: "orange" }}>contar moedas.</span></strong>
						Basta tirar uma foto delas, e nossa inteligência artificial faz todo o trabalho de contá-las!
					</Typography>
					<Typography variant="body1" component="p">
						Prefira uma foto de cima das moedas, sempre com bom foco e boa iluminação.
						Prefira também um fundo "uniforme", como uma mesa ou um papel branco.
					</Typography>
					<Typography variant="h6" component="p">
						Exemplos
					</Typography>
					<ImageSamples />

					<Alert severity="info">
						<Typography variant="body1" component="p" textAlign="justify">
							Aviso de BETA
						</Typography>
						<Stack direction="column" spacing={2} alignItems="center" padding={1}>
							<Typography variant="body2" component="p" textAlign="justify">
								Moedeiro é um software BETA, e pode apresentar bugs.
								Nem sempre as moedas compreendidas por completo, e podem ser contadas incorretamente.
							</Typography>
							<Typography variant="body2" component="p" textAlign="justify">
								Nossa IA ainda está aprendendo e melhorando, e você pode ajudar!
								Envie-nos fotos de moedas que não foram contadas corretamente, e nós iremos treiná-la.
							</Typography>
						</Stack>
					</Alert>
					<Button variant="contained" color="primary" onClick={() => navigate("/counter")}>
						Começar!
					</Button>
				</Stack>
			</Paper>
		</Container>
	</Box>;

}
