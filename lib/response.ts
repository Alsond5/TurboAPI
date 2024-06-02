export class BunResponse {
    private response?: Response;
    private options: ResponseInit = {};

    statusCode(statusCode: number) {
        this.options.status = statusCode;

        return this;
    }

    statusText(statusText: string) {
        this.options.statusText = statusText;

        return this;
    }
    
    json(body: any): void {
        this.response = Response.json(body, this.options);
    }
    
    send(body: string): void {
        this.response = new Response(body, this.options);
    }

    redirect(url: string, status: number = 302): void {
        this.response = Response.redirect(url, status);
    }

    setHeader(key: string, value: any) {
        if (!key || !value) throw new Error("Headers key or value should not be empty");

        const headers = this.options.headers;
        
        if (!headers) {
            this.options.headers = { keys: value };
        }

        (this.options.headers as Record<string, any>)[key] = value;
        
        return this;
    }

    headers(header: HeadersInit): BunResponse {
        this.options.headers = header;

        return this;
    }
    
    getResponse() {
        return this.response;
    }
}