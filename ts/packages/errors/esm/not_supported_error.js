import { SystemError } from "./system_error.js";
/**
 * Represents an error that occurs when an operation is not supported.
 */
export class NotSupportedError extends SystemError {
    constructor(message) {
        super(message || "Operation is not supported.");
        this.name = "NotSupportedError";
    }
}
