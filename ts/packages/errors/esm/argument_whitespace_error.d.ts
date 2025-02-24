import { ArgumentError } from "./argument_error.js";
/**
 * Represents an error that is thrown when an argument
 * is null, empty, or whitespace.
 */
export declare class ArgumentWhiteSpaceError extends ArgumentError {
    /**
     * Creates a new instance of the ArgumentWhiteSpaceError class.
     * @param parameterName - The name of the parameter that caused the error.
     */
    constructor(parameterName?: string | null);
}
