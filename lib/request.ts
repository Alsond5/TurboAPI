import type { BunResponse } from "./response";
import type { TrieTree } from "./trie-tree";

export class BunRequest extends Request {
    public params?: { [key: string]: any };
    public query?: { [key: string]: any };

    constructor(input: string | URL, init?: RequestInit) {
        super(input, init);
    }

    pathname(): string {
        const url = new URL(this.url);

        return (url.pathname.endsWith("/")) ? url.pathname.slice(0, url.pathname.length) : url.pathname;
    }

    getParam(key: string, _default?: any): any {
        if (typeof key !== "string") throw new Error("Key must be a string");
        if (!this.params) return _default ? _default : undefined;

        const value = this.params[key];
        
        return value;
    }
    
    setParams(routeParams: {[key in string]: any}): void {
        this.params = routeParams;
    }

    getQuery(key: string, _default?: any): any {
        if (typeof key !== "string") throw new Error("Key must be a string");
        if (!this.query) return _default ? _default : undefined;

        const value = this.query[key];
        return value;
    }
    
    setQuery(key: string, value: any): void {
        if (typeof key !== "string") throw new Error("Key must be a string");

        if (!this.query) {
            this.query = {}
        }
        
        this.query[key] = value;
    }
}

export type NextFunction = (
    err?: Error
) => void;

export type Handler = (
    req: BunRequest,
    res: BunResponse,
    next?: NextFunction,
    err?: Error
) => void | Promise<any>;

export type Middleware = (
    req: BunRequest,
    res: BunResponse,
    next: NextFunction,
    err?: Error
) => void;

export interface Route {
    handler: Handler;
    middlewareFuncs?: Middleware[];
}

export type RequestHandler = (
    path: string, handler: Handler, ...middlewares: Middleware[]
) => void;

export interface RequestMethod {
    get: RequestHandler,
    post: RequestHandler,
    put: RequestHandler
}

export interface RequestMapper {
    get: TrieTree<string, Route>;
    post: TrieTree<string, Route>;
    put: TrieTree<string, Route>;

    [key: string]: TrieTree<string, Route> | null | undefined;
}