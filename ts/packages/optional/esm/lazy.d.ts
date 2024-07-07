/**
 * Represents a lazily evaluated value.
 * The value is computed only when it is first accessed and then cached for subsequent accesses.
 *
 * @template T - The type of the value.
 */
export declare class Lazy<T> {
    #private;
    /**
     * Creates a new Lazy instance with the specified value computation function.
     *
     * @param fn - The function that computes the value.
     */
    constructor(fn: () => T);
    /**
     * Gets a value indicating whether the Lazy instance has a computed value.
     */
    get hasValue(): boolean;
    /**
     * Gets the computed value.
     * If the value has not been computed yet, it will be computed and cached.
     */
    get value(): T;
}
/**
 * Creates a lazy value that is computed only when needed.
 *
 * @template T - The type of the value being lazily computed.
 * @param fn - The function that computes the value.
 * @returns A lazy value that can be used to retrieve the computed value.
 */
export declare function lazy<T>(fn: () => T): Lazy<T>;
