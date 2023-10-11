import { HealtReport } from '@prisma/client'
import prisma from '../../../prisma/prisma'

const insetIntoDB = async (data: HealtReport): Promise<HealtReport> => {
  const result = await prisma.healtReport.create({ data })

  return result
}

const getByIdFromDB = async (id: string): Promise<HealtReport | null> => {
  return await prisma.healtReport.findFirst({ where: { id } })
}
const updateByIdIntoDB = async (
  id: string,
  data: Partial<HealtReport>,
): Promise<HealtReport | null> => {
  return await prisma.healtReport.update({ where: { id }, data })
}

const deleteByIdFromDB = async (id: string): Promise<HealtReport | null> => {
  return await prisma.healtReport.delete({ where: { id } })
}

export const HaltReportServices = {
  insetIntoDB,
  getByIdFromDB,
  deleteByIdFromDB,
  updateByIdIntoDB,
}
