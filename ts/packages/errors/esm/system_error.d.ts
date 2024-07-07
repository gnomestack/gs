/**
 * Represents an inner error.
 */
export interface InnerError extends Record<string, unknown> {
    /**
     * The error message.
     */
    readonly message?: string;
    /**
     * The error code.
     */
    readonly code?: string;
    /**
     * The inner error.
     */
    readonly innerError?: InnerError;
}
/**
 * Represents the properties of an error.
 */
export interface ErrorProps extends InnerError {
    /**
     * The target of the error.
     */
    readonly target?: string;
    /**
     * Additional details about the error.
     */
    details?: ErrorProps[];
}
/**
 * Represents an aggregate error that contains multiple errors.
 */
export declare class SystemAggregateError extends AggregateError implements ErrorProps {
    #private;
    /**
     * The link to the documentation for the error.
     */
    link?: string | URL;
    /**
     * The errors that occurred.
     */
    errors: SystemError[];
    /**
     * Creates a new instance of the AggregateError class.
     * @param message - The error message.
     * @param errors - The errors that occurred.
     * @param innerError - The inner error.
     */
    constructor(message?: string, errors?: SystemError[], innerError?: Error);
    [key: string]: unknown;
    /**
     * The error code.
     */
    get code(): string | undefined;
    set code(value: string | undefined);
    /**
     * The target of the error. Often used to store the
     * name of the method that threw the error.
     */
    get target(): string | undefined;
    set target(value: string | undefined);
    /**
     * The inner error.
     */
    get innerError(): InnerError | undefined;
    /**
     * Sets the properties of the error.
     * @param props The properties to set.
     * @returns The error instance.
     */
    set(props: Partial<this>): this;
    set stack(value: string | undefined);
    /**
     * The stack trace of the error. This is a read-only property
     * that removes the message and only returns the stack trace
     * as an array of strings.
     */
    get stackTrace(): string[];
    set stackTrace(value: string[]);
    /**
     * Converts the error to an object.
     * @returns The error as an object.
     */
    toObject(): ErrorProps;
    /**
     * Creates an AggregateError instance from an existing AggregateError.
     * @param error - The existing AggregateError instance.
     * @returns A new AggregateError instance.
     */
    static from(error: globalThis.AggregateError): SystemAggregateError;
}
/**
 * Represents a system error.
 * Extends the built-in Error class.
 */
export declare class SystemError extends Error implements ErrorProps {
    #private;
    name: string;
    /**
     * The link to the documentation for the error.
     */
    link?: string | URL;
    constructor(message: string, innerError?: Error | unknown);
    [key: string]: unknown;
    /**
     * The error code.
     */
    get code(): string | undefined;
    set code(value: string | undefined);
    /**
     * The target of the error. Often used to store the
     * name of the method that threw the error.
     */
    get target(): string | undefined;
    set target(value: string | undefined);
    /**
     * The inner error.
     */
    get innerError(): InnerError | undefined;
    /**
     * Sets the properties of the error.
     * @param props The properties to set.
     * @returns The error instance.
     */
    set(props: Partial<this>): this;
    set stack(value: string | undefined);
    /**
     * The stack trace of the error. This is a read-only property
     * that removes the message and only returns the stack trace
     * as an array of strings.
     */
    get stackTrace(): string[];
    set stackTrace(value: string[]);
    /**
     * Converts the error to an object.
     * @returns The error as an object.
     */
    toObject(): ErrorProps;
}
