import { HealtReport, Medicine, Prescription } from '@prisma/client'

export type IPrescriptionRequestedData = {
  prescription: Prescription
  medicine?: Medicine[]
  haltReport?: HealtReport[]
}

export type IPrescriptionFilter = {
  searchTerm?: string
  title?: string
  submitDate?: string
  advice?: string
}
