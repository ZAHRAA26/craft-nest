"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleUpdateSchema = exports.newsletterSchema = exports.logoutSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.verifyEmailSchema = exports.refreshTokenSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const roles_1 = require("../constants/roles");
/**
 * نظام التحقق من البيانات (Validation System) - مستوى الحماية القصوى
 * تم استخدام Zod مع إضافة قيود أمنية لمنع الهجمات الشائعة (XSS, NoSQL Injection, etc.)
 */
// وظيفة مساعدة لتنظيف النصوص من أي وسوم HTML (منع XSS)
const sanitizeString = (val) => val.replace(/<[^>]*>?/gm, '').trim();
// قاعدة التحقق من قوة كلمة المرور
const strongPassword = zod_1.z.string()
    .min(8, 'errors:password_too_short')
    .max(128)
    .regex(/[A-Z]/, 'errors:password_uppercase')
    .regex(/[a-z]/, 'errors:password_lowercase')
    .regex(/[0-9]/, 'errors:password_number')
    .regex(/[^A-Za-z0-9]/, 'errors:password_special');
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string()
        .min(2)
        .max(100)
        .transform(sanitizeString),
    email: zod_1.z.string()
        .email('errors:invalid_email')
        .toLowerCase()
        .trim(),
    password: strongPassword,
    role: zod_1.z.nativeEnum(roles_1.PublicRole).optional(),
    craftSpecialty: zod_1.z.array(zod_1.z.string().transform(sanitizeString)).optional(),
    bio: zod_1.z.object({
        ar: zod_1.z.string().max(500).transform(sanitizeString).optional(),
        en: zod_1.z.string().max(500).transform(sanitizeString).optional()
    }).optional()
}).strict(); // منع إرسال حقول إضافية غير معرفة
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string()
        .email('errors:invalid_email')
        .toLowerCase()
        .trim(),
    password: zod_1.z.string().min(1, 'errors:password_required')
}).strict();
exports.refreshTokenSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(1, 'errors:token_required')
}).strict();
exports.verifyEmailSchema = zod_1.z.object({
    token: zod_1.z.string().min(1, 'errors:token_required')
}).strict();
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string()
        .email('errors:invalid_email')
        .toLowerCase()
        .trim()
}).strict();
exports.resetPasswordSchema = zod_1.z.object({
    token: zod_1.z.string().min(1, 'errors:token_required'),
    password: strongPassword
}).strict();
exports.logoutSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().optional(),
    allDevices: zod_1.z.boolean().optional()
}).strict();
exports.newsletterSchema = zod_1.z.object({
    subject: zod_1.z.string()
        .min(5)
        .max(120)
        .transform(sanitizeString),
    message: zod_1.z.string()
        .min(10)
        .max(5000)
        .transform(sanitizeString)
}).strict();
exports.roleUpdateSchema = zod_1.z.object({
    role: zod_1.z.nativeEnum(roles_1.PublicRole)
}).strict();
