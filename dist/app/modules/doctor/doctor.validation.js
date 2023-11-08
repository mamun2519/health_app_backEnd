"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorServiceValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        service: zod_1.z.object({
            title: zod_1.z.string({
                required_error: 'Title Is Required',
            }),
            serviceDay: zod_1.z.array(zod_1.z.string({
                required_error: 'Service Day Is Required',
            })),
            price: zod_1.z.string({
                required_error: 'price Is Required',
            }),
            category: zod_1.z.string({
                required_error: 'category Is Required',
            }),
            avatar: zod_1.z.string({
                required_error: 'avatar Is Required',
            }),
            aboutSerivce: zod_1.z.string({
                required_error: 'aboutSerivce Is Required',
            }),
            serviceType: zod_1.z.string({
                required_error: 'serviceType Is Required',
            }),
        }),
        salt: zod_1.z.object({
            duration: zod_1.z.string({
                required_error: 'duration is required',
            }),
            startTime: zod_1.z.string({
                required_error: 'startTime is required',
            }),
            endTime: zod_1.z.string({
                required_error: 'endTime is required',
            }),
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        service: zod_1.z.object({
            title: zod_1.z.string().optional(),
            serviceDay: zod_1.z.array(zod_1.z.string()).optional(),
            price: zod_1.z.string().optional(),
            avatar: zod_1.z.string().optional(),
            aboutSerivce: zod_1.z.string().optional(),
            serviceType: zod_1.z.string().optional(),
            category: zod_1.z.string().optional(),
        }),
        salt: zod_1.z.object({
            duration: zod_1.z.string().optional(),
            startTime: zod_1.z.string().optional(),
            endTime: zod_1.z.string().optional(),
        }),
    }),
});
exports.DoctorServiceValidation = {
    create,
    update,
};
