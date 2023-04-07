const http = require("http");

const hostname = "localhost";
const port = 5000;

const server = http.createServer((req, res) => {
  const requestPath = req.url;
  console.log(`Request for ${requestPath} by method ${req.method}`);

  if (req.method === "GET") {
    if (requestPath === "/") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(
        `<html><body><h1>Home Page.</h1></body></html>`
      );
    } else if (requestPath === "/about") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(
        `<html><body><h1>About Page.</h1></body></html>`
      );
    } else if (requestPath === "/contact") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(
        `<html><body><h1>Contact Page.</h1></body></html>`
      );
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end(
        `<html><body><h1>Error 404: ${requestPath} not found</h1></body></html>`
      );
    }

  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(
      `<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`
    );
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
