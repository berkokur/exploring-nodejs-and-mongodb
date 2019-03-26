const expect = require('expect');
const anagram = require('./anagram.js');


it('should have same charachters', () => {
    var result = anagram.isAnagram("rail safety", "Fairy Tales");
    expect(result).toEqual(true);
});


it('should have same name chars', () => {
    var result = anagram.isAnagram("Berk OKUR", "rebK kROu");
    expect(result).toEqual(true);
});

