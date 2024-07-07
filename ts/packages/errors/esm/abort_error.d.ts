import { SystemError } from "./system_error.js";
/**
 * Represents an abort error.
 */
export declare class AbortError extends SystemError {
    constructor(message?: string);
}
