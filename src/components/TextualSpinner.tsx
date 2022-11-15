import CircularProgress from "@suid/material/CircularProgress";
import Stack from "@suid/material/Stack";
import Typography from "@suid/material/Typography";

export function TextualSpinner(props: { text: string; }) {
	return <>
		<Stack direction='row' alignContent='center' justifyContent='center' spacing={2}>
			<CircularProgress />
			<Typography variant="h5">{props.text}</Typography>
		</Stack>
	</>;
}
