# Node standard libraries
sys = require "sys"
url = require "url"
path = require "path"
fs = require "fs"

# Third party
require.paths.push '/usr/local/lib/node'
express = require 'express'

# Globals
HOST = "localhost"
PORT = "8080"
SITE_ROOT = process.cwd() + '/'

server = express.createServer()

server.configure 'development', ->
  server.use express.logger()
  server.use express.errorHandler {
    dumpExceptions: true,
    showStack: true,}

server.get '/', (req, res) ->
  filename = SITE_ROOT + 'prelaunch.html'
  fs.readFile filename, "binary", (err, file) ->
    if err
      res.writeHead 500, {"Content-Type": "text/plain"}
      res.write "500 Internal Server Error\n"
      res.write err + "\n"
      res.end()
      return
    res.writeHead 200
    res.write file, 'binary'
    res.end()

server.listen PORT, HOST
sys.puts "Server running at #{HOST}:#{PORT}"