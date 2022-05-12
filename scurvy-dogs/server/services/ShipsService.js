import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class ShipsService
{
    async getById(id)
    {
        const found = await dbContext.Ships.findById(id).populate("creator", "name picture");
        if(!found)
        {
            throw new BadRequest("Ship with that id not found.");
        }
        return found;
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