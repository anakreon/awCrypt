export const encode = (plaintext: string) => {
    return new Base64Encoder().convert(plaintext);
};

export const decode = (ciphertext: string) => {
    return new Base64Decoder().convert(ciphertext);
};

abstract class Base64Converter {
    protected abstract originalCharacterBatchSize: number;
    protected abstract targetCharacterBatchSize: number;
    protected abstract specialCharacters: string[];
    protected abstract originalBitsPerByte: number;
    protected abstract targetBitsPerByte: number;
    protected indexTable = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 
        'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 
        'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
    ];

    public convert (originalCharacters: string): string {
        let targetCharacters = '';
        for (var i = 0, len = originalCharacters.length; i < len; i += this.originalCharacterBatchSize) {
            const originalCharactersBatch = originalCharacters.substr(i, this.originalCharacterBatchSize);
            targetCharacters += this.convertCharactersBatch(originalCharactersBatch);
        }
        return targetCharacters;
    }

    private convertCharactersBatch (originalCharacters: string): string {
        const originalCharacterBytes = this.convertOriginalCharactersToBytes(originalCharacters) + this.getSupplementDigits(originalCharacters);
        const targetCharacters = this.convertCharacterBytesToTargetCharacters(originalCharacterBytes);
        const paddingCharacters = this.generatePaddingCharacters(originalCharacters);
        return targetCharacters + paddingCharacters;
    }

    private convertOriginalCharactersToBytes (characters: string): string {
        return characters.split('')
            .filter((character: string) => !this.specialCharacters.includes(character))
            .map((character: string) => this.convertOriginalCharacterToByte(character))
            .join('');
    }

    private convertCharacterBytesToTargetCharacters (originalCharacterBytes: string): string {
        const characterCountToConvert = Math.floor(originalCharacterBytes.length / this.targetBitsPerByte);
        let targetCharacters = '';
        for (var i = 0; i < characterCountToConvert; ++i) {
            const byte = originalCharacterBytes.substr(i * this.targetBitsPerByte, this.targetBitsPerByte);
            targetCharacters += this.convertCharacterByteToTargetCharacter(byte);
        }
        return targetCharacters;
    }

    protected abstract getSupplementDigits (originalCharacters: string): string;
    protected abstract generatePaddingCharacters (originalCharacters: string): string;
    protected abstract convertOriginalCharacterToByte (character: string): string;
    protected abstract convertCharacterByteToTargetCharacter (byte: string): string;
}

class Base64Encoder extends Base64Converter {
    protected originalCharacterBatchSize: number = 3;
    protected targetCharacterBatchSize: number = 4;
    protected specialCharacters: string[] = [];
    protected originalBitsPerByte: number = 8;
    protected targetBitsPerByte: number = 6;
    

    protected getSupplementDigits (originalCharacters: string): string {
        return '00'.repeat(this.originalCharacterBatchSize - originalCharacters.length);
    }

    protected generatePaddingCharacters (originalCharacters: string): string {
        return '='.repeat(this.originalCharacterBatchSize - originalCharacters.length);
    }

    protected convertOriginalCharacterToByte (character: string): string {
        const binaryCharCode = character.charCodeAt(0).toString(2);
        return binaryCharCode.padStart(this.originalBitsPerByte, '0');
    }

    protected convertCharacterByteToTargetCharacter (byte: string): string {
        const index = parseInt(byte, 2);
        return this.indexTable[index];
    }
}

class Base64Decoder extends Base64Converter {
    protected originalCharacterBatchSize: number = 4;
    protected targetCharacterBatchSize: number = 3;
    protected specialCharacters: string[] = ['='];
    protected originalBitsPerByte: number = 6;
    protected targetBitsPerByte: number = 8;

    protected getSupplementDigits (originalCharacters: string): string {
        return '';
    }

    protected generatePaddingCharacters (originalCharacters: string): string {
        return '';
    }

    protected convertOriginalCharacterToByte (character: string): string {
        const indexCode = this.getIndexOfBase64Character(character);
        const binaryIndexCode = indexCode.toString(2);
        return binaryIndexCode.padStart(this.originalBitsPerByte, '0');
    }
    private getIndexOfBase64Character (character: string): number {
        return this.indexTable.findIndex((value: string) => value === character);
    }

    protected convertCharacterByteToTargetCharacter (byte: string): string {
        const charCode = parseInt(byte, 2);
        return String.fromCharCode(charCode);
    }    
}