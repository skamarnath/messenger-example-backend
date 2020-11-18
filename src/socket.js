import { socketPassportVerify } from './passport/jwt';
import models from './models';

export default function (io) {
  io.use(socketPassportVerify).on('connection', (socket) => {
    const user = socket.handshake.user;
    if (user) {
      socket.join(user.id);

      socket.on('addMessage', async ({ to, message }) => {
        await models.Message.create({
          fromId: user.id,
          toId: to,
          message
        });
        socket.to(to).emit('receiveMessage', { from: user.id, message });
      });
    }
  });
}
