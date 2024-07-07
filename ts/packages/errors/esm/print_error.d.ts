/**
 * Prints the error to the console and if an error derives from SystemError,
 * it will print the inner error as well.
 *
 * @param e The error to print to the console.
 * @param format Formats the error to the console.
 * @returns
 */
export declare function printError(e: Error, format?: (e: Error) => string): void;
