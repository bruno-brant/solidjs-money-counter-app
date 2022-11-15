import Button from "@suid/material/Button";
import Typography from "@suid/material/Typography";
import { Show, JSX } from "solid-js";
import Stack from "@suid/material/Stack";

/**
 * Props for the {@link MyIconButton} component.
 */
interface MyIconButtonProps {
	icon: JSX.Element;
	text?: string;
	onClick?: () => void;
}
/**
 * A customized button with an icon and a text.
 * @param param0 Props that control the icon button.
 */
export function MyIconButton(props: MyIconButtonProps) {
	return <>
		<Button type='button' variant='contained' onClick={() => props.onClick?.()} fullWidth>
			<Stack direction='row' spacing={1} alignItems='end' justifyContent={"space-between"}>
				{props.icon}
				<Show when={props.text}>
					<Typography variant='h5'>{props.text}</Typography>
				</Show>
			</Stack>
		</Button>
	</>;
}
