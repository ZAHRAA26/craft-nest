import jwt from 'jsonwebtoken';
export declare function generateAccessToken(userId: string, email: string): string;
export declare function generateRefreshToken(userId: string): Promise<{
    token: string;
    jti: string;
    jtiHash: string;
}>;
export declare function generateEmailVerificationToken(userId: string): string;
export declare function generatePasswordResetToken(userId: string): string;
export declare function verifyJwt(token: string): string | jwt.JwtPayload;
export declare function compareJti(jti: string, jtiHash: string): Promise<boolean>;
