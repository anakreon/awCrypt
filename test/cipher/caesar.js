'use strict';
const expect = require('chai').expect;
const caesar = require('../../lib/cipher/caesar.js');

describe('caesar', () => {
    describe('encode', function () {
        it('basic', () => {
            const key = 10;
            const plaintext = 'abcdefghij';
            const expectedCiphertext = 'KLMNOPQRST';
            expect(caesar.encode(plaintext, key)).to.equal(expectedCiphertext);
        });
        it('end to beginning of alphabet', () => {
            const key = 10;
            const plaintext = 'stuvwxyz';
            const expectedCiphertext = 'CDEFGHIJ';
            expect(caesar.encode(plaintext, key)).to.equal(expectedCiphertext);
        });
        it('key same as alphabet length', () => {
            const key = 26;
            const plaintext = 'abcdefghij';
            const expectedCiphertext = 'ABCDEFGHIJ';
            expect(caesar.encode(plaintext, key)).to.equal(expectedCiphertext);
        });
        it('key longer than alphabet length', () => {
            const key = 36;
            const plaintext = 'abcdefghij';
            const expectedCiphertext = 'KLMNOPQRST';
            expect(caesar.encode(plaintext, key)).to.equal(expectedCiphertext);
        });
    });
    describe('decode', function () {
        it('basic', function () {
            const key = 10;
            const ciphertext = 'KLMNOPQRST';
            const expectedPlaintext = 'abcdefghij';
            expect(caesar.decode(ciphertext, key)).to.equal(expectedPlaintext);
        });
        it('end to beginning of alphabet', () => {
            const key = 10;
            const ciphertext = 'CDEFGHIJ';
            const expectedPlaintext = 'stuvwxyz';
            expect(caesar.decode(ciphertext, key)).to.equal(expectedPlaintext);
        });
        it('key same as alphabet length', () => {
            const key = 26;
            const ciphertext = 'ABCDEFGHIJ';
            const expectedPlaintext = 'abcdefghij';
            expect(caesar.decode(ciphertext, key)).to.equal(expectedPlaintext);
        });
        it('key longer than alphabet length', () => {
            const key = 36;
            const ciphertext = 'KLMNOPQRST';
            const expectedPlaintext = 'abcdefghij';
            expect(caesar.decode(ciphertext, key)).to.equal(expectedPlaintext);
        });
    });
});