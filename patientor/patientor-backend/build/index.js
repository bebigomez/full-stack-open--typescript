"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// eslint-disable-next-line
const cors = require('cors');
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express_1.default.json());
const PORT = 3001;
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
