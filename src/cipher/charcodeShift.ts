export const encrypt = (plaintext: string, key: number): string => {
    let ciphertext = '';
    for (var i = 0, len = plaintext.length; i < len; ++i) {
        const newCharCode = plaintext.charCodeAt(i) + key;
        console.log(newCharCode);
        ciphertext += String.fromCharCode(newCharCode);
    }
    return ciphertext;
};

export const decrypt = (ciphertext: string, key: number): string => {
    let plaintext = '';
    for (var i = 0, len = ciphertext.length; i < len; ++i) {
        const newCharCode = ciphertext.charCodeAt(i) - key;
        console.log(newCharCode);
        plaintext += String.fromCharCode(newCharCode);
    }
    return plaintext;
};