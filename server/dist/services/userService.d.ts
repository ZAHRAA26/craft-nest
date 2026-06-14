import { IUser } from '../models/user';
import { RoleValue } from '../constants/roles';
declare class UserService {
    create(data: {
        name: string;
        email: string;
        password: string;
        role?: RoleValue;
        craftSpecialty?: string[];
        bio?: {
            ar?: string;
            en?: string;
        };
    }): Promise<IUser>;
    findByEmail(email: string): Promise<IUser | null>;
    findByEmailWithPassword(email: string): Promise<IUser | null>;
    findById(id: string): Promise<IUser | null>;
    all(): Promise<IUser[]>;
    addRefreshToken(userId: string, jtiHash: string): Promise<(import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    verifyRefreshToken(userId: string, jti: string): Promise<boolean>;
    removeRefreshToken(userId: string, jti: string): Promise<void>;
    revokeAllRefreshTokens(userId: string): Promise<(import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
export declare const userService: UserService;
export {};
