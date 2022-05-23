<template>
  <nav class="sidebar px-3 text-dark mt-3">
    <header class="">
      <div class="row">
        <div class="col-12 text-center">
          <div class="bg-info"><Login /></div>

          <h1>{{ activeShip?.name }}</h1>
        </div>
        <select class="col-12" name="" id="" @change="setActiveShip" v-model="shipChoice">
            <option v-for="s in userShips" :key="s.id" :value="s.id" :disabled="s.isSunk" :selected="s.id == activeShip.id">{{s.isSunk ? "(Sunken) " : ""}}{{s.name}}</option>
        </select>
        <div class="col d-flex m-3 ps-4">
          <router-link class="" :to="{ name: 'Home' }">
            <div class="d-flex text-dark btn btn-secondary">
              <h3>To Sea!</h3>
            </div>
          </router-link>
          <!-- <router-link
            :to="{ name: 'Ships' }"
            class="btn selectable text-uppercase"
          >
            <button
              class="text-dark btn btn-info"
              type="button"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <h3>Stats</h3>
            </button>
          </router-link> -->

          <Shop />
        </div>
      </div>
    </header>
    <div class="row">
      <div class="col p-0">
        <div class="row d-flex p-0">
          <div class="col-6">
            <img class="img-fluid" :src="activeShip?.img" />
          </div>
          <div class="col-6">
            <div class="">
              <h6
                title=" Gain more upgrade points by participating in Legendary Ship battles"
                class="p-1"
              >
                Upgrade Points: {{ account.points }}
              </h6>
              <p></p>
              <h6 class="m-0">
                <i class="mdi mdi-bomb fs-4"></i>
                POWER: {{ activeShip?.power }}
                <div
                  v-if="account.points > 0"
                  class="btn mdi mdi-plus bg-danger btn-sm"
                  @click="upgrade('power')"
                ></div>
              </h6>
              <p>Damage to enemies</p>
              <h6 class="m-0">
                <i class="mdi mdi-shield fs-4"></i> HULL: {{ activeShip?.hull }}
                <div
                  v-if="account.points > 0"
                  class="btn mdi mdi-plus bg-danger btn-sm"
                  @click="upgrade('hull')"
                ></div>
              </h6>
              <p>Defends from attacks</p>
              <h6 class="m-0">
                <i class="mdi mdi-sail-boat fs-4"></i> Speed:
                {{ activeShip?.speed }}
                <div
                  v-if="account.points > 0"
                  class="btn mdi mdi-plus bg-danger btn-sm"
                  @click="upgrade('speed')"
                ></div>
              </h6>
              <p>Chance of dodge</p>
            </div>
          </div>
          <div class="left-triangle p-0"></div>
          <div class="row d-flex p-4">
            <div class="col-3 bg-info m-1">
              <h5>Ships Slain:</h5>
            </div>
            <div class="col-3 bg-info m-1">
              <h5>All Damage:</h5>
            </div>
            <div class="col-3 bg-info m-1">
              <h5>Final Blows:</h5>
            </div>
            <div class="col-3 bg-info m-1"></div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { AppState } from "../AppState";
import { shipsService } from "../services/ShipsService";
import { accountService } from "../services/AccountService";
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
export default {
  setup() {
      const shipChoice = ref("");
    return {
        shipChoice,
      account: computed(() => AppState.account),
      activeShip: computed(() => AppState.activeShip),
      userShips: computed(() => AppState.userShips),
      async upgrade(stat) {
        AppState.account.points -= 1;
        await shipsService.upgradeStat(stat);
        await accountService.editAccount(AppState.account);
      },
      async setActiveShip()
      {
            try
            {
                await shipsService.setActiveShip(shipChoice.value);
                Pop.toast("Ship successfully changed", "success");   
            }
            catch(error)
            {
                logger.error("[SideBar.vue > aetActiveShip]", error.message);
                Pop.toast(error.message, "error");
            }
      }
    };
  },
};
</script>

<style lang="scss" scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.sidebar {
  height: 80vh;
  background-color: #e8d8bd;
}

.box {
  background: #8e8574;
  border-radius: 4px;
  border: #c9baa1 10px solid;
}

h6 {
  background: #8e8574;
}

p {
  background: #c9baa1;
}

.left-triangle {
  height: 0;
  width: 0;
  border-bottom: 3em #2f2115 solid;
  border-right: 3em transparent solid;
}
</style>
