import { createMemo, For, Show } from "solid-js";

/* eslint-disable @typescript-eslint/ban-types */
/**
 * Props for the {@link AutoTable} component.
 */
export interface AutoTableProps<T extends Record<string, unknown>> {
	/**
	 * The data to display.
	 * @remarks
	 * The data is expected to be an array of flat objects.
	 * The keys of the objects are used to determine the columns.
	 * The values of the objects are used to determine the rows.
	 * @example
	 * ```ts
	 * const data = [
	 * 	{ name: "John", age: 42, address: { street: "Main Street", number: 42 } },
	 * 	{ name: "Jane", age: 36, address: { street: "Main Street", number: 36 } },
	 * 	{ name: "Jack", age: 12, address: { street: "Main Street", number: 12 } },
	 * ];
	 * ```
	 */
	source: T[];

	/**
	 * The title of the table.
	 * @remarks
	 * If not specified, no title will be displayed.
	 * @example
	 * ```ts
	 * const data = [
	 * 	{ name: "John", age: 42 },
	 * 	{ name: "Jane", age: 36 },
	 * 	{ name: "Jack", age: 12 },
	 * ];
	 * 
	 * <AutoTable source={data} title="People" />
	 * ```
	 */
	title?: string;
}

/**
 * A table that automatically creates columns based on the data.
 * @param props The props that control this table.
 * @returns The table.
 */
export function AutoTable<T extends Record<string, unknown>>(props: AutoTableProps<T>) {
	const columns = createMemo(() => {
		return [
			...new Set(
				props.source
					.flatMap((row) => Object.keys(row))
			),
		];
	});

	return <>
		<Show when={props.title}>
			<h4>{props.title}</h4>
		</Show>
		<table style={{ width: "100%" }}>
			<thead>
				<tr>
					<For each={columns()}>
						{(column) => <th>{column}</th>}
					</For>
				</tr>
			</thead>
			<tbody>
				<For each={props.source}>
					{(row) => <tr>
						<For each={columns()}>
							{(column) => <td style={{
								"max-width": "200px",
								overflow: "hidden",
								"text-overflow": "ellipsis",
							}}>{row[column]?.toString()}</td>}
						</For>
					</tr>}
				</For>
			</tbody>
		</table>
	</>;
}
