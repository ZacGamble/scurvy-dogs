import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class LobbiesService
{
    async getAll()
    {
        return await dbContext.Lobbies.find({ isFinished: false });
    }

    async getById(id)
    {
        const found = await dbContext.Lobbies.findById(id)
        if(!found)
        {
            throw new BadRequest("Lobby with that id not found.");
        }
        return found;
    }

    async create(data)
    {
        return await dbContext.Lobbies.create(data);
    }

    async edit(update)
    {
        const edited = await this.getById(update.id);
        if(edited.creatorId.toString() !== update.creatorId)
        {
            throw new Forbidden("You do not have permission to edit this lobby.");
        }
        edited.isStarted = typeof update.isStarted === "boolean" ? update.isStarted : edited.isStarted;
        edited.save()
        return edited;
    }

    async remove(id, userId)
    {
        const removed = await this.getById(id);
        if(removed.creatorId.toString() != userId)
        {
            throw new Forbidden("You do not have permission to end this lobby.");
        }
        removed.isFinished = true;
        await removed.save();
        return removed;
    }
}

export const lobbiesService = new LobbiesService();