export type IUserActivity = {
  bookingAppointment: number
  donorRequest: number
  completeDonation: number
  schedule: {
    date: string
    schedule: string
  }
}
