var rpc = require('axon-rpc')
  , axon = require('axon')
  , rep = axon.socket('rep');

var server = new rpc.Server(rep);
server.expose('add', function(a, b, fn){
  fn(null, a + b);
});
rep.bind(4000);