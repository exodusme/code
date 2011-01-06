(function() {
  var HOST, PORT, SITE_ROOT, express, fs, path, server, sys, url;
  sys = require("sys");
  url = require("url");
  path = require("path");
  fs = require("fs");
  require.paths.push('/usr/local/lib/node');
  express = require('express');
  HOST = "localhost";
  PORT = "8080";
  SITE_ROOT = process.cwd() + '/';
  server = express.createServer();
  server.configure('development', function() {
    server.use(express.logger());
    return server.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });
  server.get('/', function(req, res) {
    var filename;
    filename = SITE_ROOT + 'prelaunch.html';
    return fs.readFile(filename, "binary", function(err, file) {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain"
        });
        res.write("500 Internal Server Error\n");
        res.write(err + "\n");
        res.end();
        return;
      }
      res.writeHead(200);
      res.write(file, 'binary');
      return res.end();
    });
  });
  server.listen(PORT, HOST);
  sys.puts("Server running at " + HOST + ":" + PORT);
}).call(this);
