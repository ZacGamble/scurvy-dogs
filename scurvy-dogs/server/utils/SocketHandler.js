export class SocketHandler {
  /**
   * @param {import('socket.io').Server} io
   * @param {import('socket.io').Socket} socket
   * @param {boolean | function():boolean} requiresAuth
   */
  constructor(io, socket, requiresAuth = false) {
    this.io = io
    this.socket = socket
    this.user = null
    this.profile = null
    if (requiresAuth === true) {
      requiresAuth = () => this.user
    }
    this.requiresAuth = requiresAuth
  }

  on(event, fn) {
    this.socket.on(event, (payload) => {
      try {
        if (!this.requiresAuth) {
          return fn.call(this, payload)
        }
        if (!this.requiresAuth()) {
          return this.socket.emit('error', { message: 'Unauthorized' })
        }
        return fn.call(this, payload)
      } catch (e) {
        this.socket.emit('error', { message: e.message })
      }
    })
    return this
  }

  attachUser(user, profile) {
    this.user = user
    this.profile = profile
  }
}
