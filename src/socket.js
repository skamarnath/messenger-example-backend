import { socketPassportVerify } from './passport/jwt';

export default function (io) {
  io.use(socketPassportVerify).on('connection', (socket) => {
    const user = socket.handshake.user;
    if (user) {
      socket.join(user.nickname);
    }
  });
}
