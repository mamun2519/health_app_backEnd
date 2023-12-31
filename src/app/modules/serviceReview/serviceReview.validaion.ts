import { z } from 'zod'

const create = z.object({
  body: z.object({
    serviceId: z.string({
      required_error: 'serviceId Is Required',
    }),

    comment: z.string({
      required_error: 'comment Is Required',
    }),
    rating: z.number({
      required_error: 'comment Is Required',
    }),
  }),
})

const update = z.object({
  body: z.object({
    serviceId: z.string().optional(),
    comment: z.string().optional(),
    rating: z.number().optional(),
  }),
})

export const ServiceReviewValidation = {
  create,
  update,
}
