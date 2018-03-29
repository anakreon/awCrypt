const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toUpperCase().split('');

export const encrypt = (plaintext: string, keyword: string): string => {
    const plaintextUpper = plaintext.toUpperCase();
    const cipherAlphabetMap = buildCipherAlphabetMap(keyword);
    let ciphertext = '';
    const charCodeShift = 'A'.charCodeAt(0);
    for (var i = 0, len = plaintext.length; i < len; ++i) {
        const letter = plaintext[i];
        const alphaCode = plaintextUpper.charCodeAt(i) - charCodeShift;
        ciphertext += cipherAlphabetMap[alphaCode] ? cipherAlphabetMap[alphaCode] : letter;
    }
    return ciphertext;
};

export const decrypt = (ciphertext: string, keyword: string): string => {
    let ciphertextUpper = ciphertext.toUpperCase();
    const cipherAlphabetMap = buildCipherAlphabetMap(keyword);
    let plaintext = '';
    const charCodeShift = 'A'.charCodeAt(0);
    for (var i = 0, len = ciphertext.length; i < len; ++i) {
        const index = cipherAlphabetMap.indexOf(ciphertextUpper[i]);
        plaintext += alphabet[index];
    }
    return plaintext;
};


const buildCipherAlphabetMap = (keyword: string) => {
    const cipherAlphabet = Array.from(new Set(keyword.split('')));
    const lastLetter = cipherAlphabet[cipherAlphabet.length - 1];
    const lastLetterIndex = alphabet.indexOf(lastLetter);
    for (var i = 0, len = alphabet.length; i < len; ++i) {
        let index = (lastLetterIndex + i + 1) % 26;
        if (!cipherAlphabet.includes(alphabet[index])) {
            cipherAlphabet.push(alphabet[index]);
        }
    }
    return cipherAlphabet;
};