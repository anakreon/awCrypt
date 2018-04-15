# awCrypt

A NPM package that provides functions for data transformation.

## Installing

To install run: 
```shell
npm install awcrypt
```

## Usage

Import the module:

```typescript
import { <module_name> } from 'awcrypt';
```


The following modules are available:

### Ascii85

>Ascii85 (or Base85) is a coding system created by Paul E. Rutter similar to base64 encoding, using 5 ASCII characters to code 4 bytes. ASCII 85 is used in PDF file format for example.

https://www.dcode.fr/ascii-85-encoding

```typescript
import { ascii85 } from 'awcrypt';
```

```typescript
interface ascii85 {
    encode: (inputText: string) => string;
    decode: (inputText: string) => string;
}
```

### Base64

>Encoding scheme that represent binary data in an ASCII string format by translating it into a radix-64 representation. Each base64 digit represents exactly 6 bits of data. Three 8-bit bytes (i.e., a total of 24 bits) can therefore be represented by four 6-bit base64 digits.

https://en.wikipedia.org/wiki/Base64

```typescript
import { base64 } from 'awcrypt';
```

```typescript
interface base64 {
    encode: (inputText: string) => string;
    decode: (inputText: string) => string;
}
```

### Caesar Cipher

>One of the simplest and most widely known encryption techniques. It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet

https://en.wikipedia.org/wiki/Caesar_cipher

```typescript
import { caesar } from 'awcrypt';
```

```typescript
interface caesar {
    encode: (plaintext: string, key: number) => string;
    decode: (ciphertext: string, key: number) => string;
}
```


### Charcode Shift

Similar to caesar, but not restricted to alphabet - it is a type of substitution cipher in which each unicode character in the plaintext is replaced by another unicode character some fixed number of positions down the charcode.

```typescript
import { charcodeShift } from 'awcrypt';
```

```typescript
interface charcodeShift {
    encode: (plaintext: string, key: number) => string;
    decode: (ciphertext: string, key: number) => string;
}
```

### Morse Code

>Encodes the ISO basic Latin alphabet, some extra Latin letters, the Arabic numerals and a small set of punctuation and procedural signals (prosigns) as standardized sequences of short and long signals called "dots" and "dashes"

https://en.wikipedia.org/wiki/Morse_code

```typescript
import { morse } from 'awcrypt';
```

```typescript
interface morse {
    encode: (plaintext: string) => string;
    decode: (ciphertext: string) => string;
}
```

Ciphertext needs to have a single-space character separator and ' / ' as word separator.
Example: `.-.. --- .-. . -- / .. .--. ... ..- -- / -.. --- .-.. --- .-.`


### Rail fence cipher

A form of transposition cipher.

https://en.wikipedia.org/wiki/Rail_fence_cipher


```typescript
import { railFence } from 'awcrypt';
```

```typescript
interface railFence {
    encode: (plaintext: string, numberOfRails: number) => string;
    decode: (ciphertext: string, numberOfRails: number) => string;
}
```

### Keyword substitution cipher

A form of monoalphabetic substitution. A keyword is used as the key, and it determines the letter matchings of the cipher alphabet to the plain alphabet. Similar to keyword cipher, but the way of generating cipher alphabet is a bit different.
https://en.wikipedia.org/wiki/Keyword_cipher

```typescript
import { substitution } from 'awcrypt';
```

```typescript
interface substitution {
    encode: (plaintext: string, keyword: string) => string;
    decode: (ciphertext: string, keyword: string) => string;
}
```

## Running the tests

Run 
```shell
npm test
```

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Martin Hula** - *Initial work* - [anakreon](https://github.com/anakreon)

See also the list of [contributors](https://github.com/awCrypt/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details