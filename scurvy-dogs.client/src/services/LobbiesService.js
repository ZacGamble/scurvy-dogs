import { AppState } from"../AppState";
import { api } from "./AxiosService";


class LobbiesService {
 async create(){
     debugger
     const res = await api.post('api/lobby')
     AppState.currentLobby = res.data
     return res.data.id
 }
 async getAll() {
  const res = await api.get('api/lobby')
  AppState.lobbies = res.data
 }

 async getById(id) {
  const res = await api.getById('api/lobby/' + id)
  return AppState.currentLobby = res.data
 }
 
 async getShips(id) {
  const res = await api.get('api/lobby/' + id + '/ships')
  return AppState.ships = res.data
 }
 
 async getBoss() {
  const res = await api.get('api/lobby/' + id + '/boss')
  return AppState.boss = res.data
 }

}

export const lobbiesService = new LobbiesService()