'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.HaltReportValidation = void 0
const zod_1 = require('zod')
const create = zod_1.z.object({
  body: zod_1.z.object({
    testName: zod_1.z.string({
      required_error: 'testName Is Required',
    }),
    description: zod_1.z.string({
      required_error: 'description Is Required',
    }),
    prescriptionId: zod_1.z.string({
      required_error: 'description Is Required',
    }),
  }),
})
const update = zod_1.z.object({
  body: zod_1.z.object({
    testName: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    prescriptionId: zod_1.z.string().optional(),
  }),
})
exports.HaltReportValidation = {
  create,
  update,
}
