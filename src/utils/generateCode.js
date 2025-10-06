function genrateCode(startSymbol) {
  return `${startSymbol}${Date.now()}`;
}
module.exports = genrateCode;
