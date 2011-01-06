(function() {
  var HOST, PORT, SITE_ROOT, express, fs, jqtpl, path, server, sys, url;
  sys = require("sys");
  url = require("url");
  path = require("path");
  fs = require("fs");
  require.paths.push('/usr/local/lib/node');
  express = require('express');
  jqtpl = require('jqtpl');
  HOST = "localhost";
  PORT = "8080";
  SITE_ROOT = process.cwd() + '/';
  server = express.createServer();
  server.configure('development', function() {
    server.use(express.logger());
    server.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
    return server.use(express.bodyDecoder());
  });
  server.set('views', __dirname);
  server.set('view engine', 'html');
  server.register('.html', jqtpl);
  server.set('view options', {
    'layout': false
  });
  server.get('/', function(req, res) {
    return res.render('prelaunch.html');
  });
  server.post('/', function(req, res) {
    console.log(req.body);
    return res.send();
  });
  server.listen(PORT, HOST);
  sys.puts("Server running at " + HOST + ":" + PORT);
}).call(this);
