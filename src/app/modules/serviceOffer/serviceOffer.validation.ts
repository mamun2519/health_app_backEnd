import { z } from 'zod'

const create = z.object({
  body: z.object({
    serviceId: z.string({
      required_error: 'serviceId Is Required',
    }),

    offerTitle: z.string({
      required_error: 'offerTitle Is Required',
    }),
    promoCode: z.string({
      required_error: 'promoCode Is Required',
    }),
    discount: z.number({
      required_error: 'discount Is Required',
    }),
    expireDate: z.string({
      required_error: 'expireDate Is Required',
    }),
  }),
})

const update = z.object({
  body: z.object({
    serviceId: z.string().optional(),
    offerTitle: z.string().optional(),
    promoCode: z.string().optional(),
    discount: z.number().optional(),
    expireDate: z.string().optional(),
  }),
})

export const ServiceOfferValidation = {
  create,
  update,
}
