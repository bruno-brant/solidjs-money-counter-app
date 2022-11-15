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
 * Zips a number of arrays together. 
 * @param arrays The arrays to zip.
 * @returns An array of tuples containing the values from each array.
 */
export function zip<T1, T2>(a1: T1[], a2: T2[]): Iterable<[T1, T2]>;
export function zip<T1, T2, T3>(a1: T1[], a2: T2[], a3: T3[]): Iterable<[T1, T2, T3]>;
export function zip<T1, T2, T3, T4>(a1: T1[], a2: T2[], a3: T3[], a4: T4[]): Iterable<[T1, T2, T3, T4]>;
export function *zip(...arrays: unknown[][]): Iterable<unknown[]> {
	const max = Math.max(...arrays.map(a => a.length));
	for (let i = 0; i < max; i++) {
		yield arrays.map(a => a[i]);
	}
}


/**
 * Sum the values in an array.
 * @param arr The array to sum.
 * @returns The sum of the values of the array.
 */
export function sum(arr: number[]): number {
	return arr.reduce((a, b) => a + b, 0);
}
