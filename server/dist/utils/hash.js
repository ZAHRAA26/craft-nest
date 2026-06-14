"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
async function hashPassword(password) {
    const saltRounds = config_1.config.saltRounds;
    return bcrypt_1.default.hash(password + config_1.config.secretKey, saltRounds);
}
async function verifyPassword(password, hash) {
    return bcrypt_1.default.compare(password + config_1.config.secretKey, hash);
}
