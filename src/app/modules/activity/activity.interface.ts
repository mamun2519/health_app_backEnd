export type IUserActivity = {
  bookingAppointment: number
  donorRequest: number
  completeDonation: number
  schedule: {
    date: string
    schedule: string
  }
  name: string
  myDonarRequest: {
    donarName: string
    total: number
    status: string
  }[]
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
  myCompleteDonation: {
    requestUserName: string
    total: number
    location: string
  }[]
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
  top5MyServicePrice: {
    category: string
    serviceName: string
    price: number
  }[]
  myTotalSales: number
  resentWithdraw: {
    amount: number
    companyEarn: number
    date: Date
  }[]
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
  lastWithdraw: {
    name: string
    amount: number
  }[]
}
