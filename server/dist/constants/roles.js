"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRegistrationRoles = exports.RoleMapping = exports.PublicRole = exports.UserRole = void 0;
exports.getPublicRole = getPublicRole;
exports.isValidRole = isValidRole;
exports.isPublicRegistrationRole = isPublicRegistrationRole;
const config_1 = require("../config");
/**
 * نظام الأدوار المحمي (Role Security System)
 * بدلاً من استخدام نصوص صريحة مثل 'admin'، نستخدم مفاتيح سرية (Secret Keys)
 * يتم جلب هذه المفاتيح من ملف الإعدادات المركزي لضمان أعلى مستوى من الحماية.
 */
exports.UserRole = {
    ADMIN: config_1.config.roles.admin,
    ARTISAN: config_1.config.roles.artisan,
    BUYER: config_1.config.roles.buyer
};
/**
 * الأدوار العامة (Public Role Labels)
 * تُستخدم في التوثيق (Swagger) والطلبات (API Requests) بدلاً من المفاتيح السرية.
 */
var PublicRole;
(function (PublicRole) {
    PublicRole["ARTISAN"] = "artisan";
    PublicRole["BUYER"] = "buyer";
})(PublicRole || (exports.PublicRole = PublicRole = {}));
/**
 * خريطة تحويل الأدوار من العامة إلى السرية
 */
exports.RoleMapping = {
    [PublicRole.ARTISAN]: exports.UserRole.ARTISAN,
    [PublicRole.BUYER]: exports.UserRole.BUYER
};
/**
 * دالة التحويل العكسي: تحويل المفتاح السري إلى اسم عام للعرض في الواجهة
 */
function getPublicRole(roleValue) {
    if (roleValue === exports.UserRole.ADMIN)
        return 'admin';
    const entry = Object.entries(exports.RoleMapping).find(([_, value]) => value === roleValue);
    return entry ? entry[0] : 'user';
}
exports.publicRegistrationRoles = [exports.UserRole.BUYER, exports.UserRole.ARTISAN];
function isValidRole(value) {
    return Object.values(exports.UserRole).includes(value);
}
function isPublicRegistrationRole(value) {
    return exports.publicRegistrationRoles.includes(value);
}
