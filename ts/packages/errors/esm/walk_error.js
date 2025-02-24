import { SystemError } from "./system_error.js";
/**
 * Recursively walks through an error and its inner errors (if any),
 * and invokes a callback function for each error encountered.
 * @param e - The error to walk through.
 * @param callback - The callback function to invoke for each error encountered.
 */
export function walk(e, callback) {
    if (e instanceof AggregateError && e.errors) {
        for (const error of e.errors) {
            walk(error, callback);
        }
    }
    if (e instanceof SystemError && e.innerError instanceof Error) {
        walk(e.innerError, callback);
    }
    callback(e);
}
