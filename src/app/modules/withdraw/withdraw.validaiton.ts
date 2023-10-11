import { z } from 'zod'

const create = z.object({
  body: z.object({
    amount: z.number({
      required_error: 'amount Is Required',
    }),
    paymentReciveType: z.string({
      required_error: 'paymentReciveType Is Required',
    }),
    number: z.string({
      required_error: 'number Is Required',
    }),
    bankName: z.number().optional(),
    withdrawAccptetManagerId: z.string(),
  }),
})

const update = z.object({
  body: z.object({
    amount: z.number().optional(),
    paymentReciveType: z.string().optional(),
    number: z.string().optional(),
    bankName: z.number().optional(),
    withdrawAccptetManagerId: z.string().optional(),
  }),
})

export const withdrawValidation = {
  create,
  update,
}
