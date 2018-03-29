'use strict';
const expect = require('chai').expect;
const railFence = require('../../lib/cipher/railFence.js');

describe('railFence', () => {
    describe('encode', function () {
        it('Hello, World', () => {
            const plaintext = 'Hello, World!';
            const expectedCiphertext = 'Hoo!el,Wrdl l';
            expect(railFence.encode(plaintext, 3)).to.equal(expectedCiphertext);
        });
        it('WEAREDISCOVEREDFLEEATONCE', () => {
            const plaintext = 'WEAREDISCOVEREDFLEEATONCE';
            const expectedCiphertext = 'WECRLTEERDSOEEFEAOCAIVDEN';
            expect(railFence.encode(plaintext, 3)).to.equal(expectedCiphertext);
        });
        it('hard', function () {
            const plaintext = 'te t batns t!etducotquereueAin.peuia!ui uripe aoeouoiam  mfr V nagie i caed uvetr smiuee  aeiid  sluoi i liei itoienssssisntxia s  fmtiiueePi sne rendptitajvofer omaa  t rtp,qi  cimf eorrtrueosie amnnk dprnlacsrpm!euea  crsveti,Ds i iram o atx ';
            const expectedCiphertext = 'trraet e  t esfooxtvmom   uivamb ujaaadea rteet ina it sc t i  apr tiedts! inpDeeie,,tidrqidg  itua e ecnsn vo lscstVu irq oimcuriPf ef e  rmieeae  uoeu liruemiireAaett!iiimrmno fup.ui erpot oseeosscuoi iaiaeaela ni n!esxarupstmpiisnnd rssn uik';
            expect(railFence.encode(plaintext, 41)).to.equal(expectedCiphertext); 
        });
    });
    describe('decode', function () {
        it('Hello, World', function () {
            const ciphertext = 'Hoo!el,Wrdl l';
            const expectedPlaintext = 'Hello, World!';
            expect(railFence.decode(ciphertext, 3)).to.equal(expectedPlaintext);
        });
        it('WEAREDISCOVEREDFLEEATONCE', function () {
            const ciphertext = 'WECRLTEERDSOEEFEAOCAIVDEN';
            const expectedPlaintext = 'WEAREDISCOVEREDFLEEATONCE';
            expect(railFence.decode(ciphertext, 3)).to.equal(expectedPlaintext);
        });
        it('hard', function () {
            const ciphertext = 'trraet e  t esfooxtvmom   uivamb ujaaadea rteet ina it sc t i  apr tiedts! inpDeeie,,tidrqidg  itua e ecnsn vo lscstVu irq oimcuriPf ef e  rmieeae  uoeu liruemiireAaett!iiimrmno fup.ui erpot oseeosscuoi iaiaeaela ni n!esxarupstmpiisnnd rssn uik';
            const expectedPlaintext = 'te t batns t!etducotquereueAin.peuia!ui uripe aoeouoiam  mfr V nagie i caed uvetr smiuee  aeiid  sluoi i liei itoienssssisntxia s  fmtiiueePi sne rendptitajvofer omaa  t rtp,qi  cimf eorrtrueosie amnnk dprnlacsrpm!euea  crsveti,Ds i iram o atx ';
            expect(railFence.decode(ciphertext, 41)).to.equal(expectedPlaintext);
        });
    });
});