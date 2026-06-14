"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupProductionSecurity = setupProductionSecurity;
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../config");
const fs_1 = __importDefault(require("fs"));
/**
 * إعدادات المسجل الاحترافي (Winston)
 */
const logFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.default.format.errors({ stack: true }), winston_1.default.format.splat(), winston_1.default.format.json());
// التحقق من إمكانية الكتابة على نظام الملفات (مهم لـ Vercel)
const logsDir = 'logs';
let canWriteLogs = false;
try {
    if (!fs_1.default.existsSync(logsDir)) {
        fs_1.default.mkdirSync(logsDir, { recursive: true });
    }
    fs_1.default.accessSync(logsDir, fs_1.default.constants.W_OK);
    canWriteLogs = true;
}
catch (err) {
    console.warn('Warning: Cannot write to logs directory. Using console only.');
    canWriteLogs = false;
}
const transports = [];
// إضافة File transports فقط إذا كان الكتابة ممكنة
if (canWriteLogs) {
    transports.push(new winston_1.default.transports.File({
        filename: path_1.default.join(logsDir, 'error.log'),
        level: 'error',
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    }), new winston_1.default.transports.File({
        filename: path_1.default.join(logsDir, 'combined.log'),
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    }));
}
const logger = winston_1.default.createLogger({
    level: config_1.config.env === 'production' ? 'info' : 'debug',
    format: logFormat,
    defaultMeta: { service: 'crafts-backend' },
    transports: transports.length > 0 ? transports : [new winston_1.default.transports.Console()],
});
if (config_1.config.env !== 'production') {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
    }));
}
else {
    // في الإنتاج، أضف Console بدون لون
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple(),
    }));
}
function setupProductionSecurity() {
    if (config_1.config.env === 'production') {
        console.log = () => { };
        console.info = () => { };
        console.debug = () => { };
        console.error = (...args) => logger.error(args.join(' '));
        console.warn = (...args) => logger.warn(args.join(' '));
        logger.info('🛡️ Security mode enabled: Traditional Console blocked, logs redirected to Winston.');
    }
}
exports.default = logger;
