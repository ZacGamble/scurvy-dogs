import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { historiesService } from "./HistoriesService.js";
import { lobbiesService } from "./LobbiesService.js";
import { shipsService } from "./ShipsService.js";

class EntriesService
{
   async getByUserAndLobby(lobbyId, accountId) {
    return await dbContext.Entries.findOne({ accountId, lobbyId }).populate('ship')
    }
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
        await historiesService.create(data.accountId, data.shipId, data.lobbyId);
        await newEntry.populate('ship')
        return newEntry
    }

    async removeByLobby(lobbyId)
    {
        const removed = await dbContext.Entries.find({ lobbyId });
        removed.forEach(entry => entry.remove());
    }
    async getByLobby(lobbyId) {
        return await dbContext.Entries.find({ lobbyId }).populate('ship')
    }
}

export const entriesService = new EntriesService();