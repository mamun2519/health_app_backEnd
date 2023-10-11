import { z } from 'zod'

const create = z.object({
  body: z.object({
    meetingId: z.string({
      required_error: 'meetingId Is Required',
    }),

    appointmentId: z.string({
      required_error: 'appointmentId Is Required',
    }),
    serialNo: z.number({
      required_error: 'serialNo Is Required',
    }),
    phoneNumber: z.string({
      required_error: 'phoneNumber Is Required',
    }),
    doctorId: z.string({
      required_error: 'doctorId Is Required',
    }),
  }),
})

const update = z.object({
  body: z.object({
    meetingId: z.string().optional(),
    appointmentId: z.string().optional(),
    serialNo: z.number().optional(),
    phoneNumber: z.string().optional(),
    doctorId: z.string().optional(),
  }),
})

export const MeetRequestValidation = {
  create,
  update,
}
