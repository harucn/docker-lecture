const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Hello from backend!" }) + "\n");
});

server.listen(4000, "0.0.0.0", () => {
  console.log("Backend running on port 4000");
});
