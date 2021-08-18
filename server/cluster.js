var http = require('http');
var httpProxy = require('http-proxy');
const isReachable = require('is-reachable');
var countLoop = 0;
var host = {
  host: 'localhost',
  port: 3005
};

var addresses = [{
    host: 'localhost',
    port: 3000
  },{
    host: 'localhost',
    port: 3001
  },
];

var hostMain = new httpProxy.createProxyServer({
  target: host
});

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
    countLoop = 0;
    console.log(proxy.options.target.host + ':' + proxy.options.target.port + ' work');
    proxy.web(req, res);
    proxy.on('error', function (e) {
      console.log(e);
    });
  } else {
    if(countLoop === 5){
      console.log("Server Disconnect");
      countLoop = 0;
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('Server Disconnect!');
      res.end();
    }else{
      countLoop++;
      hostMain.web(req, res);
      hostMain.on('error', function (e) {
        console.log(e);
      });
      console.log(proxy.options.target.host + ':' + proxy.options.target.port + ' ofline');
    }
   
  }
 
  proxyServers.push(proxy);
});

server.listen(host.port, function () {
  console.log('Node-cluster listening on port %s', host.port);
});