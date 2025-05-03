"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        doctorId: zod_1.z.string({
            required_error: 'doctorId Is Required',
        }),
        bookingDate: zod_1.z.string({ required_error: 'Service Day Is Required' }),
        gender: zod_1.z.string({
            required_error: 'gender Is Required',
        }),
        age: zod_1.z.number({
            required_error: 'age Is Required',
        }),
        weight: zod_1.z.number({
            required_error: 'weight Is Required',
        }),
        bloodGroup: zod_1.z.string({
            required_error: 'bloodGroup Is Required',
        }),
        patientProblem: zod_1.z.string({
            required_error: 'patientProblem Is Required',
        }),
        slatTime: zod_1.z.string({ required_error: 'slatTime Day Is Required' }),
        report: zod_1.z.string({
            required_error: 'report Is Required',
        }),
        address: zod_1.z.string({
            required_error: 'address Is Required',
        }),
        serviceId: zod_1.z.string({
            required_error: 'serviceId Is Required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        doctorId: zod_1.z.string().optional(),
        bookingDate: zod_1.z.array(zod_1.z.string()).optional(),
        gender: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        weight: zod_1.z.number().optional(),
        bloodGroup: zod_1.z.string().optional(),
        patientProblem: zod_1.z.string().optional(),
        slatTime: zod_1.z.string().optional(),
        report: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        serviceId: zod_1.z.string().optional(),
    }),
});
exports.AppointmentValidation = {
    create,
    update,
};
