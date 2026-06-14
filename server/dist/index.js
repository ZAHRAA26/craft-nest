"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = require("./db");
const logger_1 = __importStar(require("./utils/logger"));
const config_1 = require("./config");
(0, logger_1.setupProductionSecurity)();
const app = (0, app_1.createServer)();
// الاتصال بقاعدة البيانات ثم بدء الخادم
(0, db_1.connectDB)()
    .then(() => {
    app.listen(config_1.config.port, () => {
        logger_1.default.info(`Server is running on ${config_1.config.urls.server}`);
        logger_1.default.info(`Swagger docs available at ${config_1.config.urls.server}/api/docs`);
        logger_1.default.info(`Environment: ${config_1.config.env}`);
    });
})
    .catch((err) => {
    logger_1.default.error('Failed to connect to the database', err);
    process.exit(1);
});
