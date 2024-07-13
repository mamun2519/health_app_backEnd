"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicineValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        durgName: zod_1.z.string({
            required_error: 'durgName Is Required',
        }),
        eatingTime: zod_1.z.array(zod_1.z.string({
            required_error: 'Service Day Is Required',
        })),
        duration: zod_1.z.string({
            required_error: 'duration Is Required',
        }),
        advice: zod_1.z.string({
            required_error: 'advice Is Required',
        }),
        eat: zod_1.z.string({
            required_error: 'eat Is Required',
        }),
        prescriptionId: zod_1.z.string({
            required_error: 'prescriptionId Is Required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        durgName: zod_1.z.string().optional(),
        eatingTime: zod_1.z.array(zod_1.z.string()).optional(),
        duration: zod_1.z.string().optional(),
        advice: zod_1.z.string().optional(),
        eat: zod_1.z.string().optional(),
        prescriptionId: zod_1.z.string().optional(),
    }),
});
exports.MedicineValidation = {
    create,
    update,
};
