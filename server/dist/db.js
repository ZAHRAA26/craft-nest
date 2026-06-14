"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const logger_1 = __importDefault(require("./utils/logger"));
async function connectDB() {
    const uri = config_1.config.mongo.uri;
    if (!uri) {
        const errorMsg = 'MONGO_URI environment variable is not set!';
        logger_1.default.error(errorMsg);
        throw new Error(errorMsg);
    }
    try {
        await mongoose_1.default.connect(uri, {
            dbName: 'crafts_platform',
            connectTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        logger_1.default.info('✅ Connected to MongoDB');
    }
    catch (error) {
        const errorMsg = `Failed to connect to MongoDB: ${error instanceof Error ? error.message : String(error)}`;
        logger_1.default.error(errorMsg);
        throw error;
    }
}
exports.default = mongoose_1.default;
