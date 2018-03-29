'use strict';
const expect = require('chai').expect;
const substitution = require('../../lib/cipher/substitution.js');

describe('substitution', () => {
    describe('encode', function () {
        it('alpha', () => {
            const keyword = 'CIPHER';
            const plaintext = 'WIKIPEDIA';
            const expectedCiphertext = 'MUWUBEHUC';
            expect(substitution.encode(plaintext, keyword)).to.equal(expectedCiphertext);
        });
    });
    describe('decode', function () {
        it('basic', function () {
            const keyword = 'CIPHER';
            const ciphertext = 'MUWUBEHUC';
            const expectedPlaintext = 'WIKIPEDIA';
            expect(substitution.decode(ciphertext, keyword)).to.equal(expectedPlaintext);
        });
    });
});