sys = require("sys")
http = require("http")
url = require("url")
path = require("path")
fs = require("fs")

host = "localhost"
port = "8080"

server = http.createServer (request, response) ->
  uri = url.parse(request.url).pathname
  filename = path.join process.cwd(), uri
  path.exists filename, (exists) ->
    if not exists
      response.writeHead 404, {"Content-Type": "text/plain"}
      response.write "404 Not Found\n"
      response.write "#{path} does not exist on this site.\n"
      response.end()
      return
    fs.readFile filename, "binary", (err, file) ->
      if err
        response.writeHead 500, {"Content-Type": "text/plain"}
        response.write "500 Internal Server Error\n"
        response.write err + "\n"
        response.end()
        return
      response.writeHead 200
      response.write file, "binary"
      response.end()

server.listen port, host
sys.puts "Server running at #{host}:#{port}"