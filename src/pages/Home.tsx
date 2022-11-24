import Typography from "@suid/material/Typography";
import Box from "@suid/material/Box";
import Container from "@suid/material/Container";
import Stack from "@suid/material/Stack";
import Paper from "@suid/material/Paper";
import Alert from "@suid/material/Alert";
import Button from "@suid/material/Button";
import { useNavigate } from "@solidjs/router";
import useMediaQuery from "@suid/material/useMediaQuery";

export function Home() {

	const navigate = useNavigate();

	const minWidth600 = useMediaQuery("(min-width: 600px)");

	const maxWidth = () => minWidth600() ? "50vw" : "80vw";

	// Position a Paper component in the middle of the screen
	return <Box sx={{ height: "100vh" }}>
		<Container sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
			<Paper sx={{ p: 4, maxWidth: maxWidth() }} elevation={4}>
				<Stack direction="column" spacing={2} alignItems="center">
					<Typography variant="h4" component="h1" gutterBottom>
						Bem vindo!
					</Typography>
					<Typography variant="body1" component="p">
						Criamos Moedeiro para nos auxiliar na chata tarefa de contar moedas.
						Basta tirar uma foto delas, e a IA faz todo o trabalho de contá-las!
					</Typography>
					<Typography variant="body1" component="p">
						Prefira tirar de cima das moedas, com bom foco, e com uma boa iluminação.
						Prefira também um fundo "uniforme", como uma mesa ou um papel branco.
					</Typography>
					<Alert severity="info">
						<Typography variant="body1" component="p" textAlign="justify">
							Aviso de Beta
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
