/**
 * نظام الأدوار المحمي (Role Security System)
 * بدلاً من استخدام نصوص صريحة مثل 'admin'، نستخدم مفاتيح سرية (Secret Keys)
 * يتم جلب هذه المفاتيح من ملف الإعدادات المركزي لضمان أعلى مستوى من الحماية.
 */
export declare const UserRole: {
    readonly ADMIN: string;
    readonly ARTISAN: string;
    readonly BUYER: string;
};
export type RoleValue = typeof UserRole[keyof typeof UserRole];
/**
 * الأدوار العامة (Public Role Labels)
 * تُستخدم في التوثيق (Swagger) والطلبات (API Requests) بدلاً من المفاتيح السرية.
 */
export declare enum PublicRole {
    ARTISAN = "artisan",
    BUYER = "buyer"
}
/**
 * خريطة تحويل الأدوار من العامة إلى السرية
 */
export declare const RoleMapping: Record<PublicRole, RoleValue>;
/**
 * دالة التحويل العكسي: تحويل المفتاح السري إلى اسم عام للعرض في الواجهة
 */
export declare function getPublicRole(roleValue: RoleValue): string;
export declare const publicRegistrationRoles: RoleValue[];
export declare function isValidRole(value: any): boolean;
export declare function isPublicRegistrationRole(value: any): boolean;
