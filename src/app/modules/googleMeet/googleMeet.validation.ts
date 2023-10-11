import { z } from 'zod'

const create = z.object({
  body: z.object({
    serviceId: z.string({
      required_error: 'serviceId Is Required',
    }),

    meetLink: z.string({
      required_error: 'meetLink Is Required',
    }),
  }),
})

const update = z.object({
  body: z.object({
    serviceId: z.string().optional(),
    meetLink: z.string().optional(),
  }),
})

export const GoogleMeetValidation = {
  create,
  update,
}
