import Typography from "@suid/material/Typography";
import Box from "@suid/material/Box";
import Container from "@suid/material/Container";
import Stack from "@suid/material/Stack";
import { Toll } from "@suid/icons-material";

export function NotFound() {
	return <Box sx={{ height: "100vh" }}>
		<Container sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
			<Stack direction="column" spacing={2} alignItems="center">
				<Toll fontSize="large" />
				<Typography variant="h4" component="h1" gutterBottom>
					404 - Not found
				</Typography>
				<Typography variant="body1" component="p">
					We couldn't find the page you were looking for.
				</Typography>
			</Stack>
		</Container>
	</Box>;
}
