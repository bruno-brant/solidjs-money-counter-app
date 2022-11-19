import Typography from "@suid/material/Typography";
import Box from "@suid/material/Box";
import Container from "@suid/material/Container";
import AppBar from "@suid/material/AppBar";
import Stack from "@suid/material/Stack";
import { Toll } from "@suid/icons-material";

import { Home } from "./Home";


function CustomAppBar() {
	return <>
		<AppBar>
			<Box id="AppBarBox" sx={{ mx: 4, width: "100%", height: "100%" }}>
				<Stack direction="row" alignItems="center" spacing={1}>
					<Typography variant="h6">Moedeiro</Typography><Toll />{" "}<Typography color="secondary" variant="caption" >BETA</Typography>
				</Stack>
			</Box>
		</AppBar>
	</>;
}
function App() {
	return <>
		<Container maxWidth="md">
			<CustomAppBar />
			<Box sx={{ my: 6 }}>
				<Home />
			</Box>
		</Container>
	</>;
}

export default App;
