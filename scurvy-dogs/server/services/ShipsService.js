import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class ShipsService
{
    async attack(actor, targetId) {
        const actorShip = await this.getById(actor.id)
        if(actorShip.accountId.toString() !== actor.creatorId){
            throw new Forbidden('Not your ship')
        }
        const targetShip = await dbContext.Bosses.findById(targetId)
        if(!targetShip){
            throw new BadRequest('Did you start your ocean yet?!')
        }
        targetShip.health -= actorShip.power
        await targetShip.save()
        return targetShip
        }
    async getByAccount(accountId)
    {
        return await dbContext.Ships.findOne({ accountId });
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
        const entries = await dbContext.Entries.find({ lobbyId }).populate("ship").populate("creator", "name picture");
        const ships = [] 
        await entries.forEach(async(e) => ships.push(await dbContext.Ships.findById(e.ship.id)))
        return ships
    }

    async createShip(data)
    {
        const accountShipCount = (await dbContext.Ships.find({ accountId: data.accountId })).length;
        if(accountShipCount >= 1)
        {
            throw new BadRequest("You already have a ship.");
        }
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
        edited.power = update.power || edited.power;
        edited.hull = update.hull || edited.hull;
        edited.speed = update.speed || edited.speed;
        
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