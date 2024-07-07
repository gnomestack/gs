import { SystemError } from "./system_error.js";
let sprintf = function (format, ...args) {
    let i = 0;
    return format.replace(/%s/g, () => String(args[i++]));
};
export function setFormat(f) {
    sprintf = f;
}
const g = global;
if (typeof g.process !== 'undefined') {
    sprintf = await import('util').then(m => m.format);
}
/**
 * Creates a new SystemError with a formatted error message.
 *
 * @param message - The error message string.
 * @param args - Additional arguments to be formatted into the error message.
 * @returns A new SystemError instance.
 */
export function errorf(message, ...args) {
    return new SystemError(sprintf(message, ...args));
}
