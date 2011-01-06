# Node standard libraries
sys = require "sys"
url = require "url"
path = require "path"
fs = require "fs"

# Third party
require.paths.push '/usr/local/lib/node'
express = require 'express'
jqtpl = require 'jqtpl'

# Globals
HOST = "localhost"
PORT = "8080"
SITE_ROOT = process.cwd() + '/'

server = express.createServer()

# Configure the dev environment
# Add all middleware options here
server.configure 'development', ->
  server.use express.logger()
  server.use express.errorHandler {
    dumpExceptions: true,
    showStack: true,}
  server.use express.bodyDecoder()

server.set 'views', __dirname
server.set 'view engine', 'html'
server.register '.html', jqtpl
server.set 'view options', {'layout': false}

server.get '/', (req, res) ->
  res.render 'prelaunch.html'

server.post '/', (req, res) ->
  console.log req.body
  res.send()

server.listen PORT, HOST
sys.puts "Server running at #{HOST}:#{PORT}"