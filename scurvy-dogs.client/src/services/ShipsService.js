import { logger } from "../utils/Logger"

class ShipsService {
   async createShip(){
    const res = api.post('account/ship')
    logger.log(res.data)
    }
}

export const shipsService = new ShipsService()