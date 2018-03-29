export const encode = (plaintext: string) => {
    return new Ascii85Encoder().convert(plaintext);
};

export const decode = (ciphertext: string) => {
    return new Ascii85Decoder().convert(ciphertext);
};

class Ascii85Encoder {
    private originalBitsPerByte: number = 8;
    private originalCharacterBatchSize: number = 4;
    private targetCharacterBatchSize: number = 5;

    public convert (originalCharacters: string): string {
        let targetCharacters = '';
        for (var i = 0, len = originalCharacters.length; i < len; i += this.originalCharacterBatchSize) {
            const originalCharactersBatch = originalCharacters.substr(i, this.originalCharacterBatchSize);
            targetCharacters += this.convertCharactersBatch(originalCharactersBatch, i, originalCharacters);
        }
        return '<~' + targetCharacters + '~>';
    }
    private convertCharactersBatch (originalCharactersBatch: string, index: number, originalCharacters: string): string {
        const originalCharacterBytes = this.convertOriginalCharactersToBytes(originalCharactersBatch) + this.getSupplementDigits(originalCharactersBatch);
        const targetCharacters = this.convertCharacterBytesToTargetCharacters(originalCharacterBytes, originalCharactersBatch);
        return targetCharacters;
    }
    private convertCharacterBytesToTargetCharacters (originalCharacterBytes: string, originalCharactersBatch: string): string {
        if (this.isFullBatch(originalCharactersBatch)) {
            return this.convertFullBatchCharacterBytesToTargetCharacters(originalCharacterBytes);
        } else {
            return this.convertLastBatchCharacterBytesToTargetCharacters(originalCharacterBytes, originalCharactersBatch);
        }
    }
    private convertFullBatchCharacterBytesToTargetCharacters (originalCharacterBytes: string): string {
        const decimalValue = parseInt(originalCharacterBytes, 2);
        if (decimalValue) {
            let ascii85Characters = this.getAscii85Characters(decimalValue);
            return Array(this.targetCharacterBatchSize - ascii85Characters.length + 1).join('!') + ascii85Characters;
        } else {
            return 'z';
        }
    }
    private convertLastBatchCharacterBytesToTargetCharacters (originalCharacterBytes: string, originalCharactersBatch: string): string {
        const decimalValue = parseInt(originalCharacterBytes, 2);
        if (decimalValue) {
            let ascii85Characters = this.getAscii85Characters(decimalValue);
            return ascii85Characters.substring(0, ascii85Characters.length - (this.originalCharacterBatchSize - originalCharactersBatch.length));
        } else {
            return Array(originalCharactersBatch.length + 2).join('!');
        }
    }
    private isFullBatch (originalCharactersBatch: string): boolean {
        return originalCharactersBatch.length === this.originalCharacterBatchSize;
    }
    private convertOriginalCharactersToBytes (characters: string): string {
        return characters.split('')
            .map((character: string) => this.convertOriginalCharacterToByte(character))
            .join('');
    }
    private getSupplementDigits (originalCharactersBatch: string): string {
        return '0'.repeat((this.originalCharacterBatchSize - originalCharactersBatch.length) * this.originalBitsPerByte);
    }
    private convertOriginalCharacterToByte (character: string): string {
        const binaryCharCode = character.charCodeAt(0).toString(2);
        return binaryCharCode.padStart(this.originalBitsPerByte, '0');
    }
    private getAscii85Characters (decimalValue: number): string {
        let ascii85 = '';
        for (var index = decimalValue; index > 1; index /= 85) {
            const ascii85Character = this.getAscii85Character(index % 85);
            ascii85 = ascii85Character + ascii85;
        }
        return ascii85;
    }
    private getAscii85Character (divisionRemainder: number): string {
        const ascii85StartIndex = 33;
        return String.fromCharCode(divisionRemainder + ascii85StartIndex);
    }
}

class Ascii85Decoder {
    private originalCharacterBatchSize: number = 5;

    public convert (originalCharacters: string): string {
        const originalCharactersClean = this.stripEncodedTagsAndWhitespaces(originalCharacters);
        let targetCharacters = '';
        let index = 0;
        while (index < originalCharactersClean.length) {
            if (originalCharactersClean[index] === 'z') {
                targetCharacters += '\u0000\u0000\u0000\u0000';
                index++;
            } else {
                const originalCharactersBatch = originalCharactersClean.substr(index, this.originalCharacterBatchSize);
                targetCharacters += this.convertCharactersBatch(originalCharactersBatch);
                index += this.originalCharacterBatchSize;
            }
        }
        return targetCharacters;
    }

    private convertCharactersBatch (originalCharactersBatch: string): string {
        const originalCharactersBatchPadded = originalCharactersBatch.padEnd(this.originalCharacterBatchSize, 'u');
        const decimalValue = this.convertAscii85CharsToDecimal(originalCharactersBatchPadded);
        const originalCharacterBytes = decimalValue.toString(2).padStart(32, '0');
        let targetCharacters = this.convertCharacterBytesToTargetCharacters(originalCharacterBytes);
        return targetCharacters.substring(0, targetCharacters.length - (this.originalCharacterBatchSize - originalCharactersBatch.length));
    }
    private stripEncodedTagsAndWhitespaces (inputString: string): string {
        return inputString
            .substring(2, inputString.length - 2)
            .replace(/\s/g, '');
    }
    private convertAscii85CharsToDecimal (ascii85Value: string): number {
        let decimalValue = 0;
        for (var i = 0; i < ascii85Value.length; ++i) {
            decimalValue += (ascii85Value.charCodeAt(i) - 33) * Math.pow(85, ascii85Value.length - 1 - i);
        }
        return decimalValue;
    }
    private convertCharacterBytesToTargetCharacters (originalCharacterBytes: string): string {
        let decodedChars = '';
        for (var i = 0; i < originalCharacterBytes.length; i += 8) {
            const charCode = parseInt(originalCharacterBytes.substring(i, i + 8), 2);
            decodedChars += String.fromCharCode(charCode);
        }
        return decodedChars;
    }
}