import { ReplaySubject } from 'rxjs';

export interface WSEvent<T> {
    type: string,
    data?: T;
}

function isMessageEvent(ev: Event): ev is MessageEvent {
    return ev.type === 'message' && ev instanceof MessageEvent && 'data' in ev;
}

export class WebSocketHelper<T> implements WebSocket {
    get binaryType(): BinaryType {
        return this.ws.binaryType;
    }
    get bufferedAmount(): number {
        return this.ws.bufferedAmount;
    }
    get extensions(): string {
        return this.ws.extensions;
    }
    get protocol(): string {
        return this.ws.protocol;
    }
    get readyState(): number {
        return this.ws.readyState;
    }
    get url(): string {
        return this.ws.url;
    }
    get CLOSED(): number {
        return this.ws.CLOSED;
    }
    get OPEN(): number {
        return this.ws.OPEN;
    }
    get CONNECTING(): number {
        return this.ws.CONNECTING;
    }
    get CLOSING(): number {
        return this.ws.CLOSING;
    }

    connection$: ReplaySubject<WSEvent<T>> = new ReplaySubject(1);

    private ws: WebSocket;

    constructor(url: string | WebSocket) {
        if (typeof url === 'string') {
            this.ws = new WebSocket(url);
            this.ws.onerror = this.onerror;
            this.ws.onclose = this.onclose;
            this.ws.onmessage = this.onmessage;
            this.ws.onopen = this.onopen;
        } else {
            this.ws = url;
        }
    }

    close(code?: number, reason?: string): void {
        this.ws.close(code, reason);
    }

    send(data: string | Blob | ArrayBuffer): void {
        this.ws.send(data);
    }

    dispatchEvent(evt: Event): boolean {
        return this.ws.dispatchEvent(evt);
    }

    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    addEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void {
        this.ws.addEventListener(type, listener, options);
    }

    removeEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void {
        this.ws.addEventListener(type, listener, options);
    }

    onerror = (err: Event) => this.connection$.error(err);
    onmessage = (event: Event) => this.connection$.next(this.mapEvent(event));
    onopen = (event: Event) => this.connection$.next(this.mapEvent(event));
    onclose = (event: Event) => this.connection$.next(this.mapEvent(event));
    
    private mapEvent(ev: Event): WSEvent<T> {
        if (isMessageEvent(ev)) {
            return this.serializeMessage(ev);
        } else {
            return { type: ev.type };
        }
    }

    private serializeMessage = (ev: MessageEvent): WSEvent<T> => {
        let data;

        try {
            data = JSON.parse(ev.data);
        } catch {
            data = { message: ev.data }
        }

        return { type: ev.type, data };
    }
}