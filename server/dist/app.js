"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = createServer;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const morgan_1 = __importDefault(require("morgan"));
const jwtStrategy_1 = require("./passport/jwtStrategy");
const routes_1 = require("./routes");
const swagger_1 = require("./swagger");
const i18n_1 = require("./middleware/i18n");
const errorHandler_1 = require("./middleware/errorHandler");
const rateLimiter_1 = require("./middleware/rateLimiter");
function createServer() {
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, morgan_1.default)('dev'));
    (0, i18n_1.setupI18n)(app);
    // تطبيق المحدِد العام على جميع المسارات
    app.use(rateLimiter_1.generalLimiter);
    passport_1.default.use(jwtStrategy_1.jwtStrategy);
    app.use(passport_1.default.initialize());
    (0, routes_1.registerRoutes)(app);
    (0, swagger_1.setupSwagger)(app);
    /**
     * @openapi
     * /health:
     *   get:
     *     tags:
     *       - System
     *     summary: Health Check
     *     description: Verifies that the API service is up and running.
     *     responses:
     *       '200':
     *         description: Service is healthy.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SuccessResponse'
     */
    app.get('/health', (req, res) => {
        // favicon.ico
        if (req.path === '/favicon.ico') {
            return res.status(204).end();
        }
        res.json({ success: true, message: req.t('common:health_check') });
    });
    app.use(errorHandler_1.errorHandler);
    return app;
}
