import { z } from 'zod'

const create = z.object({
  body: z.object({
    doctorId: z.string({
      required_error: 'doctorId Is Required',
    }),
    bookingDate: z.string({ required_error: 'Service Day Is Required' }),
    gender: z.string({
      required_error: 'gender Is Required',
    }),
    age: z.number({
      required_error: 'age Is Required',
    }),
    weight: z.number({
      required_error: 'weight Is Required',
    }),
    bloodGroup: z.string({
      required_error: 'bloodGroup Is Required',
    }),
    patientProblem: z.string({
      required_error: 'patientProblem Is Required',
    }),
    slatTime: z.string({ required_error: 'slatTime Day Is Required' }),
    report: z.string({
      required_error: 'report Is Required',
    }),
    address: z.string({
      required_error: 'address Is Required',
    }),
    serviceId: z.string({
      required_error: 'serviceId Is Required',
    }),
  }),
})

const update = z.object({
  body: z.object({
    doctorId: z.string().optional(),
    bookingDate: z.array(z.string()).optional(),
    gender: z.string().optional(),
    age: z.number().optional(),
    weight: z.number().optional(),
    bloodGroup: z.string().optional(),
    patientProblem: z.string().optional(),
    slatTime: z.string().optional(),
    report: z.string().optional(),
    address: z.string().optional(),
    serviceId: z.string().optional(),
  }),
})

export const AppointmentValidation = {
  create,
  update,
}
