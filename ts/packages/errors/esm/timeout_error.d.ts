import { SystemError } from "./system_error.js";
/**
 * Represents an error that occurs when an operation times out.
 */
export declare class TimeoutError extends SystemError {
    /**
     * Creates a new instance of the TimeoutError class.
     * @param message - The error message.
     */
    constructor(message?: string);
}
