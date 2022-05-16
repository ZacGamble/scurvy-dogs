import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ShipsService {
   async createShip(){
    const res = await api.post('account/ship')
    AppState.ships.push(res.data)
    logger.log(res.data)
    }

    async getShipsByEntry(id){
        const res = await api.get('api/lobby/' + id + '/ships')
        AppState.lobbyShips = res.data
        logger.log('ships service > get Ships By Entry > ', res.data)
    }
    async getUserShips(){
        const res = await api.get('account/ships')
        AppState.userShips = res.data
        logger.log("Ships service > getUserShips > ", res.data)
    }
}

export const shipsService = new ShipsService()