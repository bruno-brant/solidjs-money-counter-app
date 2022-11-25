import { createSignal, For, JSX, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";

import useMediaQuery from "@suid/material/useMediaQuery";
import Box from "@suid/material/Box";
import Button from "@suid/material/Button";
import Container from "@suid/material/Container";
import Paper from "@suid/material/Paper";
import Stack from "@suid/material/Stack";
import Typography, { TypographyProps } from "@suid/material/Typography";

// @ts-expect-error - No support for query params yet in import directives
import coin1Url from "../../assets/coins1.jpg?format=webp&width=96;300";
// @ts-expect-error - No support for query params yet in import directives
import coin2Url from "../../assets/coins2.jpg?format=webp&width=96;300";
// @ts-expect-error - No support for query params yet in import directives
import coin3Url from "../../assets/coins3.jpg?format=webp&width=96;300";
import { SxProps } from "@suid/system";
import { Dialog } from "@suid/material";

function BetaAlert() {
	const style: SxProps = {
		backgroundColor: "rgba(7.9, 19.5, 24.7, 0.5)",
		//borderColor: "rgb(7.9, 19.5, 24.7)",
		border: 1,
		color: "rgb(60, 120, 150)"
	};

	return <Stack sx={style} direction="column" spacing={1} padding={2} borderRadius={3}  >

		<Typography variant="h6" component="p" textAlign="left">
			Aviso de BETA
		</Typography>
		<Typography variant="body2" component="p" textAlign="justify">
			Moedeiro é um software BETA, podendo apresentar bugs.
			Nem sempre as moedas são contadas corretamente.
		</Typography>

		<Text variant="body2" textAlign="justify">
			Nossa IA ainda está aprendendo e melhorando, e você pode ajudar doando
			as fotos de moedas que não foram contadas corretamente!
		</Text>
	</Stack>;
}

/**
 * Simple component that renders a list of images
 */
function ImageSamples() {
	const [selectedImage, setSelectedImage] = createSignal<string | null>(null);

	function isModalOpen() {
		const ret = selectedImage() != null;
		console.log("isModalOpen: " + ret);
		return ret;
	}

	function onClose() {
		console.log("Closing modal");
		setSelectedImage(null);
	}

	return <>
		<Dialog open={isModalOpen()} onClose={onClose} >
			<img
				src={selectedImage()!}
				alt="Exemplo de foto de moedas" />
		</Dialog>
		<Stack direction="row" spacing={1}>
			<For each={[coin1Url, coin2Url, coin3Url]}>

				{url => <>
					<img src={url[0]}
						alt="Exemplo de foto de moedas"
						style={{ "max-height": "192px", "max-width": "96px", cursor: "pointer" }}
						onClick={() => setSelectedImage(url[1])} />
				</>}
			</For>
		</Stack>
	</>;
}

function Text(props: TypographyProps) {
	return <Typography variant="body1" textAlign="justify" {...props} />;
}

enum State {
	Welcome,
	Beta,
	Instructions,
}

/**
 * Landing page for the app.
 * @returns The landing page component.
 */
export function Home() {
	const navigate = useNavigate();
	const minWidth600 = useMediaQuery("(min-width: 600px)");
	const minHeight600 = useMediaQuery("(min-height: 50em)");
	const maxWidth = () => minWidth600() ? "50vw" : "100vw";
	const [state, setState] = createSignal(State.Welcome);

	function Step(props: { when: State, children: JSX.Element | JSX.Element[], nextButtonText: string, onNext: () => void }) {
		return <>
			<Show when={minHeight600() || state() === props.when}>
				{props.children}
				<Show when={!minHeight600()}>
					<Button variant="contained" color="primary" onClick={() => props.onNext()}>
						{props.nextButtonText}
					</Button>
				</Show>
			</Show>
		</>;
	}

	// Position a Paper component in the middle of the screen
	return <Box sx={{ height: "100vh" }}>
		<Container sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
			<Paper sx={{ p: 4, maxWidth: maxWidth() }} elevation={4}>
				<Stack direction="column" spacing={2} alignItems="center">
					<Step when={State.Welcome} nextButtonText="Continuar" onNext={() => setState(State.Beta)}>
						<Text variant="h4" gutterBottom>
							Bem vindo!
						</Text>
						<Text>
							Criamos Moedeiro para nos auxiliar na chata tarefa de <strong style={{ color: "orange" }}>contar moedas. </strong>
							Basta tirar uma foto e nossa IA faz todo o trabalho de contá-las!
						</Text>
					</Step>
					<Step when={State.Beta} nextButtonText="Como usar?" onNext={() => setState(State.Instructions)}>
						<BetaAlert />
					</Step>
					<Step when={State.Instructions} nextButtonText="Começar" onNext={() => navigate("/scan")}>
						<Text variant="h4" gutterBottom>
							Como usar?
						</Text>
						<Text>
							Prefira uma foto de cima das moedas, com bom foco e boa iluminação.
							Use um fundo "uniforme", como uma mesa ou um papel branco.
						</Text>
						<Text variant="h6" >
							Exemplos
						</Text>
						<ImageSamples />
					</Step>
					<Show when={minHeight600()}>
						<Button variant="contained" color="primary" onClick={() => navigate("/scan")}>
							Começar
						</Button>
					</Show>
				</Stack>
			</Paper>
		</Container>
	</Box>;

}
