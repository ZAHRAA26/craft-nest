"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupI18n = setupI18n;
const i18next_1 = __importDefault(require("i18next"));
const i18next_fs_backend_1 = __importDefault(require("i18next-fs-backend"));
const i18next_http_middleware_1 = require("i18next-http-middleware");
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("../utils/logger"));
const config_1 = require("../config");
function setupI18n(app) {
    i18next_1.default
        .use(i18next_fs_backend_1.default)
        .use(i18next_http_middleware_1.LanguageDetector)
        .init({
        fallbackLng: 'ar',
        supportedLngs: ['ar', 'en'],
        preload: ['ar', 'en'],
        ns: ['common', 'auth', 'admin', 'errors'],
        defaultNS: 'common',
        backend: {
            loadPath: path_1.default.join(process.cwd(), 'locales/{{lng}}/{{ns}}.json')
        },
        detection: {
            order: ['header', 'querystring', 'cookie'],
            caches: false
        },
        interpolation: {
            escapeValue: false
        }
    });
    app.use((0, i18next_http_middleware_1.handle)(i18next_1.default));
    app.use((req, _res, next) => {
        if (config_1.config.env !== 'production') {
            logger_1.default.debug(`Detected Language: ${req.language} | Header: ${req.headers['accept-language']}`);
        }
        next();
    });
}
