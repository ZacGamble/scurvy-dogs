import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class EntriesService
{
    async create(data){
        const res = await api.post('api/entries', data)
        logger.log('entries service > create > ', res.data)
        AppState.activeEntry = res.data
    }
    async getByLobby(lobbyId) {
       const res =  await api.get('api/entries/' + lobbyId)
       AppState.activeEntry = res.data
    }
}

export const entriesService = new EntriesService();