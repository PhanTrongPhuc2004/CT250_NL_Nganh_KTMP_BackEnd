// src/utils/generateCode.js
const generateCode = (prefix) => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  return `${prefix}${timestamp}${random}`;
};

module.exports = generateCode;
// Kết quả: "DB1764171814339048261734"