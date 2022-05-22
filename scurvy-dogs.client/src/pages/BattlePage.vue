<template>
  <div class="row restrict">
    <div class="boss">
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          :style="'width: ' + boss?.durability / 10 + '%;'"
          style="background-color: red"
          aria-valuenow="100"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <div>
        <img
          class="boss-img"
          src="src\assets\img\MenacingPirateCaptain.webp"
          alt=""
        />
        <button @click="attack()" class="btn btn-danger">ATTACK</button>
        <button @click="bossAttack()" class="btn btn-warning">
          Boss Attack
        </button>
      </div>
    </div>

    <div class="row d-flex justify-content-around bg-dark">
      <Ship v-for="s in lobbyShips" :key="s.id" :ship="s" />
    </div>
  </div>
  <Modal id="battleStats">
    <template #title>
      <h1 class="fw-bold">
        <!-- TODO v-if to check if boss or ship died first, then display victory or defeat respectively -->
        Fight over!<br />
        Stats from the battle
      </h1>
    </template>
    <template #body>
      <div class="d-flex flex-column fs-2">
        <span>Damage you dealt: {{ currentHistory.damageDone }}</span>
        <span>Damage you took: {{ currentHistory.damageTaken }}</span>
        <span>Your strongest hit: {{ currentHistory.largestHit }}</span>
        <span>Damage you dodged: {{ currentHistory.damageDodged }}</span>
      </div>
    </template>
  </Modal>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { bossService } from "../services/BossService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import { onBeforeUnmount, onMounted } from "@vue/runtime-core";
import { combatService } from "../services/CombatService";
import { shipsService } from "../services/ShipsService";
import { entriesService } from "../services/EntriesService.js";
import Loader from "../utils/Loader.js";
import { socketService } from "../services/SocketService.js";
import { Modal } from "bootstrap";
export default {
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        const loader = new Loader();
        loader.step(entriesService.getByLobby, [route.params.id]);
        loader.step(bossService.getBossById, [route.params.id]);
        loader.step(shipsService.getShipsByEntry, [route.params.id]);
        if (!AppState.activeShip.id) {
          loader.step(shipsService.getUserShip, []);
        }
        await loader.load();
        if (!AppState.activeEntry) {
          await entriesService.create({
            lobbyId: route.params.id,
            shipId: AppState.activeShip.id,
          });
          socketService.newEntry(AppState.activeEntry);
        } else {
          socketService.joinLobby(AppState.activeEntry);
        }
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });

    onBeforeUnmount(() => {
      socketService.leaveLobby(AppState.activeEntry);
    });

    return {
      boss: computed(() => AppState.boss),
      currentHistory: computed(() => AppState.currentHistory),
      ships: computed(() => AppState.ships),
      lobbyShips: computed(() => AppState.lobbyShips),
      attackPower: computed(() => AppState.activeShip.power),

      async attack() {
        AppState.boss.durability -= AppState.activeEntry.ship.power;
        logger.log("BattlePage > Attack method > ", AppState.boss.durability);

        if (AppState.boss.durability <= 0) {
          Modal.getOrCreateInstance(
            document.getElementById("battleStats")
          ).show();
        }
        try {
          await combatService.attack(
            AppState.activeEntry.shipId,
            AppState.boss.id,
            route.params.id
          );

          document.getElementById("dmg").innerHTML = this.attackPower;
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      async bossAttack() {
        try {
          if (AppState.activeShip.durability > 0) {
            await bossService.bossAttack(route.params.id);
            logger.log(
              "BattlePage > boss Attack >",
              AppState.activeShip.durability
            );
          }
          if (AppState.activeShip.durability <= 0) {
            Pop.toast("Your ship was sunk");
            await shipsService.sinkShip(AppState.activeShip?.id);
          }
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.restrict {
  height: 100vh;
}
.bg-img {
  background-image: url(C:\source\codeworks\scurvy-dogs\scurvy-dogs.client\src\assets\img\MoonlightVessel.webp);
  background-size: cover;
}
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

.dmg {
  animation-fill-mode: forwards;
  animation: dmg 5s;
}

.boss-img {
  height: 35%;
  width: 40%;
  // animation: sway 0.5s alternate infinite;
  // animation-duration: 1.2s;
}

@keyframes dmg {
  from {
    color: rgba($color: #e21717, $alpha: 0);
  }

  50% {
    color: rgba($color: #e91414, $alpha: 1);
  }
  to {
    color: rgba($color: #e91414, $alpha: 0);
  }
}

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
    transform: translateY(-20%) scaleX(1);
  }
}

.side-map {
  background-image: url("../assets/img/Side-map.svg");
  background-repeat: no-repeat;
  height: 100vh;
}
</style>
