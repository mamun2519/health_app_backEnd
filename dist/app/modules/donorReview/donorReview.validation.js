"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonorReviewValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        comment: zod_1.z.string({
            required_error: 'comment Is Required',
        }),
        donorId: zod_1.z.string({
            required_error: 'donorId Is Required',
        }),
        rating: zod_1.z.number({
            required_error: 'rating Is Required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        comment: zod_1.z.string().optional(),
        donorId: zod_1.z.string().optional(),
        rating: zod_1.z.number().optional(),
    }),
});
exports.DonorReviewValidation = {
    create,
    update,
};
