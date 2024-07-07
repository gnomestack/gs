import { SystemError } from "./system_error.js";
declare let sprintf: (format: string, ...args: unknown[]) => string;
export declare function setFormat(f: typeof sprintf): void;
/**
 * Creates a new SystemError with a formatted error message.
 *
 * @param message - The error message string.
 * @param args - Additional arguments to be formatted into the error message.
 * @returns A new SystemError instance.
 */
export declare function errorf(message: string, ...args: unknown[]): SystemError;
export {};
