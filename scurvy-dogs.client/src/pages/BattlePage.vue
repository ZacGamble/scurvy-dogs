<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="row d-block">
          <div class="col-8">
            <div class="">
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  :style="'width: ' + boss?.durability / 10 + '%;'"
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <img
                class="boss-img"
                src="https://thiscatdoesnotexist.com"
                alt=""
              />
              <button @click="attack()" class="btn btn-danger">ATTACK</button>
              <button @click="bossAttack()" class="btn btn-warning">
                Boss Attack
              </button>
            </div>
          </div>
          <div class="col-4">
            <div class="row justify-content-around bg-dark">
              <img
                class="ship-img"
                src="https://thiscatdoesnotexist.com"
                alt=""
              />
              <img
                class="ship-img"
                src="https://thiscatdoesnotexist.com"
                alt=""
              />
              <img
                class="ship-img"
                src="https://thiscatdoesnotexist.com"
                alt=""
              />
              <img
                class="ship-img"
                src="https://thiscatdoesnotexist.com"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { bossService } from '../services/BossService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
import { onMounted } from '@vue/runtime-core';
import { combatService } from '../services/CombatService';
import { shipsService } from '../services/ShipsService';
import { entriesService } from '../services/EntriesService.js';
import Loader from '../utils/Loader.js'
export default {

  setup() {
    const route = useRoute()
    onMounted(async () => {

      try {
        const loader = new Loader()
        loader.step(entriesService.getByLobby, [route.params.id])
        loader.step(bossService.getBossById, [route.params.id])
        loader.step(shipsService.getShipsByEntry, [route.params.id])
        await loader.load()
        if (!AppState.activeEntry) {
          await entriesService.create({ lobbyId: route.params.id, shipId: AppState.userShip.id })
        }
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })

    return {
      boss: computed(() => AppState.boss),
      ships: computed(() => AppState.ships),
      lobbyShips: computed(() => AppState.lobbyShips),

      async attack() {
        AppState.boss.durability -= AppState.activeEntry.ship.power
        try {
          await combatService.attack(AppState.activeEntry.shipId, AppState.boss.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }

      },
      async bossAttack() {
        try {
          await bossService.bossAttack(route.params.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ship-img {
  border-radius: 50%;
  max-inline-size: 10em;
  box-shadow: inset;
  animation: bounce 2s alternate infinite;
}
.ship-img:nth-child(2) {
  animation-delay: 0.16s;
}
.ship-img:nth-child(3) {
  animation-delay: 0.32s;
}
.ship-img:nth-child(4) {
  animation-delay: 0.64s;
}
.ship-img:nth-child(5) {
  animation-delay: 1.28s;
}
.ship-img:nth-child(6) {
  animation-delay: 1.42s;
}

.ship-img:nth-child(7) {
  animation-delay: 1.84s;
}
// .boss-img {
//   animation: sway 0.5s alternate infinite;
//   animation-duration: 1.2s;
// }
@keyframes sway {
  from {
    margin-left: 4%;
    transform: translateX(0);
  }
  to {
    margin-left: -2%;
    transform: translateY(10%) translateX(10%) scaleX(1);
  }
}

@keyframes bounce {
  from {
    margin-left: 2%;
  }
  to {
    margin-left: 0;
    transform: translateY(20%) scaleX(1);
  }
}

.side-map {
  background-image: url("../assets/img/Side-map.svg");
  background-repeat: no-repeat;
  height: 100vh;
}
</style>
