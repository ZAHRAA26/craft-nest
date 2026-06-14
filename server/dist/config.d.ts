/**
 * ملف الإعدادات المركزي (Centralized Config)
 * الهدف: تجميع كافة متغيرات البيئة في مكان واحد لتسهيل الصيانة وتجنب تكرار process.env
 */
export declare const config: {
    env: string | undefined;
    port: number;
    jwtSecret: string;
    saltRounds: number;
    secretKey: string;
    mongo: {
        uri: string;
    };
    roles: {
        admin: string;
        artisan: string;
        buyer: string;
    };
    mail: {
        host: string;
        port: number;
        secure: boolean;
        user: string;
        pass: string;
        from: string;
    };
    urls: {
        frontend: string;
        swagger: string;
    };
};
