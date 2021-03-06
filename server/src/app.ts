import { Express } from 'express';
import * as express from 'express';
import * as path from 'path';
import * as serveStatic from 'serve-static';
import * as WebSocket from 'ws';
import * as http from 'http';
import { Uno } from './uno/uno';

class App {
    private _express: Express;

    public get express(): Express {
        return this._express;
    }

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
            // create a player
            const player = {
                socket,
                score: 0,
                hand: []
            };
            const game = new Uno([player]);
        });
    }

    private startWebSocket(ws): void {
        ws.on('message', (message: string) => {
            //log the received message and send it back to the client
            console.log('received: %s', message);
            ws.send(`Hello, you sent -> ${message}`);
        });
    }

    // Configure Express middleware.
    private middleware(): void {
    }
  
    // Configure API endpoints.
    private routes(): void {
        /* This is just to get up and running, and to make sure what we've got is
        * working so far. This function will change when we start to add more
        * API endpoints */
        let router = express.Router();
        // placeholder route handler
        this._express.use(serveStatic(path.join(__dirname, 'public'), { 'index': ['index.html'] }))

        router.get('/api', (req, res, next) => {
            console.log(req);
        });
    }
}

export default App;