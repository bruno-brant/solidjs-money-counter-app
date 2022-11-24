import Typography from "@suid/material/Typography";
import Box from "@suid/material/Box";
import Container from "@suid/material/Container";
import AppBar from "@suid/material/AppBar";
import Stack from "@suid/material/Stack";
import { Toll } from "@suid/icons-material";

import { Counter } from "./Counter";
import { Route, Routes } from "@solidjs/router";
import { NotFound } from "./NotFound";
import { Home } from "./Home/Home";

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
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/counter" element={<Counter />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Box>
		</Container>
	</>;
}

export default App;
