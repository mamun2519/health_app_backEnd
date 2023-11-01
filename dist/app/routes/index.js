'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.RootRoutes = void 0
const express_1 = __importDefault(require('express'))
const auth_route_1 = require('../modules/auth/auth.route')
const user_route_1 = require('../modules/user/user.route')
const bloodDonor_route_1 = require('../modules/bloodDonor/bloodDonor.route')
const donnerReview_route_1 = require('../modules/donorReview/donnerReview.route')
const doctor_route_1 = require('../modules/doctor/doctor.route')
const serviceOffer_route_1 = require('../modules/serviceOffer/serviceOffer.route')
const serviceReview_route_1 = require('../modules/serviceReview/serviceReview.route')
const prescription_route_1 = require('../modules/prescription/prescription.route')
const medicine_route_1 = require('../modules/medicine/medicine.route')
const appointment_route_1 = require('../modules/appointment/appointment.route')
const haltReport_route_1 = require('../modules/haltReport/haltReport.route')
const googleMeet_route_1 = require('../modules/googleMeet/googleMeet.route')
const meetRequest_route_1 = require('../modules/meetRequest/meetRequest.route')
const payment_route_1 = require('../modules/payment/payment.route')
const withdraw_route_1 = require('../modules/withdraw/withdraw.route')
const router = express_1.default.Router()
const allModulesRoutes = [
  {
    path: '/auth',
    route: auth_route_1.AuthRoutes,
  },
  {
    path: '/user',
    route: user_route_1.UserRoutes,
  },
  {
    path: '/blood-donor',
    route: bloodDonor_route_1.BloodDonorRoutes,
  },
  {
    path: '/donor-review',
    route: donnerReview_route_1.DonorReviewRoutes,
  },
  {
    path: '/doctor-service',
    route: doctor_route_1.DoctorServiceRoutes,
  },
  {
    path: '/service-offer',
    route: serviceOffer_route_1.OfferServiceRoutes,
  },
  {
    path: '/service-review',
    route: serviceReview_route_1.ServiceReviewRoutes,
  },
  {
    path: '/appointment',
    route: appointment_route_1.AppointmentRoutes,
  },
  {
    path: '/prescription',
    route: prescription_route_1.PrescriptionRoutes,
  },
  {
    path: '/medicine',
    route: medicine_route_1.MedicineRoutes,
  },
  {
    path: '/halt-report',
    route: haltReport_route_1.HaltReportRoutes,
  },
  {
    path: '/google-meet',
    route: googleMeet_route_1.GoogleMeetRoutes,
  },
  {
    path: '/meet-request',
    route: meetRequest_route_1.MeetingRequestRoutes,
  },
  {
    path: '/payment',
    route: payment_route_1.PaymentRoute,
  },
  {
    path: '/withdraw',
    route: withdraw_route_1.WithdrawRoutes,
  },
]
allModulesRoutes.forEach(route => router.use(route.path, route.route))
exports.RootRoutes = router
