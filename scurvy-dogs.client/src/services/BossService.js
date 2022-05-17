import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class BossService {

 async getBossById(id) {
  const res = await api.get('api/lobby/' + id + '/boss')
  AppState.boss = res.data[0]
  logger.log('boss Service > get Boss by Id!', AppState.boss)
 }

 async bossAttack(lobbyId){
     const res = await api.post('api/lobby/' + lobbyId + '/boss/attack')
 }

 async removeBoss(id) {
  const res = await api.delete('api/boss/' + id)
  logger.log('get Boss by Id!', res.data)
  return
 }

 async defeatBoss() {
  const boss = AppState.boss
  boss.isDefeated == false
  AppState.boss= [... AppState.boss, boss]
 }

}

export const bossService = new BossService()