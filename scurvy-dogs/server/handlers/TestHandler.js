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
      .on("joinlobby", this.addToLobby)
      .on("leavelobby", this.removeFromLobby)
      .on("newentry", this.newEntry)
  }

  newEntry(payload)
  {
      socketProvider.messageRoom(payload.lobbyId, "joinlobby", payload);
      this.addToLobby(payload)
  }

  addToLobby(payload)
  {
      this.socket.join(payload.lobbyId);
  }

  removeFromLobby(payload)
  {
    this.socket.leave(payload.lobbyId);    
  }
}
