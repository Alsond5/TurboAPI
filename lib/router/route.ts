import type { Handler, Middleware, RequestHandler, RequestMapper, RequestMethod, Route } from "../request";
import { TrieTree } from "../trie-tree";

export class Router implements RequestMethod {
    private readonly requestMap: RequestMapper = {} as RequestMapper;
    private middlewares: Middleware[] = []
    private errorHandlers: Handler[] = [];

    get(path: string, callback: Handler, ...middlewares: Middleware[]) {
        this.delegate(path, "GET", callback, middlewares);
    }
    post(path: string, callback: Handler, ...middlewares: Middleware[]) {
        this.delegate(path, "POST", callback, middlewares);
    }

    put(path: string, callback: Handler, ...middlewares: Middleware[]) {
        this.delegate(path, "PUT", callback, middlewares);
    }
    
    protected getTree(method: string) {
        const trieTree = this.requestMap[method.toUpperCase()];

        if (!trieTree) {
            throw new Error(`There is no path matches ${method}`);
        }

        return trieTree;
    }

    private delegate(path: string, method: string, callback: Handler, middlewares: Middleware[]) {
        let key = path;

        if (key === "/") {
            key = "";
        }
        
        this.submitToMap(method, path, callback, middlewares);
    }

    private submitToMap(method: string, path: string, callback: Handler, middlewares: Middleware[]) {
        let targetTree = this.requestMap[method];

        if (!targetTree) {
            targetTree = new TrieTree();
            this.requestMap[method] = targetTree;
        }

        const route: Route = {
            handler: callback,
            middlewareFuncs: middlewares
        }
        
        targetTree.insert(path, route);
    }
}