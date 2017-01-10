var reverseString = require('./library.js');

describe("Produce the reverse order of a word: ", function() {
  describe("Case for en empty string", function() {

    it("should return null for empty string", function() {
      expect(reverseString('')).toBeNull();
    });

  });

  describe("Case for palindromes", function() {

    it("should return true for `a`", function() {
      expect(reverseString('a')).toBe(true);
    });

    it("should return true for `anna`", function() {
      expect(reverseString('anna')).toBe(true);
    });

    it("should return true for `NaN`", function() {
      expect(reverseString('NaN')).toBe(true);
    });

    it("should return true for `civic`", function() {
      expect(reverseString('civic')).toBe(true);
    });

    it("should return true for `madam`", function() {
      expect(reverseString('madam')).toBe(true);
    });

  });

  describe("Case for normal words", function() {

    it("should return `skoob` for `books`", function() {
      expect(reverseString('books')).toEqual('skoob');
    });

    it("should return `nomolos` for `solomon`", function() {
      expect(reverseString('solomon')).toEqual('nomolos');
    });

    it("should return `csim` for `misc`", function() {
      expect(reverseString('misc')).toEqual('csim');
    });

    it("should return `@#%!*` for `!%#@`", function() {
      expect(reverseString('!%#@')).toEqual('@#%!');
    });

    it("should return `orajnamilik` for `kilimanjaro`", function() {
      expect(reverseString('kilimanjaro')).toEqual('orajnamilik');
    });

  });

});