import Alert from "@suid/material/Alert";
import { JSX, Show, createContext, useContext } from "solid-js";

/**
 * Context used to pass debug state to components.
 */
export const DebugContext = createContext(false);

/**
 * Displays some debug information.
 * @param props The props that control this debug component.
 */
export function DebugBox(props: { children: JSX.Element[]; }) {
	const isDebug = useContext(DebugContext);

	return <>
		{/* Create a context for debugging */}
		<Show when={isDebug}>
			<Alert severity="info">{props.children}</Alert>
		</Show>
	</>;
}
