export const encode = (plaintext: string, numberOfRails: number): string => {
    let ciphertext = '';
    const loopLength = 2 * (numberOfRails - 1);
    const totalLoops = plaintext.length / loopLength;
    for (var railNo = 0; railNo < numberOfRails; ++railNo) {
      for (var loopNo = 0; loopNo < totalLoops; ++loopNo) {
        const letterIndexOne = 2 * (numberOfRails - 1) * loopNo + railNo;
        if (plaintext[letterIndexOne]) {
            ciphertext += plaintext[letterIndexOne];
        }
        const letterIndexTwo = 2 * (numberOfRails - 1) * loopNo + 2 * (numberOfRails - 1) - railNo;
        const isIndexInRange = letterIndexTwo > 2 * (numberOfRails - 1) * loopNo && letterIndexTwo < 2 * (numberOfRails - 1) * (loopNo + 1);
        if (plaintext[letterIndexTwo] && letterIndexOne !== letterIndexTwo && isIndexInRange) {
            ciphertext += plaintext[letterIndexTwo];
        }
      }
    }
    return ciphertext;
};

export const decode = (ciphertext: string, numberOfRails: number): string => {
    const loopLength = 2 * (numberOfRails - 1);
    const baseLineLength = Math.floor(ciphertext.length / loopLength);
    const remainingLength = ciphertext.length % loopLength;
    const rails = [];
    let totalRailLength = 0;
    for (var railNo = 0; railNo < numberOfRails; ++railNo) {
        const currentRailLength = getCurrentRailLength(railNo, numberOfRails, baseLineLength, remainingLength);
        rails[railNo] = ciphertext.substr(totalRailLength, currentRailLength);
        totalRailLength += currentRailLength;
    }
    let plaintext = '';
    for (var loop = 0, len = rails[0].length * 2; loop < len; ++loop) {
        if (loop % 2 === 0) {
            plaintext += loopAcrossRailsInOrder(rails);
        } else {
            plaintext += loopAcrossRailsInReversedOrder(rails);
        }
    }
    return plaintext;
};

const getCurrentRailLength = (railNo: number, numberOfRails: number, baseLineLength: number, remainingLength: number) => {
    let currentRailLength = baseLineLength;
    if (railNo < remainingLength) {
        currentRailLength++;
    }
    const secCount = remainingLength - numberOfRails;
    const isInInterval = railNo < numberOfRails - 1 && railNo > numberOfRails - 2 - secCount;
    if (secCount && isInInterval) {
        currentRailLength++;
    }
    if (railNo !== 0 && railNo !== (numberOfRails - 1)) {
        currentRailLength += baseLineLength;
    }
    return currentRailLength;
};

const loopAcrossRailsInOrder = (rails: string[]) => {
    let plaintextPart = '';
    for (var railNo = 0; railNo < rails.length - 1; ++railNo) {
        plaintextPart += pullNextRailValue(railNo, rails);
    }
    return plaintextPart;
};

const loopAcrossRailsInReversedOrder = (rails: string[]) => {
    let plaintextPart = '';
    for (var railNo = rails.length - 1; railNo > 0; --railNo) {
        plaintextPart += pullNextRailValue(railNo, rails);
    }
    return plaintextPart;
};

const pullNextRailValue = (railNo: number, rails: string[]) => {
    let railValue = '';
    if (typeof rails[railNo][0] !== 'undefined') {
        railValue += rails[railNo][0];
        rails[railNo] = rails[railNo].substr(1);
    }
    return railValue;
};
/*
export const decode = (ciphertext: string, numberOfRails: number): string => {
    let plaintext = '';
    const loopLength = 2 * (numberOfRails - 1);
    const baseLineLength = Math.floor(ciphertext.length / loopLength);
    const remaining = ciphertext.length % loopLength;
    const rails = [];
    let totalRailLength = 0;
    for (var i = 0; i < numberOfRails; ++i) {
        let currentRailLength = baseLineLength;
        if (i < remaining) {
            currentRailLength++;
        }

        const secCount = remaining - numberOfRails;
        const isInInterval = i < numberOfRails - 1 && i > numberOfRails - 2 - secCount;
        if (secCount && isInInterval) {
            currentRailLength++;
        }

        if (i !== 0 && i !== (numberOfRails - 1)) {
            currentRailLength += baseLineLength;
        }
        
        rails[i] = ciphertext.substr(totalRailLength, currentRailLength);
        totalRailLength += currentRailLength;
    }
    for (var i = 0, len = rails[0].length * 2; i < len; ++i) {
        if (i % 2 === 0) {
            for (var j = 0; j < numberOfRails - 1; ++j) {
                if (rails[j][0]) {
                    plaintext += rails[j][0];
                    rails[j] = rails[j].substr(1);
                }
            }
        } else {
            for (var j = numberOfRails - 1; j > 0; --j) {
                if (rails[j][0]) {
                    plaintext += rails[j][0];
                    rails[j] = rails[j].substr(1);
                }
            }
        }        
    }
    return plaintext;
};*/