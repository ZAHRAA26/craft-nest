import { z } from 'zod';
import { PublicRole } from '../constants/roles';
export declare const registerSchema: z.ZodObject<{
    name: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodOptional<z.ZodEnum<typeof PublicRole>>;
    craftSpecialty: z.ZodOptional<z.ZodArray<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>>;
    bio: z.ZodOptional<z.ZodObject<{
        ar: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>;
        en: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>;
    }, z.core.$strip>>;
}, z.core.$strict>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strict>;
export declare const refreshTokenSchema: z.ZodObject<{
    refreshToken: z.ZodString;
}, z.core.$strict>;
export declare const verifyEmailSchema: z.ZodObject<{
    token: z.ZodString;
}, z.core.$strict>;
export declare const forgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strict>;
export declare const resetPasswordSchema: z.ZodObject<{
    token: z.ZodString;
    password: z.ZodString;
}, z.core.$strict>;
export declare const logoutSchema: z.ZodObject<{
    refreshToken: z.ZodOptional<z.ZodString>;
    allDevices: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strict>;
export declare const newsletterSchema: z.ZodObject<{
    subject: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    message: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
}, z.core.$strict>;
export declare const roleUpdateSchema: z.ZodObject<{
    role: z.ZodEnum<typeof PublicRole>;
}, z.core.$strict>;
