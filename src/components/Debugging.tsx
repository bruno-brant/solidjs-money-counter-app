import Alert from "@suid/material/Alert";
import { JSX, Show, createContext, useContext } from "solid-js";

/**
 * Context used to pass debug state to components.
 */
export const DebugContext = createContext(false);

export interface DebugBoxProps {
	/** Message to show in the top of the box */
	message?: string;
	/**
	 * Elements to display in case of debugging mode.
	 */
	children?: JSX.Element;
}

/**
 * Displays some debug information.
 * @param props The props that control this debug component.
 */
export function DebugBox(props: DebugBoxProps) {
	const isDebug = useContext(DebugContext);

	return <>
		{/* Create a context for debugging */}
		<Show when={isDebug}>
			<Show when={props.message}>
				<Alert severity="info">{props.message}</Alert>
			</Show>
			<Show when={props.children}>
				<div style={{ "background-color": "grey", border: "5 solid black", padding: "10px" }}>
					{props.children}
				</div>
			</Show>
		</Show>
	</>;
}
