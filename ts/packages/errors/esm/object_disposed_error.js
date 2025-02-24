import { SystemError } from "./system_error.js";
/**
 * Represents an error that is thrown when an object has been disposed.
 */
export class ObjectDisposedError extends SystemError {
    /**
     * Creates a new instance of the ObjectDisposedError class.
     * @param message - The error message.
     * @param innerError - The inner error, if any.
     */
    constructor(message, innerError) {
        super(message || "Object has been disposed.", innerError);
        this.name = "ObjectDisposedError";
    }
}
