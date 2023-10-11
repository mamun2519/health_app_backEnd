import { z } from 'zod'

const create = z.object({
  body: z.object({
    testName: z.string({
      required_error: 'testName Is Required',
    }),

    description: z.string({
      required_error: 'description Is Required',
    }),
    prescriptionId: z.string({
      required_error: 'description Is Required',
    }),
  }),
})

const update = z.object({
  body: z.object({
    testName: z.string().optional(),
    description: z.string().optional(),
    prescriptionId: z.string().optional(),
  }),
})

export const HaltReportValidation = {
  create,
  update,
}
