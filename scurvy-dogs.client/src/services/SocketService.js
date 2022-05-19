import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
    constructor() {
        super()
        this
        .on('error', this.onError)
        .on("joinlobby", this.addToLobby)
        .on("leavelobby", this.removeFromLobby)
    }

    onError(e) {
        Pop.toast(e.message, 'error')
    }

    joinLobby(entry)
    {
        this.emit("joinlobby", entry);
    }

    leaveLobby(entry)
    {
        this.emit("leavelobby", entry);
    }

    addToLobby(event)
    {
        logger.log("Socket join > ", event)
    }

    removeFromLobby(event)
    {
        logger.log("Socket leave > ", event)
    }
}

export const socketService = new SocketService()
