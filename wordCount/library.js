function words(wordString) {
  countDict = {};
  wordArray = wordString.split(/\s+/);
  for (var word of wordArray) {
    if (countDict.hasOwnProperty(word)) {
      countDict[word]+=1;
    }
    else {
      countDict[word] = 1;
    }
  }
  return countDict;
}

module.exports = words;
