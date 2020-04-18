const path = require('path');
const socketIo = require('socket.io');
const routes = require('./routes');
const socketApp = require('./socket/app');

const bootstrapApp = function(app, express)
{
  app.use('/libs', express.static(path.join(__dirname, 'node_modules/')));
  app.use('/assets', express.static(path.join(__dirname, 'public/')));
  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, 'views'));
}

const startServer = function(http, port)
{
  /* Start server */
  http.listen(port, () => {
    console.log('listening on *:3000');
  });
}

const initSocket = function(http)
{
  let io = socketIo(http);
  socketApp(io);
}

exports = module.exports = {
  bootstrapApp,
  setRoutes: routes,
  initSocket,
  startServer
}