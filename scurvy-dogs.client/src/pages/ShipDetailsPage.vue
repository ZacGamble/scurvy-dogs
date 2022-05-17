<template>
  <header class="">
    <div class="row">
      <div class="col-12 text-center">
        <h1>{{ userShip.name }}</h1>
      </div>
      <div class="col d-flex m-3 ps-4">
        <button
          class="btn text-dark btn-info selectable mx-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          <h3>Shop</h3>
        </button>
        <Shop />
      </div>
    </div>
  </header>
  <div class="row d-block">
    <div class="col">
      <div class="row d-flex">
        <div class="col-6">
          <img class="img-fluid" src="src/assets/img/yellow-ship-sea.svg" />
        </div>
        <div class="col-6">
          <div class="">
            <h6 class="m-0">
              <i class="mdi mdi-bomb fs-4"></i>
              POWER: {{ userShip.power }}

              <div class="btn mdi mdi-plus" @click="upgrade('power')"></div>
            </h6>
            <p>Damage to enemies</p>
            <h6 class="m-0">
              <i class="mdi mdi-shield fs-4"></i> HULL: {{ userShip.hull }}

              <div class="btn mdi mdi-plus" @click="upgrade('hull')"></div>
            </h6>
            <p>Defends from attacks</p>
            <h6 class="m-0">
              <i class="mdi mdi-sail-boat fs-4"></i> Speed:
              {{ userShip.speed }}

              <div class="btn mdi mdi-plus" @click="upgrade('speed')"></div>
            </h6>
            <p>Chance of dodge</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { shipsService } from "../services/ShipsService";
export default {
  setup() {
    return {
      userShip: computed(() => AppState.userShip),
      async upgrade(stat) {
        await shipsService.upgradeStat(stat);
      },
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
  border: black 2px solid;
  height: 100%;
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

.equipment {
  margin-bottom: 1em;
}
</style>
