export type IUserActivity = {
  bookingAppointment: number
  donorRequest: number
  completeDonation: number
  schedule: {
    date: string
    schedule: string
  }
  name: string
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
  name: string
}

export type IDoctorActivity = {
  appointment: number
  service: number
  completeDonation: number
  donorRequest: number
  balance: number
  patient: number
  pendingWithdraw: number
  name: string
}

export type IAdminActivity = {
  appointment: number
  service: number
  completeDonation: number
  balance: number
  sales: number
  pendingWithdraw: number
  bloodDonor: number
  doctor: number
  name: string
  topService: {
    doctorName: string
    serviceName: string
    price: number
  }[]
  topDonor: {
    donorName: string
    bloodGroup: string
    totalBloodDonatedQuantity: number
  }[]
}
