import { dbContext } from "../db/DbContext.js";

class ShipsService
{
    async getById(id)
    {
        return await dbContext.Ships.findById(id).populate("creator", "name picture");
    }
}

export const shipsService = new ShipsService();