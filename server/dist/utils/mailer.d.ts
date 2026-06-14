export declare function sendVerificationEmail(to: string, link: string, lng?: string): Promise<void>;
export declare function sendPasswordResetEmail(to: string, link: string, lng?: string): Promise<void>;
export declare function sendWelcomeEmail(to: string, fullName: string, lng?: string): Promise<void>;
export declare function sendNewsEmail(to: string, subject: string, message: string, lng?: string): Promise<void>;
