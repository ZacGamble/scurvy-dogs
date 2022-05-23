<template>
  <div class="home-page">
    <Boss />
    <Modal id="createShipModal">
      <template #title>
        <h3>Name Ye Ship!</h3>
      </template>
      <template #body>
        <ShipForm />
      </template>
    </Modal>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import { shipsService } from "../services/ShipsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { computed, onMounted, watch, watchEffect } from "@vue/runtime-core";
import { AppState } from "../AppState.js";
import { accountService } from "../services/AccountService";
export default {
  name: "Home",
  watch:
  {
    userShips(newValue)
    {
        logger.log("watch", this.hasLivingShips);
        if(newValue && !this.hasLivingShips)
        {
            this.openModal();
        }
    }
  },

  setup() {
    const openModal = async () => {
      document.getElementById("shipForm").reset();
      Modal.getOrCreateInstance(
        document.getElementById("createShipModal")
      ).toggle();
    };
    onMounted(async () => {
        logger.log("onMounted", hasLivingShips.value);
      if (userShips.value && !hasLivingShips.value) {
        openModal();
      }
    });

    const hasLivingShips = computed(() => AppState.userShips?.filter(ship => !ship.isSunk).length > 0);
    const userShips = computed(() => AppState.userShips);
    return {
      activeShip: computed(() => AppState.activeShip),
      userShips,
      hasLivingShips,
      openModal,

      async createShip() {
        try {
          await shipsService.createShip();
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>

<style scoped lang="scss">
.offcanvas {
  width: 50%;
}

.home-page {
  height: 100%;
}
</style>
