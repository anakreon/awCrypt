export const encode = (plaintext: string, keyword: string): string => {
    return new CharcodeShiftEncoder(keyword).convert(plaintext);
};

export const decode = (ciphertext: string, keyword: string): string => {
    return new CharcodeShiftDecoder(keyword).convert(ciphertext);
};

abstract class CharcodeShiftConverter {
    protected alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toUpperCase().split('');
    protected cipherAlphabet: string[];

    constructor (keyword: string) {
        this.cipherAlphabet = this.buildCipherAlphabet(keyword);
    }
    private buildCipherAlphabet (keyword: string): string[] {
        const cipherAlphabet = Array.from(new Set(keyword.split('')));
        const lastLetter = cipherAlphabet[cipherAlphabet.length - 1];
        const lastLetterIndex = this.alphabet.indexOf(lastLetter);
        for (var i = 0, len = this.alphabet.length; i < len; ++i) {
            const index = (lastLetterIndex + i + 1) % 26;
            if (!cipherAlphabet.includes(this.alphabet[index])) {
                cipherAlphabet.push(this.alphabet[index]);
            }
        }
        return cipherAlphabet;
    };

    public convert (originalCharacters: string): string {
        const formattedOriginalCharacters = this.formatCharactersForConversion(originalCharacters);
        let targetCharacters = '';
        for (var i = 0, len = formattedOriginalCharacters.length; i < len; ++i) {
            const characterToConvert = formattedOriginalCharacters[i];
            targetCharacters += this.convertCharacter(characterToConvert);
        }
        return targetCharacters;
    }
    private formatCharactersForConversion (originalCharacters: string): string {
        const originalCharactersUpperCase = originalCharacters.toUpperCase();
        if (this.hasNonAlphabeticalCharacters(originalCharactersUpperCase)) {
            throw 'invalid input - alphabetical characters only';
        }
        return originalCharactersUpperCase;
    }
    protected hasNonAlphabeticalCharacters (testString: string): boolean {
        return !/^[A-Z ]*$/.test(testString)
    }
    protected abstract convertCharacter (originalCharacter: string): string;
}

class CharcodeShiftEncoder extends CharcodeShiftConverter {
    private startFromCharacterCode: number = 'A'.charCodeAt(0);

    protected convertCharacter (originalCharacter: string): string {
        const originalCharacterNumberInAlphabet = originalCharacter.charCodeAt(0) - this.startFromCharacterCode;
        return this.cipherAlphabet[originalCharacterNumberInAlphabet] || originalCharacter;
    }
}

class CharcodeShiftDecoder extends CharcodeShiftConverter {
    protected convertCharacter (originalCharacter: string): string {
        const indexInAlphabet = this.cipherAlphabet.indexOf(originalCharacter);
        return this.alphabet[indexInAlphabet];
    }
}