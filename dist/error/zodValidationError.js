"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodValidationError = (error) => {
    const statusCode = 400;
    const errors = error.issues.map((issue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    return {
        statusCode,
        message: 'Zod Validation Error',
        errorMessages: errors,
    };
};
exports.default = handleZodValidationError;
