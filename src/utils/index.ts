export * from "./timeout";
export * from "./collections-utils";

/** 
 * Either assign the value directly or call a function passing the value.
 * @param valueOrFunction The value or function to call.
 * @param value The value to pass to the function.
 */
export function callOrAssign<T>(fnOrValue: T | ((el: T) => void), value: T): void {
	if (typeof fnOrValue === "function") {
		(fnOrValue as (el: T) => void)(value);
	} else {
		(fnOrValue as T) = value;
	}
}


/**
 * Gets the query string as a dictionary.
 * @returns A dictionary that represents the name/value pairs in the query string.
 */
export function getQueryParams() {
	const params = new URLSearchParams(window.location.search);
	const result: Record<string, string> = {};

	for (const [key, value] of params) {
		result[key] = value;
	}

	return result;
}
