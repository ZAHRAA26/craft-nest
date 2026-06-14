"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = validateBody;
exports.validateQuery = validateQuery;
/**
 * ميدل وير التحقق من البيانات (Validation Middleware)
 * تم التعديل ليتوافق مع Express 5 الذي يمنع إعادة تعيين req.query مباشرة.
 */
function validateBody(schema) {
    return (req, _res, next) => {
        const validated = schema.parse(req.body);
        // نقوم بتحديث الحقول الموجودة بدلاً من استبدال الكائن بالكامل
        Object.assign(req.body, validated);
        next();
    };
}
function validateQuery(schema) {
    return (req, _res, next) => {
        const validated = schema.parse(req.query);
        // في Express 5، req.query هو getter ولا يمكن إعادة تعيينه
        // لذا نقوم بحذف المفاتيح القديمة وإضافة المفاتيح التي تم التحقق منها
        for (const key in req.query) {
            delete req.query[key];
        }
        Object.assign(req.query, validated);
        next();
    };
}
