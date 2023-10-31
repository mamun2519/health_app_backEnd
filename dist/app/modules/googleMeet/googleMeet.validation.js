'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.GoogleMeetValidation = void 0
const zod_1 = require('zod')
const create = zod_1.z.object({
  body: zod_1.z.object({
    serviceId: zod_1.z.string({
      required_error: 'serviceId Is Required',
    }),
    meetLink: zod_1.z.string({
      required_error: 'meetLink Is Required',
    }),
  }),
})
const update = zod_1.z.object({
  body: zod_1.z.object({
    serviceId: zod_1.z.string().optional(),
    meetLink: zod_1.z.string().optional(),
    status: zod_1.z.string().optional(),
  }),
})
exports.GoogleMeetValidation = {
  create,
  update,
}
