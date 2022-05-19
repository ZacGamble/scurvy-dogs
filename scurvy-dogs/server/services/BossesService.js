import { dbContext } from "../db/DbContext.js";
import { socketProvider } from "../SocketProvider.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { historiesService } from "./HistoriesService.js";
import { lobbiesService } from "./LobbiesService.js";
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
           await historiesService.addDamageTaken({accountId: ship.accountId, shipId: ship.id, lobbyId}, bossPower);
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
        edited.durability = typeof update.durability === "number" ? update.durability : edited.durability;
        if(edited.durability <= 0){
            edited.isDefeated = true
            socketProvider.messageRoom(edited.lobbyId.toString(), "bossdead", {});
            await lobbiesService.remove(edited.lobbyId)
        }
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