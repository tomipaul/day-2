function reverseString(string){
  if (!string) {
  	return null;
  }
  r = string.split('').reverse().join('');
  if (r === string) {
    return true;
  }
  else {
  	return r;
  }
}

module.exports = reverseString