
var isAnagram = (stringOne, stringTwo) => {
    const charMapA = buildCharMap(stringOne);
    const charMapB = buildCharMap(stringTwo);

    if (Object.keys(charMapA).length !== Object.keys(charMapB).length) {
        return false;
    }

    for (let char in charMapA) {
        if (charMapA[char] !== charMapB[char]) {
            return false
        }
    }

    return true;

};

var buildCharMap = (str) => {
    const charMap = {};

    //learn regex!!!!
    //create an object which holds all characters of the string value. (only letters)
    for (let char of str.replace(/[^\w]/g, '').toLowerCase()) {
        charMap[char] = charMap[char] + 1 || 1;
    }

    return charMap;
}

module.exports = {
    isAnagram
}