"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const auth_1 = __importDefault(require("./auth"));
const admin_1 = __importDefault(require("./admin"));
function registerRoutes(app) {
    app.use('/api/auth', auth_1.default);
    app.use('/api/admin', admin_1.default);
}
