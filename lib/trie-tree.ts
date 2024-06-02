import type { Handler, Route } from "./request";

export class TrieTree<k extends string, v extends Route> {
    private readonly root: Node<k, v>;

    constructor() {
        this.root = new Node();
    }

    get(path: string): TrieLeaf<k, v> {
        const paths = path.split("/");
        const node: Node<k, v> = this.root;
        const params: { [key: string]: any } = {};

        const target = this.dig(node, paths, params);

        return {
            routeParams: params,
            node: (!target?.getHandler()) ? null : target,
        };
    }

    insert(path: string, value: v) {
        if (path === '*') {
            path = '/';
        }

        const paths = path.split("/");

        let node: Node<string, v> = this.root;
        let index = 0;
        
        while (index < paths.length) {
            const children = node.getChildren();
            const currentPath = paths[index];

            let target = children.find((e) => e.getPath() === currentPath);

            if (!target) {
                target = new Node<string, v>(currentPath);
                children.push(target);
            }

            node = target;
            ++index;
        }

        // insert handler to node
        node.insertChild(value);
    }

    private dig(
        node: Node<k, v>,
        paths: string[],
        params: { [key: string]: any }
    ): Node<k, v> | null {
        if (paths.length === 0) {
            return node;
        }

        const target = node
            .getChildren()
            .filter((e) => e.getPath() === paths[0] || e.getPath().includes(":"));

        if (target.length === 0) {
            return null;
        }

        let next: Node<k, v> | null = null; // Initialize next with null

        for (let i = 0; i < target.length; ++i) {
            const e = target[i];

            if (e.getPath().startsWith(":")) {
                const routeParams = e.getPath().replace(":", "");
                params[routeParams] = paths[0];
            }

            paths.shift();
            next = this.dig(e, paths, params);
        }

        return next;
    }
}

export interface TrieLeaf<k, v> {
    node: Node<k, v> | null;
    routeParams: { [key: string]: any };
}

// node of trie tree
class Node<k, v> {
    private readonly path?: string;
    private route: Route | null = null; // Initialize handlers with an empty function
    private readonly children: Node<k, v>[] = [];

    constructor(path?: string) {
        this.path = path;
    }

    insertChild(route: Route) {
        this.route = route;
    }

    getChildren(): Node<k, v>[] {
        return this.children;
    }

    getHandler(): Handler | null {
        if (!this.route) return null;

        return this.route.handler;
    }

    getPath(): string {
        return this.path || "";
    }
}