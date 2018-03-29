'use strict';
var expect = require('chai').expect;
var substitution = require('../../dist/src/cipher/substitution.js');

describe('substitution', () => {
    describe('encrypt', function () {
        it('alpha', () => {
            const keyword = 'CIPHER';
            const plaintext = 'WIKIPEDIA';
            const expectedCiphertext = 'MUWUBEHUC';
            expect(substitution.encrypt(plaintext, keyword)).to.equal(expectedCiphertext);
        });
    });
    describe('decrypt', function () {
        it('basic', function () {
            const keyword = 'CIPHER';
            const ciphertext = 'MUWUBEHUC';
            const expectedPlaintext = 'WIKIPEDIA';
            expect(substitution.decrypt(ciphertext, keyword)).to.equal(expectedPlaintext);
        });
    });
});