

export interface ErrorRecord extends Record<string, unknown> {
    code: string 
    message: string
    target?: string
    details?: Array<ErrorRecord>
    innerError?: InnerError
}

export interface InnerError extends Record<string, unknown> {
    code?: string;
    innerError?: InnerError
}

export class SystemErrorRecord implements ErrorRecord {
    code: string
    message: string
    target?: string
    details?: Array<ErrorRecord>
    innerError?: InnerError

    constructor(message?: string, innerError?: InnerError) {
        this.code = "Error"
        this.message = message || "An unknown error occurred."
        this.innerError = innerError
    }

    [key: string]: unknown
}

export function toErrorRecord(error: Error): ErrorRecord {
    const errorRecord = new SystemErrorRecord(error.message)
    errorRecord.code = error.name;
    for (const key of Object.keys(error)) {
        errorRecord[key] = (error as any)[key]
    }

    return errorRecord
}