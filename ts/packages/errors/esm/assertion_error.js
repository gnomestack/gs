import { SystemError } from "./system_error.js";
/**
 * Represents an assertion error.
 */
export class AssertionError extends SystemError {
    constructor(message) {
        super(message || "Assertion failed.");
        this.name = "AssertionError";
    }
}
