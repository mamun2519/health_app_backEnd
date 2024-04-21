'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.MeetRequestValidation = void 0
const zod_1 = require('zod')
const create = zod_1.z.object({
  body: zod_1.z.object({
    meetingId: zod_1.z.string({
      required_error: 'meetingId Is Required',
    }),
    appointmentId: zod_1.z.string({
      required_error: 'appointmentId Is Required',
    }),
    serialNo: zod_1.z.number({
      required_error: 'serialNo Is Required',
    }),
    phoneNumber: zod_1.z.string({
      required_error: 'phoneNumber Is Required',
    }),
    // doctorId: z.string({
    //   required_error: 'doctorId Is Required',
    // }),
  }),
})
const update = zod_1.z.object({
  body: zod_1.z.object({
    meetingId: zod_1.z.string().optional(),
    appointmentId: zod_1.z.string().optional(),
    serialNo: zod_1.z.number().optional(),
    phoneNumber: zod_1.z.string().optional(),
    doctorId: zod_1.z.string().optional(),
  }),
})
exports.MeetRequestValidation = {
  create,
  update,
}
