const http = require("http");

const BACKEND_URL = "http://localhost:4000";

const server = http.createServer((req, res) => {
  http.get(BACKEND_URL, (backendRes) => {
    let data = "";
    backendRes.on("data", (chunk) => { data += chunk; });
    backendRes.on("end", () => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Frontend received: ${data}\n`);
    });
  }).on("error", (e) => {
    res.writeHead(503, { "Content-Type": "text/plain" });
    res.end(`Failed to reach backend: ${e.message || e.code}\n`);
  });
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Frontend running on port 3000");
});
