import { socketProvider } from '../SocketProvider.js';
import { SocketHandler } from '../utils/SocketHandler'

export class TestHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor(io, socket) {
    super(io, socket)
    this
      .on('SOCKET_TEST', this.testEvent)
      .on("joinlobby", this.addToLobby)
      .on("leavelobby", this.removeFromLobby)
  }

  async testEvent(payload) {
    this.socket.emit('IS_TESTED', payload)
  }

  addToLobby(payload)
  {
      socketProvider.messageRoom(payload.lobbyId, "joinlobby", payload);
      this.socket.join(payload.lobbyId);
  }

  removeFromLobby(payload)
  {
    this.socket.leave(payload.lobbyId);
    socketProvider.messageRoom(payload.lobbyId, "leavelobby", payload);    
  }
}
