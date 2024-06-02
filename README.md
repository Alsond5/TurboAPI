# TurboAPI

Welcome to TurboAPI, a fast and efficient web framework, specifically designed for the Bun.js runtime. TurboAPI aims to provide a simple and intuitive API for building web applications and APIs, with an emphasis on performance and ease of use

## Features

* Basic syntax: Simple syntax and easy to use.
* High Performance: Optimized for the Bun.js runtime to ensure fast and efficient processing.
* Middleware Support: Easily extend your application with middleware functions [In development].
* Routing: Simple and flexible routing to handle HTTP requests.
* Extensible: Designed to be modular and easily extensible to fit your needs.
* Lightweight: Minimal dependencies to keep your applications lean and fast

## Usage

### To install dependencies:

```bash
bun install
```

### Example:

```typescript
import turboapi from "turboapi";

const app = turboapi();
const port = 8000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
```

### To run examples:

```bash
bun run examples/<example>/index.ts
```

## Contributing:
We welcome contributions from the community! Please read our contributing guidelines to get started. 

## License:
This project is licensed under the MIT License. See the LICENSE file for details.