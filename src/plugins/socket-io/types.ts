import { PayloadRequest } from "payload/dist/express/types"
import { IncomingMessage } from "http"
import session from "express-session"
import { Socket, Server } from "socket.io"

export interface CustomSocketRequest extends IncomingMessage {
    session: CustomSession;
    sessionID?: string
}

export interface CustomSession extends session.Session {
    socketID?: string;
    save(): void
}

export interface CustomSocket extends Socket {
    request: CustomSocketRequest
    sessionID?: string
}

export interface CustomPayloadRequest extends PayloadRequest {
    session: CustomSession;
}

export type SocketAccessReturnObject = {
    public?: any | boolean
    self?: any | boolean
    [key: string]: any | boolean | undefined;
}

export type SocketAccessReturnMethod = ((args?:any, req?: any, result?:any) => SocketAccessReturnObject | boolean)

export interface SocketAccess {
    create?: SocketAccessReturnObject | SocketAccessReturnMethod | Promise<SocketAccessReturnMethod>
    find?: SocketAccessReturnObject | SocketAccessReturnMethod | Promise<SocketAccessReturnMethod>
    findByID?: SocketAccessReturnObject | SocketAccessReturnMethod | Promise<SocketAccessReturnMethod>
    update?: SocketAccessReturnObject | SocketAccessReturnMethod | Promise<SocketAccessReturnMethod>
    updateByID?: SocketAccessReturnObject | SocketAccessReturnMethod | Promise<SocketAccessReturnMethod>
    delete?: SocketAccessReturnObject | SocketAccessReturnMethod | Promise<SocketAccessReturnMethod>
    deleteByID?: SocketAccessReturnObject | SocketAccessReturnMethod | Promise<SocketAccessReturnMethod>
    login?: SocketAccessReturnObject | SocketAccessReturnMethod | Promise<SocketAccessReturnMethod>
    refresh?: SocketAccessReturnObject | SocketAccessReturnMethod | Promise<SocketAccessReturnMethod>
    forgotPassword?: SocketAccessReturnObject | SocketAccessReturnMethod | Promise<SocketAccessReturnMethod>
}

export interface OptionsPluginSocketIO {
    /**
     * Enable or disable plugin
     * @default false
     */
    enabled?: boolean,
    dev?: boolean,
    onConnect?: Array<(socket: Socket, io?: Server) => void>,
}

