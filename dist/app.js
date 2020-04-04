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
        const wss = new WebSocket.Server({ server: this._express });
        const server = http.createServer(App);
        // start our server
        server.listen(process.env.PORT || 8999, () => {
            console.log(`Server started on port ${server.address().port} :)`);
        });
        wss.on('connection', (ws) => {
            //connection is up, let's add a simple simple event
            ws.on('message', (message) => {
                //log the received message and send it back to the client
                console.log('received: %s', message);
                ws.send(`Hello, you sent -> ${message}`);
            });
            //send immediatly a feedback to the incoming connection    
            ws.send('Hi there, I am a WebSocket server');
        });
    }
    get express() {
        return this._express;
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
        // router.get('/', (req, res, next) => {
        //     res.sendFile(path.join(__dirname, 'index.html'))
        // });
        // this._express.use('/', router);
        // this._express.use(express.static('css'));
        // this._express.use(express.static('assets'));
    }
}
exports.default = new App().express;
