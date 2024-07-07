import { ok, err, Result } from "./result";
import { test, assert } from "vitest";

const { throws  } = assert;
const equals = assert.equal;
const yes = assert.ok;

test("Result: ok", () => {
    const result = ok(42);
    yes(result.isOk);
    yes(result.unwrap() === 42);
});

test("Result: err", () => {
    const result = err("Error");
    yes(result.isError);
    yes(() => result.unwrap(), "Error");
});

test("Result: ok property", () => {
    const result = ok(42);
    yes(result.isOk);
    yes(result.ok().isSome);
    yes(result.ok().unwrap() === 42);
    yes(result.error().isNone);

    const other = err("Error");
    yes(other.isError);
    yes(() => other.unwrap(), "Error");
    yes(other.ok().isNone);
    yes(other.error().isSome);
});

test("Result: and", () => {
    const result = ok(42);
    const other = ok(43);
    yes(result.and(other).unwrap() === 43);
});

test("Result: andThen", () => {
    const result = ok(42);
    const other = ok(43);
    yes(result.andThen(() => other).unwrap() === 43);
});

test("Result: or", () => {
    const result = ok(42);
    const other = ok(43);
    yes(result.or(other).unwrap() === 42);
});

test("Result: orElse", () => {
    const result = ok(42);
    const other = ok(43);
    yes(result.orElse(() => other).unwrap() === 42);
});

test("Result: expect", () => {
    const result = ok(42);
    equals(result.expect("Result is Error"), 42);

    const other = err("Error");

    throws(() => other.expect("Result is Error"), Error, "Result is Error");
});

test("Result: map", () => {
    const result = ok(42);
    const other = result.map((value) => value + 1);
    yes(other.unwrap() === 43);
});

test("Result: mapOr", () => {
    const result = ok(42);
    const other = result.mapOr(0, (value) => value + 1);
    yes(other === 43);

    const otherResult = err("Error");
    const otherOther = otherResult.mapOr(0, (value) => value + 1);
    yes(otherOther === 0);
});

test("Result: mapOrElse", () => {
    const result = ok(42);
    const other = result.mapOrElse(() => 0, (value) => value + 1);
    yes(other === 43);

    const otherResult = err("Error");
    const otherOther = otherResult.mapOrElse(() => 0, (value) => value + 1);
    yes(otherOther === 0);
});

test("Result: mapError", () => {
    const result = err("Error");
    const other = result.mapError((error) => error + "!");
    yes(other.unwrapError() === "Error!");
});

test("Result: mapErrorOr", () => {
    const result = err("Error");
    const other = result.mapErrorOr("Default", (error) => error + "!");
    yes(other === "Error!");

    const otherResult = ok(42);
    const otherOther = otherResult.mapErrorOr("Default", (error) => error + "!");
    yes(otherOther === "Default");
});

test("Result: mapErrorOrElse", () => {
    const result = err("Error");
    const other = result.mapErrorOrElse(() => "Default", (error) => error + "!");
    yes(other === "Error!");

    const otherResult = ok(42);
    const otherOther = otherResult.mapErrorOrElse(() => "Default", (error) => error + "!");
    yes(otherOther === "Default");
});

test("Result: inspect", () => {
    let value = 0;
    const result = ok(42);
    result.inspect((v) => value = v);
    yes(value === 42);

    value = 0;
    const other = err("Error");
    other.inspect((v) => value = v);
    yes(value === 0);
});

test("Result: unwrap", () => {
    const result = ok(42);
    equals(result.unwrap(), 42);

    const other = err("Error");
    throws(() => other.unwrap(), Error, "Error");
});

test("Result: unwrapOr", () => {
    const result = ok(42);
    equals(result.unwrapOr(0), 42);

    const other = err<number, string>("Error");
    equals(other.unwrapOr(0), 0);
});

test("Result: unwrapOrElse", () => {
    const result = ok(42);
    equals(result.unwrapOrElse(() => 0), 42);

    const other = err<number, string>("Error");
    equals(other.unwrapOrElse(() => 0), 0);
});

test("Result: unwrapError", () => {
    const result = err("Error");
    equals(result.unwrapError(), "Error");

    const other = ok(42);
    throws(() => other.unwrapError(), Error, "Result is Ok");
});

test("Result: expectError", () => {
    const result = err("Error");
    equals(result.expectError("Result is Ok"), "Error");

    const other = ok(42);
    throws(() => other.expectError("Result is Ok"), Error, "Result is Ok");
});