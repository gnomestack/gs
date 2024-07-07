import { SystemError } from "./system_error.js";
/**
 * Represents an error that occurs when an invalid cast is attempted.
 */
export class InvalidCastError extends SystemError {
    /**
     * Creates a new instance of the InvalidCastError class.
     * @param message - The error message.
     */
    constructor(message) {
        super(message || "Invalid cast");
        this.name = "InvalidCastError";
    }
}
