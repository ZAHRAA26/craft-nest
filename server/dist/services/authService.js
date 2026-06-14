"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const httpError_1 = require("../utils/httpError");
const userService_1 = require("./userService");
const hash_1 = require("../utils/hash");
const tokens_1 = require("../utils/tokens");
const mailer_1 = require("../utils/mailer");
const roles_1 = require("../constants/roles");
class AuthService {
    async register(payload, baseUrl, lng = 'ar') {
        const existing = await userService_1.userService.findByEmail(payload.email);
        if (existing) {
            throw new httpError_1.HttpError(409, 'auth:email_registered');
        }
        if (payload.role && !Object.values(roles_1.PublicRole).includes(payload.role)) {
            throw new httpError_1.HttpError(400, 'errors:invalid_role');
        }
        const password = await (0, hash_1.hashPassword)(payload.password);
        const mappedRole = payload.role ? roles_1.RoleMapping[payload.role] : roles_1.UserRole.BUYER;
        const user = await userService_1.userService.create({
            name: payload.name,
            email: payload.email.toLowerCase(),
            password,
            role: mappedRole,
            craftSpecialty: payload.craftSpecialty,
            bio: payload.bio
        });
        const verifyToken = (0, tokens_1.generateEmailVerificationToken)(user._id.toString());
        const verifyLink = `${baseUrl}/api/auth/verify-email?token=${verifyToken}`;
        await (0, mailer_1.sendVerificationEmail)(user.email, verifyLink, lng);
        return user;
    }
    async login(email, password) {
        const user = await userService_1.userService.findByEmailWithPassword(email);
        if (!user) {
            throw new httpError_1.HttpError(401, 'auth:invalid_credentials');
        }
        if (user.isBlocked) {
            throw new httpError_1.HttpError(403, 'errors:account_blocked');
        }
        const valid = await (0, hash_1.verifyPassword)(password, user.password || '');
        if (!valid) {
            throw new httpError_1.HttpError(401, 'auth:invalid_credentials');
        }
        if (!user.isEmailVerified) {
            throw new httpError_1.HttpError(403, 'auth:email_not_verified');
        }
        const uid = user._id.toString();
        const accessToken = (0, tokens_1.generateAccessToken)(uid, user.email);
        const { token: refreshToken, jti, jtiHash } = await (0, tokens_1.generateRefreshToken)(uid);
        await userService_1.userService.addRefreshToken(uid, jtiHash);
        return {
            accessToken,
            refreshToken,
            user: { id: uid, name: user.name, email: user.email, role: user.role }
        };
    }
    async refreshToken(refreshToken) {
        const payload = (0, tokens_1.verifyJwt)(refreshToken);
        if (payload.type !== 'refresh' || !payload.sub || !payload.jti) {
            throw new httpError_1.HttpError(401, 'auth:invalid_refresh_token');
        }
        const user = await userService_1.userService.findById(payload.sub);
        if (!user) {
            throw new httpError_1.HttpError(401, 'auth:invalid_refresh_token');
        }
        if (user.isBlocked) {
            throw new httpError_1.HttpError(403, 'errors:account_blocked');
        }
        const valid = await userService_1.userService.verifyRefreshToken(user._id.toString(), payload.jti);
        if (!valid) {
            throw new httpError_1.HttpError(401, 'auth:invalid_refresh_token');
        }
        return (0, tokens_1.generateAccessToken)(user._id.toString(), user.email);
    }
    async verifyEmailToken(token, lng = 'ar') {
        const payload = (0, tokens_1.verifyJwt)(token);
        if (payload.action !== 'verify' || !payload.sub) {
            throw new httpError_1.HttpError(400, 'auth:invalid_token');
        }
        const user = await userService_1.userService.findById(payload.sub);
        if (!user) {
            throw new httpError_1.HttpError(404, 'errors:user_not_found');
        }
        user.isEmailVerified = true;
        await user.save();
        await (0, mailer_1.sendWelcomeEmail)(user.email, user.name, lng);
        return user;
    }
    async forgotPassword(email, baseUrl, lng = 'ar') {
        const user = await userService_1.userService.findByEmail(email);
        if (!user) {
            return;
        }
        const resetToken = (0, tokens_1.generatePasswordResetToken)(user._id.toString());
        const resetLink = `${baseUrl}/reset-password?token=${resetToken}`;
        await (0, mailer_1.sendPasswordResetEmail)(user.email, resetLink, lng);
    }
    async resetPassword(token, newPassword) {
        const payload = (0, tokens_1.verifyJwt)(token);
        if (payload.action !== 'reset' || !payload.sub) {
            throw new httpError_1.HttpError(400, 'auth:invalid_token');
        }
        const user = await userService_1.userService.findById(payload.sub);
        if (!user) {
            throw new httpError_1.HttpError(404, 'errors:user_not_found');
        }
        user.password = await (0, hash_1.hashPassword)(newPassword);
        user.passwordChangedAt = new Date();
        await user.save();
        return user;
    }
    async logout(userId, refreshToken, allDevices = false) {
        /**
         * منطق تسجيل الخروج الاحترافي:
         * 1. في حالة "جميع الأجهزة": نقوم بمسح كافة التوكنات. لا نشترط الـ refreshToken
         *    هنا للسماح للمستخدم بتأمين حسابه في حالات الطوارئ (مثل فقدان الجهاز).
         * 2. في حالة "جهاز واحد": يجب إرسال الـ refreshToken لتعريف الجلسة المراد إبطالها.
         */
        if (allDevices) {
            await userService_1.userService.revokeAllRefreshTokens(userId);
            return;
        }
        if (!refreshToken) {
            throw new httpError_1.HttpError(400, 'errors:refresh_token_required');
        }
        try {
            const payload = (0, tokens_1.verifyJwt)(refreshToken);
            if (payload.sub !== userId || !payload.jti) {
                throw new httpError_1.HttpError(401, 'auth:invalid_refresh_token');
            }
            await userService_1.userService.removeRefreshToken(userId, payload.jti);
        }
        catch (error) {
            throw new httpError_1.HttpError(401, 'auth:invalid_refresh_token');
        }
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
