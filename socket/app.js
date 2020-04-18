exports = module.exports = function(io)
{
  /* Connection Handler */
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });
}
