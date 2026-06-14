"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("../config");
const userService_1 = require("../services/userService");
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.config.jwtSecret
};
exports.jwtStrategy = new passport_jwt_1.Strategy(opts, async (payload, done) => {
    try {
        const sub = payload.sub;
        const iat = payload.iat;
        if (!sub)
            return done(null, false);
        const user = await userService_1.userService.findById(sub);
        if (!user)
            return done(null, false);
        // التحقق من حالة الحظر
        if (user.isBlocked)
            return done(null, false);
        // إبطال التوكنات القديمة في حال تم تغيير كلمة المرور
        if (user.passwordChangedAt && iat) {
            const changedAt = Math.floor(user.passwordChangedAt.getTime() / 1000);
            if (iat < changedAt) {
                return done(null, false);
            }
        }
        return done(null, user);
    }
    catch (err) {
        return done(err, false);
    }
});
