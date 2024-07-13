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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const routes_1 = require("./app/routes");
const axios_1 = __importDefault(require("axios"));
const server_1 = require("./server");
//root Application----
const app = (0, express_1.default)();
//middleware
app.use([
    express_1.default.json(),
    express_1.default.urlencoded({ extended: true }),
    (0, cookie_parser_1.default)(),
]);
app.use((0, cors_1.default)());
// app.use(express.urlencoded({ extended: true }))
// application route
app.use('/api/v1', routes_1.RootRoutes);
// Social Media route
// app.use('/api/v1/bloodMedia', BloodMediaRoutes)
// test route
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'server is run.......' });
});
// Global Error Handler
app.use(globalErrorHandler_1.default);
//* test caching
app.get('/test-caching', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //* get data to redis server
        const cachingData = yield server_1.client.get('post');
        //* if data have
        if (cachingData) {
            res.status(200).json({
                success: true,
                message: 'data get for redis server caching',
                data: JSON.parse(cachingData),
            });
        }
        //  get data to json pleace holder server
        const result = yield axios_1.default.get('https://jsonplaceholder.typicode.com/photos');
        //* set to redis
        yield server_1.client.set('post', JSON.stringify(result.data), { EX: 60 });
        // await client.del('post')
        //* retune user
        res.status(200).json({
            success: true,
            message: 'data get for json json placeholder server',
            data: result.data,
        });
    }
    catch (err) {
        next(err);
    }
}));
// handle not found route
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Not Found',
        errorMessages: [{ path: req.originalUrl, message: 'API Not Found' }],
    });
    next();
});
exports.default = app;
