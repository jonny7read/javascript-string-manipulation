/* eslint-disable no-unused-vars */
const { describe, it } = require("mocha");
const { lf } = global.lf || require("index.js");

describe("CRLF Converter", () => {
  describe("lf", () => {
    it("should replace CRLF at the beginning of a string", () => {
      const result = lf`\r\nHello there.`;

      assert(result.startsWith('\r'));

      // Use `String.prototype.startsWith()`
    });

    it("should replace CRLF at the end of a string", () => {
      const result = lf`Hello there.\r\n`;

      assert(result.endsWith('\r'));
      // Use `String.prototype.endsWith()`
    });

    it("should replace CRLF in the middle of a string", () => {
      const result = lf`Hello \r\n\r\nthere.`;

      assert(result.includes('\r'));
      // Use `String.prototype.includes()`
    });
  });
});
