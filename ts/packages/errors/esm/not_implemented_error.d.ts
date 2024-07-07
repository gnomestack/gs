import { SystemError } from "./system_error.js";
/**
 * Represents an error that occurs when a method or
 * functionality is not implemented.
 */
export declare class NotImplementedError extends SystemError {
    /**
     * Creates a new instance of the NotImplementedError class.
     * @param message - The error message.
     */
    constructor(message?: string);
}
