import { Medicine } from '@prisma/client'
import prisma from '../../../prisma/prisma'

const insetIntoDB = async (data: Medicine): Promise<Medicine> => {
  const result = await prisma.medicine.create({ data })

  return result
}

const getByIdFromDB = async (id: string): Promise<Medicine | null> => {
  return await prisma.medicine.findFirst({ where: { id } })
}
const updateByIdIntoDB = async (
  id: string,
  data: Partial<Medicine>,
): Promise<Medicine | null> => {
  return await prisma.medicine.update({ where: { id }, data })
}

const deleteByIdFromDB = async (id: string): Promise<Medicine | null> => {
  return await prisma.medicine.delete({ where: { id } })
}

export const MedicineServices = {
  insetIntoDB,
  getByIdFromDB,
  deleteByIdFromDB,
  updateByIdIntoDB,
}
