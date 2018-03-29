export const encode = (plaintext: string): string => {
    return plaintext.trim()
        .toLowerCase()
        .split(textSeparator.word)
        .map(encodeTextWord)
        .join(morseSeparator.word);
};

export const decode = (ciphertext: string): string => {
    return ciphertext.trim()
        .toLowerCase()
        .split(morseSeparator.word)
        .map(decodeMorseWord)
        .join(textSeparator.word);
};

const encodeTextWord = (plaintextWord: string): string => {
    return plaintextWord
        .split(textSeparator.character)
        .map(encodeTextCharacter)
        .join(morseSeparator.character);
};

const decodeMorseWord = (morseWord: string): string => {
    return morseWord
        .split(morseSeparator.character)
        .map(decodeMorseCharacter)
        .join(textSeparator.character);
};
    
const decodeMorseCharacter = (morseCharacter: string): string => {
    return MORSE_CODE_DECODE[morseCharacter];
};

const encodeTextCharacter = (plaintextCharacter: string): string => {
    return MORSE_CODE_ENCODE[plaintextCharacter];
};

interface Separator { 
    word: string;
    character: string;
}

const morseSeparator: Separator = {
    word: ' / ',
    character: ' '
};
const textSeparator: Separator = {
    word: ' ',
    character: ''
};

const MORSE_CODE_ENCODE: { [plaintextCharacter: string]: string } = {
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    "a": ".-",
    "b": "-...",
    "c": "-.-.",
    "d": "-..",
    "e": ".",
    "f": "..-.",
    "g": "--.",
    "h": "....",
    "i": "..",
    "j": ".---",
    "k": "-.-",
    "l": ".-..",
    "m": "--",
    "n": "-.",
    "o": "---",
    "p": ".--.",
    "q": "--.-",
    "r": ".-.",
    "s": "...",
    "t": "-",
    "u": "..-",
    "v": "...-",
    "w": ".--",
    "x": "-..-",
    "y": "-.--",
    "z": "--..",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "!": "-.-.--",
    "-": "-....-",
    "/": "-..-.",
    "@": ".--.-.",
    "(": "-.--.",
    ")": "-.--.-"
};
const MORSE_CODE_DECODE: { [plaintextCharacter: string]: string } = Object.keys(MORSE_CODE_ENCODE)
    .reduce((reverseMap: { [plaintextCharacter: string]: string }, textCharacter: string) => {
        const morseCharacter = MORSE_CODE_ENCODE[textCharacter];
        reverseMap[morseCharacter] = textCharacter;
        return reverseMap;
    }, {});