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

render(() => <>
	<ThemeProvider theme={theme}>
		{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
		<CssBaseline />
		<App />
	</ThemeProvider>,
</>, document.getElementById("root") as HTMLElement);
