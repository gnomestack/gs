import { SystemError } from "./system_error.js";
/**
 * Represents an error that occurs when an invalid argument is passed to a function or method.
 */
export class ArgumentError extends SystemError {
    /**
     * The name of the invalid argument.
     */
    parameterName;
    /**
     * Creates a new instance of the ArgumentError class.
     * @param parameterName - The name of the invalid argument.
     * @param message - The error message.
     */
    constructor(parameterName = null, message) {
        super(message || `Argument ${parameterName} is invalid.`);
        this.parameterName = parameterName;
        this.name = "ArgumentError";
    }
    /**
     * Converts the ArgumentError instance to a plain object.
     * @returns The plain object representation of the ArgumentError instance.
     */
    toObject() {
        return {
            ...super.toObject(),
            parameterName: this.parameterName,
        };
    }
}
