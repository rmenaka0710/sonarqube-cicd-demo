const assert = require("assert");
const { calculateDiscount } = require("./server");

assert.strictEqual(calculateDiscount({ type: "premium" }), 20);
assert.strictEqual(calculateDiscount({ type: "regular" }), 0);

console.log("All tests passed");
