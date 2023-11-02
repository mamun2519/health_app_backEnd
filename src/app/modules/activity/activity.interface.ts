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

export type IDoctorActivity = {
  appointment: number
  service: number
  completeDonation: number
  donorRequest: number
  balance: number
  patient: number
  pendingWithdraw: number
}

export type IAdminActivity = {
  appointment: number
  service: number
  completeDonation: number
  balance: number
  patient: number
  pendingWithdraw: number
  bloodDonor: number
  doctor: number
}
