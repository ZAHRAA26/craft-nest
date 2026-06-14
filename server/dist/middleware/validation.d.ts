import { ZodTypeAny } from 'zod';
import { RequestHandler } from 'express';
/**
 * ميدل وير التحقق من البيانات (Validation Middleware)
 * تم التعديل ليتوافق مع Express 5 الذي يمنع إعادة تعيين req.query مباشرة.
 */
export declare function validateBody(schema: ZodTypeAny): RequestHandler;
export declare function validateQuery(schema: ZodTypeAny): RequestHandler;
