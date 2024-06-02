import { Router } from "./router/route";
import { BunRequest } from "./request";
import { BunResponse } from "./response";

import type { Server } from "bun";

export class TurboAPI extends Router {
    private static server?: TurboAPI;

    constructor() {
        super();

        if (TurboAPI.server) {
            throw new Error("Do not use this contructor!");
        }

        TurboAPI.server = this;
    }

    static get instance() {
        return TurboAPI.server ?? (TurboAPI.server = new TurboAPI());
    }

    listen(
        port: number | string,
        callback?: () => void
    ) {
        const server = this.bunServe(port);
        callback?.call(null);

        return server;
    }

    private bunServe(
        port: number | string
    ) {
        const server = Bun.serve({
            port: port,
            fetch: async (req, server) => {
                return this.handleRequest(req, server);
            }
        });

        return server;
    }

    private async handleRequest(request: Request, server: Server): Promise<Response> {
        const req = this.parseRequest(request);
        const res = new BunResponse();
        
        const trieTree = this.getTree(req.method);
        const treeLeaf = trieTree.get(req.pathname());

        if (!treeLeaf.node) {
            res.statusCode(404).send("Not found");
            
            const response = res.getResponse();

            return (response) ? response : new Response("Not found", { status: 404 });
        }

        req.setParams(treeLeaf.routeParams);
        
        const hnadler = treeLeaf.node.getHandler();
        const callback = hnadler?.apply(this, [req, res]);

        if (callback instanceof Promise) await callback;

        const response = res.getResponse();

        return response ? response : new Response("Internal server error", { status: 500 });
    }

    private parseRequest(request: Request) {
        const req = Object.setPrototypeOf(request, BunRequest.prototype) as BunRequest;
        const url = new URL(req.url);

        url.searchParams.forEach((value, key) => {
            req.setQuery(key, value);
        });
        
        return req;
    }
}