import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'
import { api } from './AxiosService.js'

class SocketService extends SocketHandler {
    constructor() {
        super()
        this
        .on('error', this.onError)
        .on("joinlobby", this.addToLobby)
        .on("bosshp", this.setBossHp)
        .on("bossdead", this.bossDead)
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

    setBossHp(hp)
    {
        logger.log(hp);
        AppState.boss.durability = hp;
    }

    async bossDead()
    {
        logger.log("boss has died");
        AppState.currentHistory = (await api.get("api/lobby/" + AppState.activeEntry.lobbyId + "/history")).data.find(h => h.accountId === AppState.activeEntry.accountId);
        logger.log("Socket service > bossDead >", AppState.currentHistory);
    }
}

export const socketService = new SocketService()
