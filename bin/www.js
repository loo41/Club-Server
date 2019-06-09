const http = require('http');
const app = require('../app');

const onError = (e) => {
  console.log(e)
  console.log('--------------> error <-----------------')
  console.log('----------------------------------------')
  console.log('--------------> error <-----------------')
}

const server = http.createServer(app.callback());
// chat(server)
server.listen(3000);

console.log('start listening  http://localhost:3000');

server.on('error', onError);

server.on('close', () => console.log('stop listening'));

module.exports = server