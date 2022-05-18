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

    async addDamageDone(data, damage)
    {
        const history = await dbContext.Histories.findOne({accountId: data.accountId, shipId: data.id, lobbyId: data.lobbyId});
        history.damageDone += damage;
        await history.save();
    }
    
    async checkLargestDamage(data, damage)
    {
        const history = await dbContext.Histories.findOne({accountId: data.accountId, shipId: data.id, lobbyId: data.lobbyId});
        if(history.largestHit < damage)
        {
            history.largestHit = damage;
        }
        await history.save();
    }
    
    async addDamageTaken(data, damage)
    {
        const history = await dbContext.Histories.findOne({accountId: data.accountId, shipId: data.shipId, lobbyId: data.lobbyId});
        history.damageTaken += damage;
        await history.save();
    }
}

export const historiesService = new HistoriesService();