import { Request, Response, NextFunction } from 'express';
import { RoleValue } from '../constants/roles';
export declare const requireAuth: any;
export declare function requireRole(...roles: RoleValue[]): (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
