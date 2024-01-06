'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.receiveArrayAndReturnObject = void 0
const receiveArrayAndReturnObject = (queryData, array) => {
  const finalObj = {}
  for (const query of array) {
    if (query in queryData) {
      finalObj[query] = queryData[query]
    }
  }
  return finalObj
}
exports.receiveArrayAndReturnObject = receiveArrayAndReturnObject
