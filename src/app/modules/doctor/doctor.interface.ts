import { DoctorService, ServiceSalt } from '@prisma/client'

export type ICreatedDoctorServiceData = {
  service: DoctorService
  salt: ServiceSalt
}

export type IDoctorServiceFilter = {
  searchTerm?: string
  price?: string
  title?: string
  serviceType?: string
  category: string
}

export const ServicerAbleFiled = ['day', 'category', 'duration', 'category']
