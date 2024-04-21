'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.currentDate = exports.matchSlatTime = exports.generateSalt = void 0
function generateSalt(startTime, endTime, duration) {
  const intervals = []
  const start = new Date(`01/01/2023 ${startTime}`)
  const end = new Date(`01/01/2023 ${endTime}`)
  const interval = duration * 60 * 1000 // 15 minutes in milliseconds
  while (start <= end) {
    intervals.push(
      start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    )
    start.setTime(start.getTime() + interval)
  }
  return intervals
}
exports.generateSalt = generateSalt
function matchSlatTime(firstArray, secondArray) {
  return secondArray.map(time => ({
    time,
    booking: firstArray.some(item => item.slatTime === time),
  }))
}
exports.matchSlatTime = matchSlatTime
// console.log(date)
const currentDate = () => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1 // Adding 1 because months are zero-based (0-11)
  const currentDay = currentDate.getDate()
  // Create a formatted date string (YYYY-MM-DD)
  const formattedDate = `${currentYear}-${currentMonth
    .toString()
    .padStart(2, '0')}-${currentDay.toString().padStart(2, '0')}`
  return formattedDate
  console.log(formattedDate)
}
exports.currentDate = currentDate
