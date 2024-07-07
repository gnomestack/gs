import { toErrorRecord, type ErrorRecord } from "./error-record";

export class Response<T = unknown, E = ErrorRecord> implements Record<string, unknown>
{

    #value?: T;
    #error?: E;

    constructor(value?: T, error?: E) {
        this.#value = value;
        this.#error = error;
    }

    [key: string]: unknown;

    get ok(): boolean {
        return this.#error === undefined;
    }

    get value(): T | undefined {
        return this.#value;
    }

    get error(): E | undefined {
        return this.#error;
    }

    toJSON() : string {
        const r : Record<string, unknown> = {
            ok: this.ok,
        };

        if (this.value) {
            r["value"] = this.value;
        }

        if (this.error) {
            r["error"] = this.error;
        }

        return JSON.stringify(r);
    }
}

export interface NextLink extends Record<string, unknown> {

    toString(): string | undefined;
}

const emptyNextLink: NextLink = {
    toString() {
        return "";
    }
};

export class PagedResponse<T, E = ErrorRecord> extends Response<T[], E> {
    #nextToken: NextLink;

    constructor(value?: T[], error?: E, nextLink?: NextLink) {
        super(value, error);
        this.#nextToken = nextLink ?? emptyNextLink;
        const nextLinkValue = this.#nextToken.toString();
        if (nextLinkValue) {
            this["@nextLink"] = nextLinkValue;
        }
    }

    setNextLink(nextLink: NextLink) {
        this.#nextToken = nextLink;
        const nextLinkValue = this.#nextToken.toString();
        if (nextLinkValue) {
            this["@nextLink"] = nextLinkValue;
        } else {
            delete this["@nextLink"];
        }
    }
    
    toJSON(): string {
        const r : Record<string, unknown> = {
            ok: this.ok,
        };

        if (this.value) {
            r["value"] = this.value;
        }

        if (this.error) {
            r["error"] = this.error;
        }

        r["@nextLink"] = this.#nextToken.toString();

        return JSON.stringify(r);
    }
}

export function respond<T, E = ErrorRecord>(value: T): Response<T, E> {
    return new Response(value);
}

export function fail<T = unknown, E = ErrorRecord>(error: E): Response<T, E> {
    return new Response<T, E>(undefined, error);
}

export function failWithError<T = unknown>(error: Error): Response<T, ErrorRecord> {
    return new Response<T, ErrorRecord>(undefined, toErrorRecord(error));
}

export function page<T, E = ErrorRecord>(value: T[], nextLink: NextLink): PagedResponse<T, E> {
    return new PagedResponse<T, E>(value, undefined, nextLink);
}

