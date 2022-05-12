import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { lobbiesService } from "./LobbiesService.js";
import { shipsService } from "./ShipsService.js";

class EntriesService
{
    async getByAccount(accountId)
    {
        return await dbContext.Entries.find({ accountId });
    }

    async create(data)
    {
        const userShip = await shipsService.getById(data.shipId);
        if(userShip.accountId.toString() !== data.accountId)
        {
            throw new Forbidden("You do not own that ship.");
        }
        if((await lobbiesService.getById(data.lobbyId)).isFinished)
        {
            throw new BadRequest("That lobby is already over.");
        }
        return await dbContext.Entries.create(data);
    }

    async removeByLobby(lobbyId)
    {
        const removed = await dbContext.Entries.find({ lobbyId });
        removed.forEach(entry => entry.remove());
    }
}

export const entriesService = new EntriesService();