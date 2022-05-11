import { Server } from 'socket.io'
import { logger } from './utils/Logger'
import { attachHandlers } from '../Setup'

const SOCKET_EVENTS = {
  connection: 'connection',
  connected: 'connected',
  disconnect: 'disconnect',
  userConnected: 'userConnected',
  userDisconnected: 'userDisconnected',
  error: 'error'
}

class SocketProvider {
  /**
   * @type {Server}
   */
  io = null
  initialize(httpServer) {
    try {
      this.io = new Server(httpServer, {
        cors: {
          origin: process.env.NODE_ENV === 'dev' ? '*' : ''
        }
      })
      this.io.on(SOCKET_EVENTS.connection, (socket) => this.onConnect(socket))
    } catch (e) {
      logger.error('[SOCKETSTORE ERROR]', e)
    }
  }

  onConnect(socket) {
    attachHandlers(this.io, socket)
    socket.emit(SOCKET_EVENTS.connected, {
      socket: socket.id,
      message: 'Successfully Connected'
    })
  }

  /**
   * Sends a direct message to a user
   * @param {string} userId
   * @param {string} eventName
   * @param {any} payload
   */
  messageUser(userId, eventName, payload) {
    try {
      this.io.to(userId).emit(eventName, payload)
    } catch (e) {
      logger.error('[SOCKET_ERROR] messageUser', e, { userId, eventName, payload })
    }
  }

  /**
   * Sends a message to all sockets in a room
   * @param {string} room
   * @param {string} eventName
   * @param {any} payload
   */
  messageRoom(room, eventName, payload) {
    this.io.to(room).emit(eventName, payload)
  }

  /**
   * Sends a message to all connected sockets
   * @param {string} eventName
   * @param {any} payload
   */
  message(eventName, payload) {
    this.io.emit(eventName, payload)
  }
}

export const socketProvider = new SocketProvider()
