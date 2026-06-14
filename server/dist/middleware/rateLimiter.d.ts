/**
 * نظام تحديد معدل الطلبات (Rate Limiting) الاحترافي
 * تم تقسيم النظام لثلاث مستويات لضمان الأمان والمرونة:
 */
export declare const generalLimiter: import("express-rate-limit").RateLimitRequestHandler;
export declare const authLimiter: import("express-rate-limit").RateLimitRequestHandler;
export declare const apiActionLimiter: import("express-rate-limit").RateLimitRequestHandler;
