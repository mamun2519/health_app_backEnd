"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env_config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.env_config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    saltRounds: process.env.SALT_ROUND,
    jwt: {
        secret_token: process.env.SECRET_TOKEN,
        expire_in: process.env.SECRET_EXPIRE_IN,
        refresh_token: process.env.REFRESH_TOKEN,
        refresh_expire_in: process.env.REFRESH_EXPIRE_IN,
    },
    myEmail: process.env.MyEmail,
    emailPassword: process.env.emailPassword,
    gmailHost: process.env.host,
};
