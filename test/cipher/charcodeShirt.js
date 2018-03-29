'use strict';
var expect = require('chai').expect;
var charcodeShift = require('../../dist/src/cipher/charcodeShift.js');

describe('charcodeShift', () => {
    describe('encrypt', function () {
        it('alpha', () => {
            const key = 10;
            const plaintext = 'abcdefghij';
            const expectedCiphertext = 'klmnopqrst';
            expect(charcodeShift.encrypt(plaintext, key)).to.equal(expectedCiphertext);
        });
        it('into non-alphabet characters', () => {
            const key = 10;
            const plaintext = 'stuvwxyz';
            const expectedCiphertext = String.fromCharCode(125, 126, 127, 128, 129, 130, 131, 132);
            expect(charcodeShift.encrypt(plaintext, key)).to.equal(expectedCiphertext);
        });
    });
    describe('decrypt', function () {
        it('alpha', function () {
            const key = 10;
            const ciphertext = 'klmnopqrst';
            const expectedPlaintext = 'abcdefghij';
            expect(charcodeShift.decrypt(ciphertext, key)).to.equal(expectedPlaintext);
        });
        it('from non-alphabet characters', () => {
            const key = 10;
            const ciphertext = String.fromCharCode(125, 126, 127, 128, 129, 130, 131, 132);
            const expectedPlaintext = 'stuvwxyz';
            expect(charcodeShift.decrypt(ciphertext, key)).to.equal(expectedPlaintext);
        });
    });
});