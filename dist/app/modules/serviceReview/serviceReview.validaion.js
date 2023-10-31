'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ServiceReviewValidation = void 0
const zod_1 = require('zod')
const create = zod_1.z.object({
  body: zod_1.z.object({
    serviceId: zod_1.z.string({
      required_error: 'serviceId Is Required',
    }),
    comment: zod_1.z.string({
      required_error: 'comment Is Required',
    }),
    rating: zod_1.z.number({
      required_error: 'comment Is Required',
    }),
  }),
})
const update = zod_1.z.object({
  body: zod_1.z.object({
    serviceId: zod_1.z.string().optional(),
    comment: zod_1.z.string().optional(),
    rating: zod_1.z.number().optional(),
  }),
})
exports.ServiceReviewValidation = {
  create,
  update,
}
