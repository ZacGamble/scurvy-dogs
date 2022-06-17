<template>
  <button @click="bossAttack()" class="mx-5 btn btn-warning boss-btn">
    Boss Attack
    <img
      class="position-absolute damage-boss"
      src="https://i.gifer.com/3iCN.gif"
    />
  </button>
  <div class="container p-5">
    <div class="row restrict">
      <div class="col-12">
        <h1 class="text-danger text-center">Mango Magler</h1>

        <div class="progress">
          <div
            class="progress-bar"
            role="progressbar"
            :style="'width: ' + boss?.durability / 10 + '%;'"
            style="background-color: red"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {{ boss?.durability * 1300 }}
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="boss">
          <div class="full-boss">
            <img
              class="img-fluid ship-img"
              src="http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/9a18959b9113741.png"
            />
            <img
              class="boss-img"
              src="src\assets\img\MenacingPirateCaptain.webp"
              alt=""
            />
          </div>
        </div>
      </div>

      <div class="col-6 mt-auto mb-5 pb-5">
        <button @click="attack()" class="btn btn-danger atk-btn">
          FIRE!
          <img
            class="position-absolute damage"
            src="https://i.gifer.com/3iCN.gif"
          />
        </button>
        <div class="row d-flex justify-content-end">
          <Ship v-for="s in lobbyShips" :key="s.id" :ship="s" />
          <Ship v-for="s in lobbyShips" :key="s.id" :ship="s" />
          <Ship v-for="s in lobbyShips" :key="s.id" :ship="s" />
          <div class="col-12 d-flex justify-content-center"></div>
        </div>
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
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
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
  watch: {
    userShipAlive(newValue) {
      if (!newValue) {
        logger.log("-------------------------------------------GO HOME");
        this.router.push({ name: "Home" });
      }
    },
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    onMounted(async () => {
      try {
        const loader = new Loader();
        loader.step(entriesService.getByLobby, [route.params.id]);
        loader.step(bossService.getBossById, [route.params.id]);
        loader.step(shipsService.getShipsByEntry, [route.params.id]);
        if (!AppState.activeShip?.id) {
          loader.step(shipsService.getUserShips, []);
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
      router,
      boss: computed(() => AppState.boss),
      currentHistory: computed(() => AppState.currentHistory),
      ships: computed(() => AppState.ships),
      lobbyShips: computed(() => AppState.lobbyShips),
      attackPower: computed(() => AppState.activeShip.power),
      userShipAlive: computed(() => !AppState.activeShip.isSunk),

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

          //document.getElementById("damage").innerHTML = this.attackPower;
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
  height: 85vh;
  background-image: url("https://projectpokemon.org/home/uploads/monthly_2020_08/large.V00P01.gif.e194012f9b28df6a4fe053d6ad3a5181.gif");
  background-size: cover;
  border-radius: 10px;
  outline: brown 1em inset;
}

.ship-img {
  position: relative;
  box-shadow: inset;
  transform: scaleX(-1);
}

.full-boss {
  animation: sway 0.5s alternate infinite;
  animation-duration: 1.2s;
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

.damage {
  z-index: 7;
  visibility: hidden;
  left: 25em;
}

.damage-boss {
  z-index: 7;
  visibility: hidden;
  bottom: 10%;
  left: 60%;
}

.atk-btn:active > .damage {
  animation: dmg 500ms;
}

.boss-btn:active > .damage-boss {
  animation: dmg 500ms;
}
.boss-img {
  position: absolute;
  height: 10em;
  width: 10em;
  left: 10em;
  border-radius: 100%;
  // animation: sway 0.5s alternate infinite;
  // animation-duration: 1.2s;
}

@keyframes dmg {
  0% {
    visibility: hidden;
  }

  50% {
    visibility: visible;
  }
  100% {
    visibility: hidden;
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
</style>
