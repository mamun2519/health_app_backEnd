"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Send_API_Error extends Error {
    constructor(statusCode, message, stack = '') {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = Send_API_Error;
