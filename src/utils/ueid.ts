/**
 * Unique-Enough ID
 * Returns a string with at least 64 bits of randomness, e.g. sn1s7vb4gcic.
 * https://github.com/google/closure-library/blob/555e0138c83ed54d25a3e1cd82a7e789e88335a7/closure/goog/string/string.js#L1177
 */
export default function euid(): string {
  const { abs, floor, random } = Math;
  const x = 2147483648; // 2^31

  /* eslint-disable no-bitwise */
  return floor(random() * x).toString(36) + abs(floor(random() * x) ^ +new Date()).toString(36);
}
