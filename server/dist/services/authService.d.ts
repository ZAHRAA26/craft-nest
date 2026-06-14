import { IUser } from '../models/user';
import { PublicRole } from '../constants/roles';
export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    role?: PublicRole;
    craftSpecialty?: string[];
    bio?: {
        ar?: string;
        en?: string;
    };
}
export declare class AuthService {
    register(payload: RegisterPayload, baseUrl: string, lng?: string): Promise<IUser>;
    login(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
        };
    }>;
    refreshToken(refreshToken: string): Promise<string>;
    verifyEmailToken(token: string, lng?: string): Promise<IUser>;
    forgotPassword(email: string, baseUrl: string, lng?: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<IUser>;
    logout(userId: string, refreshToken?: string, allDevices?: boolean): Promise<void>;
}
export declare const authService: AuthService;
