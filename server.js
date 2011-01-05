(function() {
  var fs, host, http, path, port, server, sys, url;
  sys = require("sys");
  http = require("http");
  url = require("url");
  path = require("path");
  fs = require("fs");
  host = "localhost";
  port = "8080";
  server = http.createServer(function(request, response) {
    var filename, uri;
    uri = url.parse(request.url).pathname;
    filename = path.join(process.cwd(), uri);
    return path.exists(filename, function(exists) {
      if (!exists) {
        response.writeHead(404, {
          "Content-Type": "text/plain"
        });
        response.write("404 Not Found\n");
        response.write("" + path + " does not exist on this site.\n");
        response.end();
        return;
      }
      return fs.readFile(filename, "binary", function(err, file) {
        if (err) {
          response.writeHead(500, {
            "Content-Type": "text/plain"
          });
          response.write("500 Internal Server Error\n");
          response.write(err + "\n");
          response.end();
          return;
        }
        response.writeHead(200);
        response.write(file, "binary");
        return response.end();
      });
    });
  });
  server.listen(port, host);
  sys.puts("Server running at " + host + ":" + port);
}).call(this);
