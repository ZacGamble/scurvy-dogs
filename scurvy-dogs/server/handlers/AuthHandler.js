import { Auth0Provider } from '@bcwdev/auth0provider'
import { attachHandlers } from '../../Setup'
import { accountService } from '../services/AccountService'
import { SocketHandler } from '../utils/SocketHandler'

export class AuthHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor(io, socket) {
    super(io, socket)
    this
      .on('authenticate', this.onAuthenticate)
      .on('disconnect', this.onDisconnect)
  }

  async onAuthenticate(bearerToken) {
    try {
      const user = await Auth0Provider.getUserInfoFromBearerToken(bearerToken)
      const profile = await accountService.getAccount(user)
      const limitedProfile = {
        id: profile.id,
        email: profile.email,
        picture: profile.picture
      }
      this.socket.join(user.id)
      attachHandlers(this.io, this.socket, user, limitedProfile)
      this.socket.emit('authenticated', limitedProfile)
      this.io.emit('userConnected', limitedProfile)
    } catch (e) {
      this.socket.emit('error', e)
    }
  }

  async onDisconnect() {
    this.io.emit('userDisconnected', this.profile)
  }
}
