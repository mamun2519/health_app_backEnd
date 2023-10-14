/* eslint-disable @typescript-eslint/no-explicit-any */
import { HealtReport, Medicine, Prescription, Prisma } from '@prisma/client'
import prisma from '../../../prisma/prisma'
import Send_API_Error from '../../../error/apiError'
import { StatusCodes } from 'http-status-codes'
import {
  IPrescriptionFilter,
  IPrescriptionRequestedData,
} from './prescription.interface'
import { IPagination } from '../../../interface/pagination'
import { calculatePagination } from '../../../helper/paginationHalper'

import { IFilterResponse } from '../../../interface/userFilteResponse'
import { PrescriptionSearchAbleFiled } from '../serviceOffer/serviceOffer.constant'

const insetIntoDB = async (
  data: IPrescriptionRequestedData,
  authUserId: string,
): Promise<Prescription> => {
  const { prescription, haltReport, medicine } = data
  console.log(prescription)
  const doctor = await prisma.doctor.findFirst({
    where: { user_id: authUserId },
  })
  if (!doctor) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'User doctor found')
  }

  const appointment = await prisma.appointment.findFirst({
    where: {
      id: prescription.appointmentId,
    },
    include: {
      user: true,
    },
  })
  if (!appointment) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'appointment not found')
  }
  console.log(appointment.doctorId)
  const result = await prisma.$transaction(async transactionClient => {
    // prescription.userId = appointment.userId

    const userPrescription = await transactionClient.prescription.create({
      data: {
        userId: appointment.userId,
        appointmentId: prescription.appointmentId,
        title: prescription.title,
        advice: prescription.advice,
        submitDate: prescription.submitDate,
        doctorId: appointment.doctorId,
      },
    })

    console.log(userPrescription)
    if (medicine) {
      for (let i = 0; i < medicine.length; i++) {
        await transactionClient.medicine.create({
          data: {
            prescriptionId: userPrescription.id,
            duration: medicine[i].duration,
            eat: medicine[i].eat,
            eatingTime: medicine[i].eatingTime,
            advice: medicine[i].advice,
            durgName: medicine[i].durgName,
          },
        })
      }
    }

    if (haltReport) {
      for (let i = 0; i < haltReport.length; i++) {
        await transactionClient.healtReport.create({
          data: {
            prescriptionId: userPrescription.id,
            testName: haltReport[i].testName,
            description: haltReport[i].description,
          },
        })
      }
    }

    const message = `doctor assign your medicine prescription. submit date ${prescription.submitDate}`

    await transactionClient.notification.create({
      data: {
        userId: appointment.userId,
        message,
      },
    })

    return userPrescription
  })

  return result
}

const getAllFromDB = async (
  filters: IPrescriptionFilter,
  options: IPagination,
): Promise<IFilterResponse<Prescription[]>> => {
  const { page, limit, skip } = calculatePagination(options)
  const { searchTerm, ...filterData } = filters
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      OR: PrescriptionSearchAbleFiled.map((filed: any) => ({
        [filed]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          equals: (filterData as any)[key],
        },
      })),
    })
  }

  const whereConditions: Prisma.PrescriptionWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}
  const result = await prisma.prescription.findMany({
    skip,
    take: limit,
    where: whereConditions,
    include: {
      user: {
        include: {
          profile: true,
        },
      },
      appointment: {
        include: {
          service: true,
        },
      },
      healtReports: true,
      medicines: true,
    },

    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  })
  const total = await prisma.prescription.count({ where: whereConditions })

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}

const getByIdFromDB = async (id: string): Promise<Prescription | null> => {
  return await prisma.prescription.findFirst({
    where: { id },
    include: {
      user: {
        include: {
          profile: true,
        },
      },

      doctor: {
        include: {
          user: {
            include: {
              profile: true,
            },
          },
        },
      },
      appointment: {
        include: {
          doctor: true,
          service: true,
        },
      },
      medicines: true,
      healtReports: true,
    },
  })
}
const updateByIdIntoDB = async (
  id: string,
  data: IPrescriptionRequestedData,
): Promise<Prescription | null> => {
  const { prescription, haltReport, medicine } = data
  const result = await prisma.prescription.update({
    where: { id },
    data: prescription,
  })

  if (medicine) {
    for (let i = 0; i < medicine.length; i++) {
      medicine.map((med: Medicine) =>
        prisma.medicine.update({
          where: { id: med.id },
          data: {
            duration: med.duration,
            eat: med.eat,
            eatingTime: med.eatingTime,
            advice: med.advice,
            durgName: med.durgName, // Fixed typo here
          },
        }),
      )
    }
  }
  if (haltReport) {
    haltReport.map((haltRep: HealtReport) =>
      prisma.healtReport.update({
        where: { id: haltRep.id },
        data: {
          description: haltRep.description,
          testName: haltRep.testName,
        },
      }),
    )
  }
  return result
}

const deleteByIdFromDB = async (id: string): Promise<Prescription | null> => {
  return await prisma.prescription.delete({ where: { id } })
}

const doctorAssignPrescription = async (
  authUserId: string,
  options: IPagination,
): Promise<IFilterResponse<Prescription[]>> => {
  const user = await prisma.user.findFirst({
    where: {
      id: authUserId,
    },
    include: {
      doctor: true,
    },
  })
  if (!user) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'Doctor Id Not Found')
  }
  const { page, limit, skip } = calculatePagination(options)

  const result = await prisma.prescription.findMany({
    skip,
    take: limit,

    where: {
      doctorId: user?.doctor?.id,
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  })
  const total = await prisma.prescription.count({
    where: {
      doctorId: user?.doctor?.id,
    },
  })
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}

export const PrescriptionService = {
  insetIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
  deleteByIdFromDB,
  doctorAssignPrescription,
}
