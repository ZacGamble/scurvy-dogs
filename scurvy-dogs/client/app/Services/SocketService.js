import { ProxyState } from '../AppState.js'
import { SocketHandler } from '../utils/SocketHandler.js'
class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('IS_TESTED', this.onTested)
      .on('IS_AUTHED', this.onIsAuthed)
  }

  onTested(payload) {
    ProxyState.socketData = [...ProxyState.socketData, payload]
  }

  onIsAuthed(payload) {
    ProxyState.socketData = [...ProxyState.socketData, payload]
  }
}

export const socketService = new SocketService()
