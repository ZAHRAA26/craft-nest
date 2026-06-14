"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (process.env.NODE_ENV === 'production') {
    console.warn('Running in production mode. Ensure all environment variables are set correctly.');
}
else {
    console.info('Running in development mode. Loaded environment variables from .env file.');
}
/**
 * ملف الإعدادات المركزي (Centralized Config)
 * الهدف: تجميع كافة متغيرات البيئة في مكان واحد لتسهيل الصيانة وتجنب تكرار process.env
 */
exports.config = {
    env: process.env.NODE_ENV,
    port: Number(process.env.PORT),
    jwtSecret: process.env.JWT_SECRET,
    saltRounds: Number(process.env.SALT_ROUNDS),
    secretKey: process.env.SECRET_KEY,
    // إعدادات قاعدة البيانات
    mongo: {
        uri: process.env.MONGO_URI,
    },
    // نظام الأدوار المحمي (Secret Roles)
    // استخدام نصوص سرية فريدة تجعل تخمين الأدوار مستحيلاً حتى لو تم تسريب قاعدة البيانات جزئياً
    roles: {
        admin: process.env.ADMIN_ROLE,
        artisan: process.env.ARTISAN_ROLE,
        buyer: process.env.BUYER_ROLE
    },
    // إعدادات البريد الإلكتروني
    mail: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 1025,
        secure: process.env.SMTP_SECURE === 'true',
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
        from: process.env.SMTP_FROM || 'Crafts Platform <no-reply@crafts.local>',
    },
    // روابط الواجهة الأمامية والتوثيق
    urls: {
        frontend: process.env.FRONTEND_URL,
        server: process.env.SERVER_URL,
    }
};
