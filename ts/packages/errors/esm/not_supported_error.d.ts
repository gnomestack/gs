import { SystemError } from "./system_error.js";
/**
 * Represents an error that occurs when an operation is not supported.
 */
export declare class NotSupportedError extends SystemError {
    constructor(message?: string);
}
