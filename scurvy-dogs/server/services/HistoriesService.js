import { dbContext } from "../db/DbContext.js";

class HistoriesService
{
    async create(accountId, shipId, lobbyId)
    {
        const data = { accountId, shipId, lobbyId, startTime: new Date()};
        await dbContext.Histories.create(data);
    }

    async getByShipId(shipId)
    {
        return await dbContext.Histories.find({ shipId });
    }

    async getByAccountId(accountId)
    {
        return await dbContext.Histories.find({ accountId });
    }

    async getBylobbyId(lobbyId)
    {
        return await dbContext.Histories.find({ lobbyId });
    }
}

export const historiesService = new HistoriesService();