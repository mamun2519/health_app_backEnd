import { Appointment } from '@prisma/client'

export function generateSalt(
  startTime: string,
  endTime: string,
  duration: number,
) {
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

export function matchSlatTime(
  firstArray: Appointment[],
  secondArray: string[],
) {
  return secondArray.map((time: string) => ({
    time,
    booking: firstArray.some(item => item.slatTime === time),
  }))
}

export const currentDate = (): string => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1 // Adding 1 because months are zero-based (0-11)
  const currentDay = currentDate.getDate()

  // Create a formatted date string (YYYY-MM-DD)
  const formattedDate = `${currentYear}-${currentMonth
    .toString()
    .padStart(2, '0')}-${currentDay.toString().padStart(2, '0')}`

  return formattedDate
}
