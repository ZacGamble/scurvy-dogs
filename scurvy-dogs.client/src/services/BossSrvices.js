import { AppState } from "../AppState"
import { api } from "./AxiosService"

class BossService {

 async getBossById() {
  const res = await api.get('api/boss/' + id)
  logger.log('get Boss by Id!', res.data)
  AppState.boss = res.data
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