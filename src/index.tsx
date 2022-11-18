/* @refresh reload */
import { createTheme, ThemeProvider } from "@suid/material";
import CssBaseline from "@suid/material/CssBaseline";
import { render } from "solid-js/web";

import "./index.css";
import App from "./pages/App";

const theme = createTheme({
	palette: {
		mode: "dark",
	}
});

function root() {
	return <>
		<ThemeProvider theme={theme}>
			{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
			<CssBaseline />
			<App />
		</ThemeProvider>
	</>;
}

render(root, document.getElementById("root") as HTMLElement);
