var http = require('http');
var httpProxy = require('http-proxy');
const isReachable = require('is-reachable');
var port = 8085;
var addresses = [{
    host: 'localhost',
    port: 8082
  },
  {
    host: 'localhost',
    port: 8083
  }
];
//Create a set of proxy servers
var proxyServers = addresses.map(async function (target) {
  console.log('web server ' + target.host + ' on port %s', target.port);
  return new httpProxy.createProxyServer({
    target: target
  });
});

var server = http.createServer(async function (req, res) {

  var proxy = await proxyServers.shift();

  const checkHost = await isReachable(proxy.options.target.host + ':' + proxy.options.target.port);
  if (checkHost) {
    console.log(proxy.options.target.host + ':' + proxy.options.target.port + ' work');
    proxy.web(req, res);
    proxy.on('error', function (e) {
      console.log(e);
    });
  } else {
    console.log(proxy.options.target.host + ':' + proxy.options.target.port + ' ofline');
  }
  proxyServers.push(proxy);
});

server.listen(port, function () {
  console.log('Node-cluster listening on port %s', port);
});
