import express from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'
import { UserRoutes } from '../modules/user/user.route'
import { BloodDonorRoutes } from '../modules/bloodDonor/bloodDonor.route'
import { DonorReviewRoutes } from '../modules/donorReview/donnerReview.route'
import { DoctorServiceRoutes } from '../modules/doctor/doctor.route'
import { OfferServiceRoutes } from '../modules/serviceOffer/serviceOffer.route'
import { ServiceReviewRoutes } from '../modules/serviceReview/serviceReview.route'
import { PrescriptionRoutes } from '../modules/prescription/prescription.route'
import { MedicineRoutes } from '../modules/medicine/medicine.route'
import { AppointmentRoutes } from '../modules/appointment/appointment.route'
import { HaltReportRoutes } from '../modules/haltReport/haltReport.route'
import { GoogleMeetRoutes } from '../modules/googleMeet/googleMeet.route'
import { MeetingRequestRoutes } from '../modules/meetRequest/meetRequest.route'
import { PaymentRoute } from '../modules/payment/payment.route'
import { WithdrawRoutes } from '../modules/withdraw/withdraw.route'
import { NotificationRoutes } from '../modules/notification/route'
import { ActivityRoutes } from '../modules/activity/activity.route'
const router = express.Router()

const allModulesRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/blood-donor',
    route: BloodDonorRoutes,
  },
  {
    path: '/donor-review',
    route: DonorReviewRoutes,
  },
  {
    path: '/doctor-service',
    route: DoctorServiceRoutes,
  },
  {
    path: '/service-offer',
    route: OfferServiceRoutes,
  },
  {
    path: '/service-review',
    route: ServiceReviewRoutes,
  },
  {
    path: '/appointment',
    route: AppointmentRoutes,
  },
  {
    path: '/prescription',
    route: PrescriptionRoutes,
  },
  {
    path: '/medicine',
    route: MedicineRoutes,
  },
  {
    path: '/halt-report',
    route: HaltReportRoutes,
  },
  {
    path: '/google-meet',
    route: GoogleMeetRoutes,
  },
  {
    path: '/meet-request',
    route: MeetingRequestRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoute,
  },
  {
    path: '/withdraw',
    route: WithdrawRoutes,
  },
  {
    path: '/notification',
    route: NotificationRoutes,
  },
  {
    path: '/activity',
    route: ActivityRoutes,
  },
]

allModulesRoutes.forEach(route => router.use(route.path, route.route))

export const RootRoutes = router
