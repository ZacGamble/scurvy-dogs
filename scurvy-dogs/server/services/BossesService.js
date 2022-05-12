import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class BossesService
{
    async edit(update)
    {
        const edited = await dbContext.Bossess.findById(update.id)
        if(!edited)
        {
            throw new BadRequest("Could not find a boss with that id.");
        }
        if(edited.creatorId.toString !== update.creatorId)
        {
            throw new Forbidden("You do not have permission to edit this boss.");
        }
        edited.health = update.health || edited.health;
        await edited.save()
        return edited;
    }
}

export const bossesService = new BossesService();