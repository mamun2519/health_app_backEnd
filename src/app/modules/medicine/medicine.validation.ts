import { z } from 'zod'

const create = z.object({
  body: z.object({
    durgName: z.string({
      required_error: 'durgName Is Required',
    }),
    eatingTime: z.array(
      z.string({
        required_error: 'Service Day Is Required',
      }),
    ),
    duration: z.string({
      required_error: 'duration Is Required',
    }),
    advice: z.string({
      required_error: 'advice Is Required',
    }),
    eat: z.string({
      required_error: 'eat Is Required',
    }),
    prescriptionId: z.string({
      required_error: 'prescriptionId Is Required',
    }),
  }),
})

const update = z.object({
  body: z.object({
    durgName: z.string().optional(),
    eatingTime: z.array(z.string()).optional(),
    duration: z.string().optional(),
    advice: z.string().optional(),
    eat: z.string().optional(),
    prescriptionId: z.string().optional(),
  }),
})

export const MedicineValidation = {
  create,
  update,
}
