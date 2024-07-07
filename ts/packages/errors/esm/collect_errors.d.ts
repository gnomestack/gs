/**
 * Collects all the errors from the given error object and its nested errors.
 *
 * @param e - The error object to collect errors from.
 * @returns An array of all the collected errors.
 */
export declare function collect(e: Error): Error[];
