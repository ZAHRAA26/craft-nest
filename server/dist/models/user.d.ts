import mongoose, { Document } from 'mongoose';
import { RoleValue } from '../constants/roles';
export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: RoleValue;
    isEmailVerified: boolean;
    isBlocked: boolean;
    passwordChangedAt?: Date;
    craftSpecialty: string[];
    bio: {
        ar?: string;
        en?: string;
    };
    refreshTokens: Array<{
        jtiHash: string;
        createdAt: Date;
    }>;
    createdAt: Date;
    updatedAt: Date;
}
export declare const UserModel: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
