const generateRandomNumber = (): number => {
  return Math.floor(10000 + Math.random() * 90000)
}

export const userNameGenerator = (name: string) => {
  const randomNumber = generateRandomNumber()
  const userName = `${name}${randomNumber}`
  return userName
}
