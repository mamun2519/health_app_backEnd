import { Profile, User } from '@prisma/client'
import prisma from '../../../prisma/prisma'

export const checkUser = async (email: string): Promise<User | null> => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  })
}

export const checkUserName = async (name: string): Promise<Profile | null> => {
  return await prisma.profile.findFirst({
    where: { user_name: name },
    include: {
      user: true,
    },
  })
}

export const getProfileById = async (id: string): Promise<Profile | null> => {
  return await prisma.profile.findFirst({
    where: { user_id: id },
  })
}
