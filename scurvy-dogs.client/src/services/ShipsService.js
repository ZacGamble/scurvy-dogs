import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ShipsService {
   async createShip(){
    const res = api.post('account/ship')
    AppState.ships.push(res.data)
    logger.log(res.data)
    }

    async getShipsByEntry(id){
        const res = api.get('/:id/ships')
    }
    async getUserShips(){
        const res = api.get('account/ships')
        AppState.userShips = res.data
        logger.log("Ships service > getUserShips > ",res.data)
    }
}

export const shipsService = new ShipsService()