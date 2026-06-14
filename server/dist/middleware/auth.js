"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
exports.requireRole = requireRole;
const passport_1 = __importDefault(require("passport"));
const roles_1 = require("../constants/roles");
exports.requireAuth = passport_1.default.authenticate('jwt', { session: false });
function requireRole(...roles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            return res.status(401).json(({ message: req.t('errors:unauthorized') }));
        }
        if (user.isBlocked) {
            return res.status(403).json(({ message: req.t('errors:account_blocked') }));
        }
        const allowedRoles = new Set([roles_1.UserRole.ADMIN, ...roles]);
        if (!allowedRoles.has(user.role)) {
            return res.status(403).json({ message: req.t('errors:forbidden') });
        }
        return next();
    };
}
