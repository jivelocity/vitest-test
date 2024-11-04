import { it, expect, describe, beforeEach } from "vitest";
import {
  calculateDiscount,
  canDrive,
  fetchData,
  getCoupons,
  isPriceInRange,
  isValidUsername,
  Stack,
  validateUserInput,
} from "../src/core";

describe("getCoupons", () => {
  it("should return an array of coupons", () => {
    const coupons = getCoupons();
    expect(Array.isArray(coupons)).toBe(true);
    expect(coupons.length).toBeGreaterThan(0);
  });

  it("should return an array with valid coupon codes", () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("code");
      expect(typeof coupon.code).toBe("string");
      expect(coupon.code).toBeTruthy();
    });
  });

  it("should return an array with valid discounts", () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("discount");
      expect(typeof coupon.discount).toBe("number");
      expect(coupon.discount).toBeGreaterThan(0);
      expect(coupon.discount).toBeLessThan(1);
    });
  });
});

describe("calculateDiscons", () => {
  it("should return discounted price if given valid code", () => {
    expect(calculateDiscount(10, "SAVE10")).toBe(9);
  });
  it("should return discounted price if given valid code", () => {
    expect(calculateDiscount(10, "SAVE20")).toBe(8);
  });
  it("should handle non-numeric price", () => {
    expect(calculateDiscount("10", "SAVE10")).toMatch(/invalid/i);
  });
  it("should handle negative price", () => {
    expect(calculateDiscount(-10, "SAVE10")).toMatch(/invalid/i);
  });
  it("should handle non-string discount code", () => {
    expect(calculateDiscount(10, 10)).toMatch(/invalid/i);
  });
  it("should handle invalid discount code", () => {
    expect(calculateDiscount(10, "INVALID")).toBe(10);
  });
});

describe("validateUserInput", () => {
  it("should return success if given valid input", () => {
    expect(validateUserInput("alice", 18)).toMatch(/success/i);
  });
  it("should return error if username is not a string", () => {
    expect(validateUserInput(1, 18)).toMatch(/invalid/i);
  });
  it("should return error if username less than 3 ", () => {
    expect(validateUserInput("al", 18)).toMatch(/invalid/i);
  });
  it("should return error if username is longer than 255 characters ", () => {
    expect(validateUserInput("a".repeat(256), 18)).toMatch(/invalid/i);
  });
  it("should return error if age is not a number", () => {
    expect(validateUserInput("alice", "18")).toMatch(/invalid/i);
  });
  it("should return error if age is less than 18", () => {
    expect(validateUserInput("alice", 17)).toMatch(/invalid/i);
  });
  it("should return error if age is more then 100", () => {
    expect(validateUserInput("alice", 101)).toMatch(/invalid/i);
  });
  it("should return error if both username and age are invalid", () => {
    expect(validateUserInput(1, "18")).toMatch(/invalid/i);
  });
});

describe("isPriceInRange", () => {
  it.each([
    { scenario: "price < min", price: -10, result: false },
    { scenario: "price = min", price: 0, result: true },
    { scenario: "min < price < max", price: 10, result: true },
    { scenario: "price = max", price: 100, result: true },
    { scenario: "price > max", price: 200, result: false },
  ])("should return $result when $scenario", ({ price, result }) => {
    expect(isPriceInRange(price, 0, 100)).toBe(result);
  });

  // it("should return false when the price is outside the range", () => {
  //   expect(isPriceInRange(-10, 0, 100)).toBe(false);
  //   expect(isPriceInRange(110, 0, 100)).toBe(false);
  // });
  // it("should return true when the price is at the edge of the range", () => {
  //   expect(isPriceInRange(0, 0, 100)).toBe(true);
  //   expect(isPriceInRange(100, 0, 100)).toBe(true);
  // });
  // it("should return true when the price is within the range", () => {
  //   expect(isPriceInRange(10, 0, 100)).toBe(true);
  // });
});

describe("isValidUsername", () => {
  const minLength = 5;
  const maxLength = 15;
  it("should return false if username is too short", () => {
    expect(isValidUsername("a".repeat(minLength - 1))).toBe(false);
  });
  it("should return false if username is too long", () => {
    expect(isValidUsername("a".repeat(maxLength + 1))).toBe(false);
  });
  it("should return true if username is within the length range", () => {
    expect(isValidUsername("a".repeat(minLength))).toBe(true);
    expect(isValidUsername("a".repeat(maxLength))).toBe(true);
  });
  it("should return true if username is within the length constraint", () => {
    expect(isValidUsername("a".repeat(minLength + 1))).toBe(true);
    expect(isValidUsername("a".repeat(maxLength - 1))).toBe(true);
  });
  it("should return false for invalid input types", () => {
    expect(isValidUsername(null)).toBe(false);
    expect(isValidUsername(undefined)).toBe(false);
    expect(isValidUsername(123)).toBe(false);
  });
});

describe("canDrive", () => {
  it("should return error for invalid country code", () => {
    expect(canDrive(20, "FR")).toMatch(/invalid/i);
  });

  it.each([
    { age: 15, country: "US", expected: false },
    { age: 16, country: "US", expected: true },
    { age: 17, country: "US", expected: true },
    { age: 16, country: "UK", expected: false },
    { age: 17, country: "UK", expected: true },
    { age: 18, country: "UK", expected: true },
  ])(
    "should return $expected for $age, $country",
    ({ age, country, expected }) => {
      expect(canDrive(age, country)).toBe(expected);
    },
  );

  // it("should return false for underage in the US", () => {
  //   expect(canDrive(15, "US")).toBe(false);
  // });
  //
  // it("should return true for legal age in the US", () => {
  //   expect(canDrive(16, "US")).toBe(true);
  // });
  //
  // it("should return true for eligible age in the US", () => {
  //   expect(canDrive(17, "US")).toBe(true);
  // });
  //
  // it("should return false for underage in the UK", () => {
  //   expect(canDrive(16, "UK")).toBe(false);
  // });
  //
  // it("should return true for legal age in the UK", () => {
  //   expect(canDrive(17, "UK")).toBe(true);
  // });
  //
  // it("should return true for eligible age in the UK", () => {
  //   expect(canDrive(18, "UK")).toBe(true);
  // });
});

describe("fetchData", () => {
  it("should return a promise that will resole to an array of numbers", async () => {
    try {
      await fetchData();
    } catch (error) {
      expect(error).toHaveProperty("reason");
      expect(error.reason).toMatch(/fail/i);
    }
  });
});

describe("Stack", () => {
  let stack;
  beforeEach(() => {
    stack = new Stack();
  });

  it("push should add an item to the stack", () => {
    stack.push(1);
    expect(stack.size()).toBe(1);
  });
  it("pop should remove an item from the stack", () => {
    stack.push(1);
    stack.push(2);
    const poppedItem = stack.pop();
    expect(poppedItem).toBe(2);
    expect(stack.size()).toBe(1);
  });
  it("pop should throw an error if the stack is empty", () => {
    expect(() => stack.pop()).toThrow(/empty/i);
  });
  it("peek should return the top item from the stack without removing", () => {
    stack.push(1);
    stack.push(2);
    const peekedItem = stack.peek();
    expect(peekedItem).toBe(2);
    expect(stack.size()).toBe(2);
  });
  it("peek should throw an error if the stack is empty", () => {
    expect(() => stack.peek()).toThrow(/empty/i);
  });
  it("isEmpty should return true if the stack is empty", () => {
    expect(stack.isEmpty()).toBe(true);
  });
  it("isEmpty should return false if the stack is not empty", () => {
    stack.push(1);
    expect(stack.isEmpty()).toBe(false);
  });
  it("size should return the number of items in the stack", () => {
    stack.push(1);
    stack.push(2);
    expect(stack.size()).toBe(2);
  });
  it("clear should remove all items from the stack", () => {
    stack.push(1);
    stack.push(2);
    stack.clear();
    expect(stack.isEmpty()).toBe(true);
  });
});
