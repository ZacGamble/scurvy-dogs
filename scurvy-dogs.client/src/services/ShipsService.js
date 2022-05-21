import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ShipsService {
   async createShip(body){
    const res = await api.post('account/ship', body)
       AppState.activeShip = res.data
       await api.put('account' ,AppState.account)
    logger.log(res.body)
    }

    async getShipsByEntry(id){
        const res = await api.get('api/lobby/' + id + '/ships')
        AppState.lobbyShips = res.data
        logger.log('ships service > get Ships By Entry > ', res.data)
    }
    async getUserShip(){
            const res = await api.get('account/ships')
        // AppState.activeShip = null
        logger.log("Ships service > getactiveShip > ", AppState.activeShip)
        if(res.data.isSunk == false){
            AppState.activeShip = res.data
        }
    }

    async upgradeStat(stat) {
        
        AppState.activeShip[stat] += 1
        return await api.put('api/ships/' + AppState.activeShip.id, AppState.activeShip)
    }
    async sinkShip(shipId){
        const res = await api.delete('api/ships/' + shipId)
        AppState.activeShip = {}
        logger.log("Ships Service > sinkShip >",res.data)
    }

}

export const shipsService = new ShipsService()