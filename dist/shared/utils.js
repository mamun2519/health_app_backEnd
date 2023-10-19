'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.userNameGenerator = void 0
const generateRandomNumber = () => {
  return Math.floor(10000 + Math.random() * 90000)
}
const userNameGenerator = name => {
  const randomNumber = generateRandomNumber()
  const userName = `${name}${randomNumber}`
  return userName
}
exports.userNameGenerator = userNameGenerator
