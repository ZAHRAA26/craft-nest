"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const roles_1 = require("../constants/roles");
class UserService {
    async create(data) {
        const user = await user_1.UserModel.create({
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role || roles_1.UserRole.BUYER,
            craftSpecialty: data.craftSpecialty || [],
            bio: data.bio || {}
        });
        return user;
    }
    async findByEmail(email) {
        return user_1.UserModel.findOne({ email: email.toLowerCase() }).exec();
    }
    async findByEmailWithPassword(email) {
        return user_1.UserModel.findOne({ email: email.toLowerCase() }).select('+password').exec();
    }
    async findById(id) {
        return user_1.UserModel.findById(id).exec();
    }
    async all() {
        return user_1.UserModel.find().exec();
    }
    async addRefreshToken(userId, jtiHash) {
        return user_1.UserModel.findByIdAndUpdate(userId, { $push: { refreshTokens: { jtiHash } } }).exec();
    }
    async verifyRefreshToken(userId, jti) {
        const user = await user_1.UserModel.findById(userId).exec();
        if (!user)
            return false;
        for (const refreshToken of user.refreshTokens) {
            if (await bcrypt_1.default.compare(jti, refreshToken.jtiHash)) {
                return true;
            }
        }
        return false;
    }
    async removeRefreshToken(userId, jti) {
        const user = await user_1.UserModel.findById(userId).exec();
        if (!user)
            return;
        const remaining = [];
        for (const refreshToken of user.refreshTokens) {
            if (!(await bcrypt_1.default.compare(jti, refreshToken.jtiHash))) {
                remaining.push(refreshToken);
            }
        }
        user.refreshTokens = remaining;
        await user.save();
    }
    async revokeAllRefreshTokens(userId) {
        return user_1.UserModel.findByIdAndUpdate(userId, { $set: { refreshTokens: [] } }).exec();
    }
}
exports.userService = new UserService();
