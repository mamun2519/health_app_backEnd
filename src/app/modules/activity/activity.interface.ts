export type IUserActivity = {
  bookingAppointment: number
  donorRequest: number
  completeDonation: number
  schedule: {
    date: string
    schedule: string
  }
}

export type IDonorActivity = {
  bookingAppointment: number
  donorRequest: number
  completeDonation: number
  pendingRequest: number
  schedule: {
    date: string
    schedule: string
  }
}
