import { DonorRequestStatus } from '@prisma/client'

export type IFiltersUserDonorRequest = {
  searchTerm?: string
  blood_group?: string
  district?: string
  sub_district?: string
  police_station?: string
}

export type IFilterDonor = {
  searchTerm?: string
}

export type IStatusRequest = {
  id: string
  status: DonorRequestStatus
}
