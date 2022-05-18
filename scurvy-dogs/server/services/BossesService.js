import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { shipsService } from "./ShipsService.js";

class BossesService
{
   async attack(lobbyId) {
        //REVIEW move this to sockets
       const foundShips = await shipsService.getByLobby(lobbyId)
       const bossPower = (await this.getByLobbyId(lobbyId)).power
       for (let i = 0; i < foundShips.length; i++) {
            const ship = foundShips[i]
           ship.durability -= bossPower
           await ship.save()                      
       }
    //    foundShips.forEach(async(s) => {s.durability -= bossPower
    //    return await s._doc.save()})
    }
    async getByLobbyId(lobbyId)
    {
        return await dbContext.Bosses.findOne({ lobbyId });
    }

    async edit(update)
    {
        const edited = await dbContext.Bosses.findById(update.id)
        if(!edited)
        {
            throw new BadRequest("Could not find a boss with that id.");
        }
        // if(edited.creatorId.toString !== update.creatorId)
        // {
        //     throw new Forbidden("You do not have permission to edit this boss.");
        // }
        edited.health = update.health || edited.health;
        await edited.save()
        return edited;
    }

    async remove(id, userId)
    {
        const removed = await dbContext.Bosses.findById(id);
        if(!removed)
        {
            throw new BadRequest("Could not find a boss with that id.");
        }
        if(removed.creatorId.toString() !== userId)
        {
            throw new Forbidden("You do not have permission to defeat this boss.");
        }

        removed.isDefeated = true;
        await removed.save();
        return removed;
    }
}

export const bossesService = new BossesService();