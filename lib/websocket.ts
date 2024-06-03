import type { ServerWebSocket, WebSocketHandler } from "bun";

export type MessageHandler<DataType> = (
    ws: ServerWebSocket<DataType>,
    message: string | Buffer
) => void | Promise<void>;

export type OpenHandler<DataType> = (
    ws: ServerWebSocket<DataType>
) => void | Promise<void>;

export type DrainHandler<DataType> = (
    ws: ServerWebSocket<DataType>
) => void | Promise<void>;

export type CloseHandler<DataType> = (
    ws: ServerWebSocket<DataType>,
    code: number,
    reason: string
) => void | Promise<void>;