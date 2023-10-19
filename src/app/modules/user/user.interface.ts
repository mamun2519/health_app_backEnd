import {
  Education,
  PermanentAddress,
  PresentAddress,
  Profile,
} from '@prisma/client'

export type IUpdatedUserRequestData = {
  profile?: Profile | null
  presentAddress?: PresentAddress | null
  permanentAddress?: PermanentAddress | null
  education?: Education | null
}

export type IUserFilter = {
  searchTerm?: string
  email?: string
  role?: string
  verified?: string
  status?: string
}

export const DoctorAbleFiled = [
  'searchTerm',
  'district',
  'experience',
  'specialist',
]

export type IUpdateUser = {
  profile?: Profile
  address?: PermanentAddress
}
