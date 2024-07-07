import { SystemError } from "./system_error.js";
/**
 * Represents an assertion error.
 */
export declare class AssertionError extends SystemError {
    constructor(message?: string);
}
