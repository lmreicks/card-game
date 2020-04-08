"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const serveStatic = require("serve-static");
const WebSocket = require("ws");
const http = require("http");
class App {
    constructor() {
        this._express = express();
        this.middleware();
        this.routes();
        const server = http.createServer(this._express);
        const wss = new WebSocket.Server({ server });
        // start our server
        server.listen(process.env.PORT || 8999);
        wss.on('connection', (socket) => {
            this.startWebSocket(socket);
        });
    }
    get express() {
        return this._express;
    }
    startWebSocket(ws) {
        ws.on('message', (message) => {
            //log the received message and send it back to the client
            console.log('received: %s', message);
            ws.send(`Hello, you sent -> ${message}`);
        });
    }
    // Configure Express middleware.
    middleware() {
    }
    // Configure API endpoints.
    routes() {
        /* This is just to get up and running, and to make sure what we've got is
        * working so far. This function will change when we start to add more
        * API endpoints */
        let router = express.Router();
        // placeholder route handler
        this._express.use(serveStatic(path.join(__dirname, 'public'), { 'index': ['index.html'] }));
        router.get('/api', (req, res, next) => {
            console.log(req);
        });
    }
}
exports.default = App;
