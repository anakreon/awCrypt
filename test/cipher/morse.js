'use strict';
const expect = require('chai').expect;
const morse = require('../../lib/cipher/morse.js');

describe('morse', () => {
    describe('encode', function () {
        it('', () => {
            const plaintext = 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
            const expectedCiphertext = '.-.. --- .-. . -- / .. .--. ... ..- -- / -.. --- .-.. --- .-. / ... .. - / .- -- . - --..-- / -.-. --- -. ... . -.-. - . - ..- .-. / .- -.. .. .--. .. ... -.-. .. -. --. / . .-.. .. - --..-- / ... . -.. / -.. --- / . .. ..- ... -- --- -.. / - . -- .--. --- .-. / .. -. -.-. .. -.. .. -.. ..- -. - / ..- - / .-.. .- -... --- .-. . / . - / -.. --- .-.. --- .-. . / -- .- --. -. .- / .- .-.. .. --.- ..- .-';
            expect(morse.encode(plaintext)).to.equal(expectedCiphertext);
        });
    });
    describe('decode', function () {
        it('', function () {
            const ciphertext = '.-.. --- .-. . -- / .. .--. ... ..- -- / -.. --- .-.. --- .-. / ... .. - / .- -- . - --..-- / -.-. --- -. ... . -.-. - . - ..- .-. / .- -.. .. .--. .. ... -.-. .. -. --. / . .-.. .. - --..-- / ... . -.. / -.. --- / . .. ..- ... -- --- -.. / - . -- .--. --- .-. / .. -. -.-. .. -.. .. -.. ..- -. - / ..- - / .-.. .- -... --- .-. . / . - / -.. --- .-.. --- .-. . / -- .- --. -. .- / .- .-.. .. --.- ..- .-';
            const expectedPlaintext = 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
            expect(morse.decode(ciphertext)).to.equal(expectedPlaintext);
        });
    });
});