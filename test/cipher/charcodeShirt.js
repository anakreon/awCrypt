'use strict';
const expect = require('chai').expect;
const charcodeShift = require('../../lib/cipher/charcodeShift.js');

describe('charcodeShift', () => {
    describe('encode', function () {
        it('alpha', () => {
            const key = 10;
            const plaintext = 'abcdefghij';
            const expectedCiphertext = 'klmnopqrst';
            expect(charcodeShift.encode(plaintext, key)).to.equal(expectedCiphertext);
        });
        it('into non-alphabet characters', () => {
            const key = 10;
            const plaintext = 'stuvwxyz';
            const expectedCiphertext = String.fromCharCode(125, 126, 127, 128, 129, 130, 131, 132);
            expect(charcodeShift.encode(plaintext, key)).to.equal(expectedCiphertext);
        });
    });
    describe('decode', function () {
        it('alpha', function () {
            const key = 10;
            const ciphertext = 'klmnopqrst';
            const expectedPlaintext = 'abcdefghij';
            expect(charcodeShift.decode(ciphertext, key)).to.equal(expectedPlaintext);
        });
        it('from non-alphabet characters', () => {
            const key = 10;
            const ciphertext = String.fromCharCode(125, 126, 127, 128, 129, 130, 131, 132);
            const expectedPlaintext = 'stuvwxyz';
            expect(charcodeShift.decode(ciphertext, key)).to.equal(expectedPlaintext);
        });
    });
});