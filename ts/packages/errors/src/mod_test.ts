import { ArgumentError, collect, SystemError, TimeoutError } from "./mod";
import { test, assert } from "vitest";

const { ok, equal, instanceOf } = assert;

test("SystemError", () => {
    const x = new SystemError("test");
    instanceOf(x, Error);
    equal(x.message, "test");
    equal(x.name, "SystemError");
    ok(x.stack);
    equal(x.code, "SystemError");
    ok(x.stackTrace);
    ok(x.stackTrace.length > 0);

    ok(x.toObject());
});

test("TimeoutError", () => {
    const x = new TimeoutError("test");
    instanceOf(x, Error);
    equal(x.message, "test");
    equal(x.name, "TimeoutError");
    ok(x.stack);
    equal(x.code, "TimeoutError");
    ok(x.stackTrace);
    ok(x.stackTrace.length > 0);

    ok(x.toObject());
});

test("ArgumentError", () => {
    const x = new ArgumentError("arg1");
    instanceOf(x, Error);
    equal(x.message, "Argument arg1 is invalid.");
    equal(x.name, "ArgumentError");
    ok(x.stack);
    equal(x.code, "ArgumentError");
    ok(x.stackTrace);
    ok(x.stackTrace.length > 0);

    ok(x.toObject());
});

test("collectError", () => {
    const x = new Error("test");
    const y = new SystemError("test", x);
    const errors = collect(y);

    equal(errors.length, 2);
});
