/* @refresh reload */
import { Router } from "@solidjs/router";
import { createTheme, ThemeProvider } from "@suid/material";
import CssBaseline from "@suid/material/CssBaseline";
import { render } from "solid-js/web";
import { DebugContext } from "./components/Debugging";

//import Worker from "./service-worker?worker";

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

// Register service worker from service-worker.ts
if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker.register("/service-worker.js");
	});
}

render(root, document.getElementById("root") as HTMLElement);
