// server.js
const next = require("next");
const express = require("express");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // optional: parse JSON bodies for your API (helpful if you POST from client)
  server.use(express.json({ limit: "10mb" }));

  // Forward every request to Next's request handler.
  // Using server.use avoids path-to-regexp parsing of '*' that triggered your error.
  server.use((req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) {
      console.error("Error starting server:", err);
      process.exit(1);
    }
    console.log(`> Ready on http://localhost:${port} (dev=${dev})`);
  });
}).catch((err) => {
  console.error("Error preparing Next app:", err);
  process.exit(1);
});
