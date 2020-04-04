import App from './app';
import { AddressInfo } from 'ws';
import * as WebSocket from 'ws';
import * as http from 'http';

const server = http.createServer(App);


//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${(<AddressInfo>server.address()).port} :)`);
});