"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiActionLimiter = exports.authLimiter = exports.generalLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
/**
 * نظام تحديد معدل الطلبات (Rate Limiting) الاحترافي
 * تم تقسيم النظام لثلاث مستويات لضمان الأمان والمرونة:
 */
// 1. المحدِد العام (General Limiter): لحماية جميع المسارات بشكل عام
exports.generalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 دقيقة
    max: 100, // حد أقصى 100 طلب لكل 15 دقيقة
    standardHeaders: true,
    legacyHeaders: false,
    message: (req) => ({
        status: 429,
        message: req.t('errors:too_many_requests')
    })
});
// 2. المحدِد الصارم (Auth Limiter): لحماية مسارات الحساسة مثل التسجيل والدخول
exports.authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000, // ساعة واحدة
    max: 10, // يسمح بـ 10 محاولات فقط في الساعة (للدخول/التسجيل/استعادة كلمة المرور)
    standardHeaders: true,
    legacyHeaders: false,
    message: (req) => ({
        status: 429,
        message: req.t('errors:too_many_auth_attempts')
    }),
    // تخطي التحقق إذا كان الطلب ناجحاً (اختياري لتقليل القيود على المستخدمين الشرعيين)
    skipSuccessfulRequests: false
});
// 3. المحدِد الخاص بالرسائل الإخبارية (Newsletter Limiter): لمنع إساءة استخدام خدمة الإرسال
exports.apiActionLimiter = (0, express_rate_limit_1.default)({
    windowMs: 30 * 60 * 1000, // 30 دقيقة
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: (req) => ({
        status: 429,
        message: req.t('errors:too_many_actions')
    })
});
