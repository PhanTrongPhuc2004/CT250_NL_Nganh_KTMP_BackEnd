function generateCode(startSymbol) {
  return `${startSymbol}${Date.now()}`;
}
module.exports = generateCode;