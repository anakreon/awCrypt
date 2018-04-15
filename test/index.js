'use strict';
const expect = require('chai').expect;
const index = require('../lib/index.js');

describe('ascii85', () => {    
    it('', () => {
        expect(index.ascii85).to.not.be.undefined;
        expect(index.ascii85.encode).to.not.be.undefined;
        expect(index.ascii85.decode).to.not.be.undefined;
    });
});

describe('base64', () => {    
    it('', () => {
        expect(index.base64).to.not.be.undefined;
        expect(index.base64.encode).to.not.be.undefined;
        expect(index.base64.decode).to.not.be.undefined;
    });
});

describe('caesar', () => {    
    it('', () => {
        expect(index.caesar).to.not.be.undefined;
        expect(index.caesar.encode).to.not.be.undefined;
        expect(index.caesar.decode).to.not.be.undefined;
    });
});

describe('charcodeShift', () => {    
    it('', () => {
        expect(index.charcodeShift).to.not.be.undefined;
        expect(index.charcodeShift.encode).to.not.be.undefined;
        expect(index.charcodeShift.decode).to.not.be.undefined;
    });
});

describe('morse', () => {    
    it('', () => {
        expect(index.morse).to.not.be.undefined;
        expect(index.morse.encode).to.not.be.undefined;
        expect(index.morse.decode).to.not.be.undefined;
    });
});

describe('railFence', () => {    
    it('', () => {
        expect(index.railFence).to.not.be.undefined;
        expect(index.railFence.encode).to.not.be.undefined;
        expect(index.railFence.decode).to.not.be.undefined;
    });
});

describe('substitution', () => {    
    it('', () => {
        expect(index.substitution).to.not.be.undefined;
        expect(index.substitution.encode).to.not.be.undefined;
        expect(index.substitution.decode).to.not.be.undefined;
    });
});