import { z } from 'zod'

const create = z.object({
  body: z.object({
    comment: z.string({
      required_error: 'comment Is Required',
    }),

    donorId: z.string({
      required_error: 'donorId Is Required',
    }),
    rating: z.number({
      required_error: 'rating Is Required',
    }),
  }),
})

const update = z.object({
  body: z.object({
    comment: z.string().optional(),
    donorId: z.string().optional(),
    rating: z.number().optional(),
  }),
})

export const DonorReviewValidation = {
  create,
  update,
}
