import { AppState } from "../AppState"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"


class CombatService { 

  async attack(actor, target) {
    // target.health -= (actor.power - .02 * target.hull) 
    await api.post('api/ships/' + target + '/attack', {id: actor})
  }
 
  async dodgeCalc(actor, target) {
   const hit = flase
   const speed = Math.floor(Math.random() * actor.speed)
   const targetSpeed = Math.floor(Math.random() * target.speed)
   if (speed <= targetSpeed) {
     Pop.toast('MISS')
   }
   return hit = true
 }

 async damage(targetId) {
  
 }

}

export const combatService = new CombatService()