import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ShipsService {
   async createShip(body){
    const res = await api.post('account/ship', body)
    AppState.ships.push(res.body)
    logger.log(res.body)
    }

    async getShipsByEntry(id){
        const res = await api.get('api/lobby/' + id + '/ships')
        AppState.lobbyShips = res.data
        logger.log('ships service > get Ships By Entry > ', res.data)
    }
    async getUserShip(){
        const res = await api.get('account/ships')
        AppState.userShip = res.data
        logger.log("Ships service > getUserShips > ", res.data)
    }

    async upgradeStat(stat) {
        AppState.points -= 1
        AppState.userShip[stat] += 1
        return await api.put('api/ships/' + AppState.userShip.id, AppState.userShip)
    }

}

export const shipsService = new ShipsService()