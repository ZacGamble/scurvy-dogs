import { ProxyState } from '../AppState.js'
import { socketService } from '../Services/SocketService.js'
import { logger } from '../Utils/Logger.js'

function _drawSocketData() {
  logger.log('draw socket data', ProxyState.socketData)
}

export class SocketTestController {
  constructor() {
    ProxyState.on('socketData', _drawSocketData)
  }

  testSocket() {
    socketService.emit('SOCKET_TEST', { name: 'SOCKET_TEST', id: ~~(Math.random() * 99999) })
  }

  testAuthSocket() {
    socketService.emit('AUTH_TEST', { name: 'AUTH_TEST', id: ~~(Math.random() * 99999) })
  }
}
