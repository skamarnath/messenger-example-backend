export default function (io) {
  io.on('connection', (socket) => {
    console.log('socket connected');
  });
}
