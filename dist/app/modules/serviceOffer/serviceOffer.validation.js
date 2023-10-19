"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceOfferValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string({
            required_error: 'serviceId Is Required',
        }),
        offerTitle: zod_1.z.string({
            required_error: 'offerTitle Is Required',
        }),
        promoCode: zod_1.z.number({
            required_error: 'promoCode Is Required',
        }),
        discount: zod_1.z.number({
            required_error: 'discount Is Required',
        }),
        expireDate: zod_1.z.string({
            required_error: 'expireDate Is Required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string().optional(),
        offerTitle: zod_1.z.string().optional(),
        promoCode: zod_1.z.string().optional(),
        discount: zod_1.z.number().optional(),
        expireDate: zod_1.z.string().optional(),
    }),
});
exports.ServiceOfferValidation = {
    create,
    update,
};
