/* @refresh reload */
import { Router } from "@solidjs/router";
import { createTheme, ThemeProvider } from "@suid/material";
import CssBaseline from "@suid/material/CssBaseline";
import { render } from "solid-js/web";
import { DebugContext } from "./components/Debugging";

import "./index.css";
import App from "./pages/App";
import { getQueryParams } from "./utils";

const theme = createTheme({
	palette: {
		mode: "dark",
	}
});

function root() {
	return <>
		<ThemeProvider theme={theme}>
			<DebugContext.Provider value={getQueryParams()["debug"] == "true"}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Router>
					<App />
				</Router>
			</DebugContext.Provider>
		</ThemeProvider>
	</>;
}

render(root, document.getElementById("root") as HTMLElement);
