export interface Ascii85 {
    encode: (inputText: string) => string;
    decode: (inputText: string) => string;
}

export interface Base64 {
    encode: (inputText: string) => string;
    decode: (inputText: string) => string;
}

export interface Caesar {
    encode: (plaintext: string, key: number) => string;
    decode: (ciphertext: string, key: number) => string;
}

export interface CharcodeShift {
    encode: (plaintext: string, key: number) => string;
    decode: (ciphertext: string, key: number) => string;
}

export interface Morse {
    encode: (plaintext: string) => string;
    decode: (ciphertext: string) => string;
}

export interface RailFence {
    encode: (plaintext: string, numberOfRails: number) => string;
    decode: (ciphertext: string, numberOfRails: number) => string;
}

export interface Substitution {
    encode: (plaintext: string, keyword: string) => string;
    decode: (ciphertext: string, keyword: string) => string;
}