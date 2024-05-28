import { Notification } from '@prisma/client'
import prisma from '../../../prisma/prisma'

const deleteByIdFromDB = async (id: string): Promise<Notification | null> => {
  return await prisma.notification.delete({
    where: { id },
  })
}

export const NotificationService = {
  deleteByIdFromDB,
}
