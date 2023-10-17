import { User } from '@prisma/client'

export type IUserRequest = {
  name: {
    first_name: string
    last_name: string
  }
  email: string
  password: string
  avatar: string
  status?: string
  role?: string
  cover: string
}

export type IDonorAndDoctorRequest = {
  name: {
    first_name: string
    last_name: string
  }
  email: string
  password: string
  avatar: string
  status?: string
  role?: string
  date_of_birth: string
  last_donnet_date?: string
  degree?: string
  specialist?: string
  experience?: string
  present_Address: {
    district: string
    sub_district: string
    police_station?: string
    address: string
  }
  permanent_Address: {
    district: string
    sub_district: string
    police_station?: string
    address: string
  }
  blood_group: string
  gender: string
  phone: string
  education?: [
    {
      institute?: string
      pass_year?: string
      GPA?: string
      completionYear?: string
    },
  ]
}
export type IRestPasswordRequest = {
  email: string
  oldPassword: string
  newPassword: string
}

export type ILoginData = {
  password: string
  email?: string | undefined
  user_name?: string | undefined
}

export type IUserResponse = {
  user: User
  token: {
    accessToken?: string
    refreshToken?: string
  }
}
