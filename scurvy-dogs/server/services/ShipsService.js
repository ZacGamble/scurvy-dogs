import res from "express/lib/response";
import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class ShipsService
{
    async getByAccount(accountId)
    {
        return await dbContext.Ships.find({ accountId });
    }

    async getById(id)
    {
        const found = await dbContext.Ships.findById(id).populate("creator", "name picture");
        if(!found)
        {
            throw new BadRequest("Ship with that id not found.");
        }
        return found;
    }

    async getByLobby(lobbyId)
    {
        return await dbContext.Entries.find({ lobbyId }).populate("ship").populate("creator", "name picture");
    }

    async createShip(data)
    {
        data.durability = 100;
        data.power = 10;
        data.hull = 5;
        data.speed = 1;
        data.isSunk = false;
        return await dbContext.Ships.create(data);
    }

    async edit(update)
    {
        const edited = await this.getById(update.id);
        if(edited.accountId.toString() != update.accountId)
        {
            throw new Forbidden("You do not have permission to edit this ship.");
        }
        edited.name = update.name || edited.name;
        await edited.save();
        return edited;
    }

    async remove(id, userId)
    {
        const removed = await this.getById(id);
        if(removed.accountId.toString() != userId)
        {
            throw new Forbidden("You do not have permission to sink this ship.");
        }
        removed.isSunk = true;
        await removed.save();
        return removed;
    }
}

export const shipsService = new ShipsService();