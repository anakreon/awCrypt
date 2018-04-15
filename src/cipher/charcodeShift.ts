export const encode = (plaintext: string, key: number): string => {
    return new CharcodeShiftEncoder().convert(plaintext, key);
};

export const decode = (ciphertext: string, key: number): string => {
    return new CharcodeShiftDecoder().convert(ciphertext, key);
};

abstract class CharcodeShiftConverter {
    public convert (originalCharacters: string, key: number): string {
        let targetCharacters = '';
        for (var i = 0, len = originalCharacters.length; i < len; ++i) {
            const characterToConvert = originalCharacters[i];
            targetCharacters += this.convertCharacter(characterToConvert, key);
        }
        return targetCharacters;
    }
    private convertCharacter (originalCharacter: string, key: number): string {
        const originalCharacterCode = originalCharacter.charCodeAt(0);
        const targetCharacterCode = this.getTargetCharacterCode(originalCharacterCode, key);
        return String.fromCharCode(targetCharacterCode);
    }
    
    protected abstract getTargetCharacterCode (originalCharacterCode: number, key: number): number;
}

class CharcodeShiftEncoder extends CharcodeShiftConverter {
    protected getTargetCharacterCode (originalCharacterCode: number, key: number): number {
        return originalCharacterCode + key;
    }
}

class CharcodeShiftDecoder extends CharcodeShiftConverter {
    protected getTargetCharacterCode (originalCharacterCode: number, key: number): number {
        return originalCharacterCode - key;
    }
}