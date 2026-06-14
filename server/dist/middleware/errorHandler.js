"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const errorHandler = (err, req, res, _next) => {
    if (err instanceof zod_1.ZodError) {
        const formattedErrors = err.issues.map((issue) => {
            // إذا كانت الرسالة عبارة عن مفتاح ترجمة، قم بترجمتها، وإلا استخدم الرسالة الأصلية
            const translatedMessage = req.t ? req.t(issue.message) : issue.message;
            return {
                field: issue.path.join('.'),
                message: translatedMessage
            };
        });
        return res.status(400).json({
            success: false,
            errors: formattedErrors
        });
    }
    const status = err.statusCode || err.status || 500;
    let message = err.message || 'errors:internal_error';
    // المحاولة لترجمة الرسالة إذا كانت عبارة عن Key
    if (req.t) {
        message = req.t(message);
    }
    return res.status(status).json({ message });
};
exports.errorHandler = errorHandler;
