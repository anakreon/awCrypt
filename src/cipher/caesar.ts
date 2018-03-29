export const encrypt = (plaintext: string, key: number): string => {
    const plaintextUpper = plaintext.toUpperCase();
    if (hasNonAlphabeticalCharacters(plaintextUpper)) {
        throw 'invalid input - alphabetical characters only';
    }
    let ciphertext = '';
    const charCodeShift = 'A'.charCodeAt(0);
    for (var i = 0, len = plaintextUpper.length; i < len; ++i) {
        if (plaintextUpper[i] === ' ') {
            ciphertext += ' ';
            continue;
        }
        const alphaCode = plaintextUpper.charCodeAt(i) - charCodeShift;
        const newAlphaCode = (26 + alphaCode + key) % 26;
        const newCharCode = newAlphaCode + charCodeShift;
        ciphertext += String.fromCharCode(newCharCode);
    }
    return ciphertext;
};

export const decrypt = (ciphertext: string, key: number): string => {
    let ciphertextUpper = ciphertext.toUpperCase();
    if (hasNonAlphabeticalCharacters(ciphertextUpper)) {
        throw 'invalid input - alphabetical characters only';
    }
    let plaintext = '';
    const charCodeShift = 'A'.charCodeAt(0);
    for (var i = 0, len = ciphertextUpper.length; i < len; ++i) {
        if (ciphertextUpper[i] === ' ') {
            plaintext += ' ';
            continue;
        }
        const alphaCode = ciphertextUpper.charCodeAt(i) - charCodeShift;
        const newAlphaCode = (26 + alphaCode - key) % 26;
        const newCharCode = newAlphaCode + charCodeShift;
        plaintext += String.fromCharCode(newCharCode);
    }
    return plaintext.toLowerCase();
};

const hasNonAlphabeticalCharacters = (testString: string) => {
    return !/^[A-Z ]*$/.test(testString)
};