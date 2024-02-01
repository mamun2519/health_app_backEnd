import { User } from '@prisma/client'
import prisma from '../prisma/prisma'

const generateRandomNumber = (): number => {
  return Math.floor(10000 + Math.random() * 90000)
}

export const userNameGenerator = (name: string) => {
  const randomNumber = generateRandomNumber()
  const userName = `${name}${randomNumber}`
  return userName
}

export const CheckUserByIdFromDB = async (
  userId: string,
): Promise<User | null> => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  })
  return user
}
