"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
exports.generateEmailVerificationToken = generateEmailVerificationToken;
exports.generatePasswordResetToken = generatePasswordResetToken;
exports.verifyJwt = verifyJwt;
exports.compareJti = compareJti;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const crypto_1 = require("crypto");
const bcrypt_1 = __importDefault(require("bcrypt"));
function generateAccessToken(userId, email) {
    return jsonwebtoken_1.default.sign({ sub: userId, email }, config_1.config.jwtSecret, { expiresIn: '15m' });
}
async function generateRefreshToken(userId) {
    const jti = (0, crypto_1.randomBytes)(16).toString('hex');
    const token = jsonwebtoken_1.default.sign({ sub: userId, jti, type: 'refresh' }, config_1.config.jwtSecret, { expiresIn: '30d' });
    const jtiHash = await bcrypt_1.default.hash(jti, config_1.config.saltRounds);
    return { token, jti, jtiHash };
}
function generateEmailVerificationToken(userId) {
    return jsonwebtoken_1.default.sign({ sub: userId, action: 'verify' }, config_1.config.jwtSecret, { expiresIn: '1d' });
}
function generatePasswordResetToken(userId) {
    return jsonwebtoken_1.default.sign({ sub: userId, action: 'reset' }, config_1.config.jwtSecret, { expiresIn: '1h' });
}
function verifyJwt(token) {
    return jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
}
async function compareJti(jti, jtiHash) {
    return bcrypt_1.default.compare(jti, jtiHash);
}
