const http = require("http");

const port = process.env.APP_PORT;
if (!port) {
  console.error("Error: APP_PORT environment variable is required");
  process.exit(1);
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from scenario-01!\n");
});

server.listen(parseInt(port), "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
