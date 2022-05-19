import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
    constructor() {
        super()
        this
        .on('error', this.onError)
        .on("joinlobby", this.addToLobby)
    }

    onError(e) {
        Pop.toast(e.message, 'error')
    }

    newEntry(entry)
    {
        this.emit("newentry", entry);
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
        logger.log("new entry join > ", event)
        AppState.ships.push(event)
    }
}

export const socketService = new SocketService()
