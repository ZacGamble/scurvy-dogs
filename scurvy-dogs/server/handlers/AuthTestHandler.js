import { SocketHandler } from '../utils/SocketHandler'

export class AuthTestHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor(io, socket) {
    super(io, socket, true)
    this
      .on('AUTH_TEST', this.testAuthEvent)
  }

  async testAuthEvent(payload) {
    this.socket.emit('IS_AUTHED', {
      user: this.user,
      profile: this.profile,
      payload
    })
  }
}
