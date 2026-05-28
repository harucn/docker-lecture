const http = require("http");

// 🐛 バグあり: 127.0.0.1 でリッスンしているためコンテナ外から届かない
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from scenario-02!\n");
});

server.listen(8080, "127.0.0.1", () => {
  console.log("Server running on 127.0.0.1:8080");
});
