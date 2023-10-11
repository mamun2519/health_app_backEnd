import { z } from 'zod'

const create = z.object({
  body: z.object({
    service: z.object({
      title: z.string({
        required_error: 'Title Is Required',
      }),
      serviceDay: z.array(
        z.string({
          required_error: 'Service Day Is Required',
        }),
      ),
      price: z.string({
        required_error: 'price Is Required',
      }),
      category: z.string({
        required_error: 'category Is Required',
      }),

      avatar: z.string({
        required_error: 'avatar Is Required',
      }),
      aboutSerivce: z.string({
        required_error: 'aboutSerivce Is Required',
      }),
      serviceType: z.string({
        required_error: 'serviceType Is Required',
      }),
    }),
    salt: z.object({
      duration: z.string({
        required_error: 'duration is required',
      }),
      startTime: z.string({
        required_error: 'startTime is required',
      }),
      endTime: z.string({
        required_error: 'endTime is required',
      }),
    }),
  }),
})

const update = z.object({
  body: z.object({
    service: z.object({
      title: z.string().optional(),
      serviceDay: z.array(z.string()).optional(),
      price: z.string().optional(),
      avatar: z.string().optional(),
      aboutSerivce: z.string().optional(),
      serviceType: z.string().optional(),
      category: z.string().optional(),
    }),
    salt: z.object({
      duration: z.string().optional(),
      startTime: z.string().optional(),
      endTime: z.string().optional(),
    }),
  }),
})

export const DoctorServiceValidation = {
  create,
  update,
}
