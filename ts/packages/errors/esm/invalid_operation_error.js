import { SystemError } from "./system_error.js";
/**
 * Represents an error that occurs when an invalid operation is performed.
 */
export class InvalidOperationError extends SystemError {
    /**
     * Creates a new instance of the InvalidOperationError class.
     * @param message - The error message.
     */
    constructor(message) {
        super(message || "Invalid operation");
        this.name = "InvalidOperationError";
    }
}
