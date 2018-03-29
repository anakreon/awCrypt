'use strict';
const expect = require('chai').expect;
const ascii85 = require('../../lib/cipher/ascii85.js');

describe('ascii85', () => {
    describe('encode', function () {
        it('easy', () => {
            const plaintext = 'easy';
            const expectedCiphertext = '<~ARTY*~>';
            expect(ascii85.encode(plaintext)).to.equal(expectedCiphertext);
        });
        it('lorem ipsum - short', () => {
            const plaintext = 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
            const expectedCiphertext = '<~Ci=?*D\'3P3F*2=BA8c:&EZfF;F<G"/ATTIG@rH7+ARfgnFEMUH@:X(kBldcuDJ()\'Ch[uB+EM+)+CoC5ASH:.D/Wr-FCf<.DfQt7DI[BkBk2@(F<G^J+DbIqDfTD3ATT&*Des?4AKYhuB5V-#@;KXtF^Y~>';
            expect(ascii85.encode(plaintext)).to.equal(expectedCiphertext);
        });
        it('lorem ipsum - full', () => {
            const plaintext = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
            const expectedCiphertext = '<~9Q+r_D\'3P3F*2=BA8c:&EZfF;F<G"/ATTIG@rH7+ARfgnFEMUH@:X(kBldcuDJ()\'Ch[uB+EM+)+CoC5ASH:.D/Wr-FCf<.DfQt7DI[BkBk2@(F<G^J+DbIqDfTD3ATT&*Des?4AKYhuB5V-#@;KXtF^ZmF<HK?pDJ<r1@:UKtBl7X%+Eh=6Bjkj0+E;O<F!,@=F*)GFA0>H.ATD9pFCB9*Df-\\?Ci!Ns@rEK+@:F.qBlbD7Bldu2F`\\a7Ch[m3BlG2+GT^R++Cf>,D/Ws\'+Cf>-F(K?6@<=+E7!33b+CTD7AKY]-F`M%9A8c:&EZf(6+ED%4Eb/oqDId=!BlkJ3DBO+@Cis]=@<?\'\'G%GK(F<G.9F(HJ(Bl%U.D\'3A-Ci=?*+D#[<Ap%a#@<<W0F_kl&+E1b0Bjl++E\\8J\'G[k<(FCfT8+EM77F<GL3@prqY@<<W%F`;&*@<>q"+Du+8+E2@>Bk1dmF=\\PUF`):DBl5&\'F_l#*+E;O<+E(k(Bk(jc+Co&)ATDp2F<GF=Ci!g-+CT/%D\'3P\'+D#V9+DbIqDfTu;/c~>';
            expect(ascii85.encode(plaintext)).to.equal(expectedCiphertext);
        });
    });
    describe('decode', function () {
        it('easy', function () {
            const ciphertext = '<~ARTY*~>';
            const expectedPlaintext = 'easy';
            expect(ascii85.decode(ciphertext)).to.equal(expectedPlaintext);
        });
        it('lorem ipsum - short', function () {
            const ciphertext = '<~Ci=?*D\'3P3F*2=BA8c:&EZfF;F<G"/ATTIG@rH7+ARfgnFEMUH@:X(kBldcuDJ()\'Ch[uB+EM+)+CoC5ASH:.D/Wr-FCf<.DfQt7DI[BkBk2@(F<G^J+DbIqDfTD3ATT&*Des?4AKYhuB5V-#@;KXtF^Y~>';
            const expectedPlaintext = 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
            expect(ascii85.decode(ciphertext)).to.equal(expectedPlaintext);
        });
        it('lorem ipsum - full', function () {
            const ciphertext = '<~9Q+r_D\'3P3F*2=BA8c:&EZfF;F<G"/ATTIG@rH7+ARfgnFEMUH@:X(kBldcuDJ()\'Ch[uB+EM+)+CoC5ASH:.D/Wr-FCf<.DfQt7DI[BkBk2@(F<G^J+DbIqDfTD3ATT&*Des?4AKYhuB5V-#@;KXtF^ZmF<HK?pDJ<r1@:UKtBl7X%+Eh=6Bjkj0+E;O<F!,@=F*)GFA0>H.ATD9pFCB9*Df-\\?Ci!Ns@rEK+@:F.qBlbD7Bldu2F`\\a7Ch[m3BlG2+GT^R++Cf>,D/Ws\'+Cf>-F(K?6@<=+E7!33b+CTD7AKY]-F`M%9A8c:&EZf(6+ED%4Eb/oqDId=!BlkJ3DBO+@Cis]=@<?\'\'G%GK(F<G.9F(HJ(Bl%U.D\'3A-Ci=?*+D#[<Ap%a#@<<W0F_kl&+E1b0Bjl++E\\8J\'G[k<(FCfT8+EM77F<GL3@prqY@<<W%F`;&*@<>q"+Du+8+E2@>Bk1dmF=\\PUF`):DBl5&\'F_l#*+E;O<+E(k(Bk(jc+Co&)ATDp2F<GF=Ci!g-+CT/%D\'3P\'+D#V9+DbIqDfTu;/c~>';
            const expectedPlaintext = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
            expect(ascii85.decode(ciphertext)).to.equal(expectedPlaintext);
        });
    });
});