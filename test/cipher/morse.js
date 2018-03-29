'use strict';
var expect = require('chai').expect;
var morse = require('../../dist/src/cipher/morse.js');

describe('morse', () => {
    describe('encrypt', function () {
        it('', () => {
            const plaintext = 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
            const expectedCiphertext = '.-.. --- .-. . -- / .. .--. ... ..- -- / -.. --- .-.. --- .-. / ... .. - / .- -- . - --..-- / -.-. --- -. ... . -.-. - . - ..- .-. / .- -.. .. .--. .. ... -.-. .. -. --. / . .-.. .. - --..-- / ... . -.. / -.. --- / . .. ..- ... -- --- -.. / - . -- .--. --- .-. / .. -. -.-. .. -.. .. -.. ..- -. - / ..- - / .-.. .- -... --- .-. . / . - / -.. --- .-.. --- .-. . / -- .- --. -. .- / .- .-.. .. --.- ..- .-';
            expect(morse.encrypt(plaintext)).to.equal(expectedCiphertext);
        });
    });
    describe('decrypt', function () {
        it('', function () {
            const ciphertext = '.-.. --- .-. . -- / .. .--. ... ..- -- / -.. --- .-.. --- .-. / ... .. - / .- -- . - --..-- / -.-. --- -. ... . -.-. - . - ..- .-. / .- -.. .. .--. .. ... -.-. .. -. --. / . .-.. .. - --..-- / ... . -.. / -.. --- / . .. ..- ... -- --- -.. / - . -- .--. --- .-. / .. -. -.-. .. -.. .. -.. ..- -. - / ..- - / .-.. .- -... --- .-. . / . - / -.. --- .-.. --- .-. . / -- .- --. -. .- / .- .-.. .. --.- ..- .-';
            const expectedPlaintext = 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
            expect(morse.decrypt(ciphertext)).to.equal(expectedPlaintext);
        });
    });
});