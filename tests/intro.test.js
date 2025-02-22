import { describe, test, it, expect } from "vitest";
import { calculateAverage, factorial, fizzBuzz, max } from "../src/intro";

describe("max", () => {
  it("should return the first argument if it is greater", () => {
    //AAA Patern

    //Arrage: Turn on the TV
    //Act: Press the power button
    //Assert: verify TV is off

    //Arrage
    //const a = 2;
    //const b = 1;

    // Act
    //const result = max(a, b)

    //Assert
    //expect(result).toBe(2)

    //We can make them single line code
    expect(max(2, 1)).toBe(2);
  });

  it("should return the second argument if it is greater", () => {
    expect(max(1, 2)).toBe(2);
  });
  it("should return the first argument if arguments are equal", () => {
    expect(max(1, 1)).toBe(1);
  });
});

describe("fizzBuzz", () => {
  it("should return FizzBuzz if arg is divisible by 3 and 5", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });
  it("should return Fizz if arg is divisible by 3", () => {
    expect(fizzBuzz(3)).toBe("Fizz");
  });
  it("should return Buzz if arg is divisible by 5", () => {
    expect(fizzBuzz(5)).toBe("Buzz");
  });
});

describe("calculateAverage", () => {
  it("should return Nan if given an empty array", () => {
    expect(calculateAverage([])).toBe(NaN);
  });

  it("should calculate the average of an array with a single element", () => {
    expect(calculateAverage([1])).toBe(1);
  });
  it("should calculate the average of an array with a two element", () => {
    expect(calculateAverage([1, 2])).toBe(1.5);
  });
  it("should calculate the average of an array with a three element", () => {
    expect(calculateAverage([1, 2, 3])).toBe(2);
  });
});

describe("factorial", () => {
  it("should return 1 if given 0", () => {
    expect(factorial(0)).toBe(1);
  });
  it("should return 1 if given 1", () => {
    expect(factorial(0)).toBe(1);
  });
  it("should return 2 if given 2", () => {
    expect(factorial(2)).toBe(2);
  });
  it("should return 6 if given 3", () => {
    expect(factorial(3)).toBe(6);
  });
  it("should return 24 if given 4", () => {
    expect(factorial(4)).toBe(24);
  });
  it("should return undefined if given negative number", () => {
    expect(factorial(-1)).toBeUndefined();
  });
});
