"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleClientRequestError = (error) => {
    let errors = [];
    let message = '';
    const statusCode = 400;
    if (error.code == 'P2025') {
        message = error.message;
        errors = [{ path: '', message: error.message }];
    }
    else if (error.code == 'P2003') {
        if (error.message.includes('delete()` invocation:')) {
            message = error.message;
            errors = [{ path: '', message: error.message }];
        }
    }
    return {
        statusCode,
        message,
        errorMessages: errors,
    };
};
exports.default = handleClientRequestError;
