"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app_1.default);
const redis_1 = require("redis");
//* connect to redis for cashing
exports.client = (0, redis_1.createClient)({
    password: 'dxqQXmpYRA9nKjKI65ovxZpYD1p2fX9Y',
    socket: {
        host: 'redis-12744.c323.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 12744,
    },
});
//handle success message
exports.client.on('connect', () => {
    console.log('Connected to Redis');
});
// handle error message
exports.client.on('error', err => {
    console.log('Redis error: ', err);
});
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        // const server: Server = app.listen(env_config.port, () =>
        //   console.log(`server running on post ${env_config.port}`),
        // )
        server.listen(config_1.env_config.port, () => console.log(`server running on post ${config_1.env_config.port}`));
        //* connect to redis server
        yield exports.client.connect();
        const existHandler = () => {
            if (server) {
                server.close(() => {
                    console.log('Server Closed');
                });
                process.exit(1);
            }
        };
        const unexpectedErrorHandler = (error) => {
            console.log(error);
            existHandler();
        };
        process.on('uncaughtException', unexpectedErrorHandler);
        process.on('unhandledRejection', unexpectedErrorHandler);
        // process.on('SIGTERM', () => {
        //   console.log('SIGTERM received')
        //   if (server) {
        //     server.close()
        //   }
        // })
    });
}
bootstrap();
