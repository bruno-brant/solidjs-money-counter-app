/**
 * An error throw when an operation times out.
 * @see {@link timeout}
 */
export class TimeoutError extends Error {
	/**
	 * Initializes a new instance of the {@link TimeoutError} class.
	 * @param operation The operation that timed out.
	 * @param timeout The timeout that was exceeded.
	 */
	constructor(operation: string, timeout: number) {
		super(`The operation ${operation} timed out after ${timeout}ms.`);
	}
}

async function wait(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Decorator that timesout a function after a specified amount of time.
 * @param ms The number of milliseconds to wait before timing out.
 * @returns A decorator that times out a function.
 * @remarks
 * 	The function will throw a {@link TimeoutError} if it times out.
 * @example
 * ```ts
 * class Predictor {
 * 	@timeout(10_000)
 * 	public async process(imageBase64: string): Promise<ProcessingResult> {
 * 		// ...
 * 	}
 * }
 * ```
 */
export function timeout(ms: number) {
	return function (_target: unknown, _propertyKey: unknown, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		descriptor.value = async function (...args: unknown[]) {
			return Promise.race([
				originalMethod.apply(this, args),
				wait(ms).then(() => { throw new TimeoutError(originalMethod.name, ms); })
			]);
		};
	};
}
