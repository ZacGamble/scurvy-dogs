import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { lobbiesService } from "./LobbiesService.js";
import { shipsService } from "./ShipsService.js";

class EntriesService
{
    async getByAccount(accountId)
    {
        return await dbContext.Entries.find({ accountId }).populate('ship');
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
        const newEntry =  await dbContext.Entries.create(data);
        await newEntry.populate('ship')
        return newEntry
    }

    async removeByLobby(lobbyId)
    {
        const removed = await dbContext.Entries.find({ lobbyId });
        removed.forEach(entry => entry.remove());
    }
    async getByLobby(data) {
        return await dbContext.Entries.findOne({accountId : data.accountId, lobbyId : data.lobbyId}).populate('ship')
    }
}

export const entriesService = new EntriesService();