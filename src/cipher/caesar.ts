export const encode = (plaintext: string, key: number): string => {
    return new CaesarEncoder().convert(plaintext, key);
};

export const decode = (ciphertext: string, key: number): string => {
    return new CaesarDecoder().convert(ciphertext, key);
};

abstract class CaesarConverter {
    private charactersToIgnore: string[] = [' '];
    private startFromCharacterCode: number = 'A'.charCodeAt(0);
    protected alphabetLength: number = 26;

    public convert (originalCharacters: string, key: number): string {
        const formattedOriginalCharacters = this.formatCharactersForConversion(originalCharacters);
        let targetCharacters = '';
        for (var i = 0, len = formattedOriginalCharacters.length; i < len; ++i) {
            const characterToConvert = formattedOriginalCharacters[i];
            targetCharacters += this.convertCharacter(characterToConvert, key);
        }
        return this.formatCharactersAfterConversion(targetCharacters);
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
    private convertCharacter (originalCharacter: string, key: number): string {
        if (this.charactersToIgnore.includes(originalCharacter)) {
            return originalCharacter;
        }
        const originalCharacterNumberInAlphabet = this.getOriginalCharacterNumberInAlphabet(originalCharacter);
        const targetCharacterNumberInAlphabet = this.getTargetCharacterNumberInAlphabet(originalCharacterNumberInAlphabet, key);
        const targetCharacterCode = this.startFromCharacterCode + targetCharacterNumberInAlphabet;
        return String.fromCharCode(targetCharacterCode);
    }
    
    private getOriginalCharacterNumberInAlphabet (originalCharacter: string): number {
        return originalCharacter.charCodeAt(0) - this.startFromCharacterCode;
    }

    protected abstract getTargetCharacterNumberInAlphabet (originalCharacterNumberInAlphabet: number, key: number): number;
    protected abstract formatCharactersAfterConversion (targetCharacters: string): string;
}

class CaesarEncoder extends CaesarConverter {
    protected getTargetCharacterNumberInAlphabet (originalCharacterNumberInAlphabet: number, key: number): number {
        return (this.alphabetLength + originalCharacterNumberInAlphabet + key) % 26;
    }
    protected formatCharactersAfterConversion (targetCharacters: string): string {
        return targetCharacters;
    }
}

class CaesarDecoder extends CaesarConverter {
    protected getTargetCharacterNumberInAlphabet (originalCharacterNumberInAlphabet: number, key: number): number {
        return (this.alphabetLength + originalCharacterNumberInAlphabet - key) % 26;
    }
    protected formatCharactersAfterConversion (targetCharacters: string): string {
        return targetCharacters.toLowerCase();
    }
}