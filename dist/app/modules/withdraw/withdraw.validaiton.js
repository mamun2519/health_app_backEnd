"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        amount: zod_1.z.number({
            required_error: 'amount Is Required',
        }),
        paymentReciveType: zod_1.z.string({
            required_error: 'paymentReciveType Is Required',
        }),
        number: zod_1.z.string({
            required_error: 'number Is Required',
        }),
        bankName: zod_1.z.number().optional(),
        // withdrawAccptetManagerId: z.string(),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        amount: zod_1.z.number().optional(),
        paymentReciveType: zod_1.z.string().optional(),
        number: zod_1.z.string().optional(),
        bankName: zod_1.z.number().optional(),
        withdrawAccptetManagerId: zod_1.z.string().optional(),
    }),
});
exports.withdrawValidation = {
    create,
    update,
};
