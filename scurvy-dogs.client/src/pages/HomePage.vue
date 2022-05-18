<template>
  <div class="">
    <div class="row">
      <div class="col-md-8">
        <Login />
        <!-- <button
          class="btn bg-black text-light"
          type="button"
          @click="openModal()"
        >
          create Ship
        </button> -->
        <Boss />
      </div>
    </div>
  </div>
  <Modal id="createShipModal">
    <template #title>
      <h3>Name Ye Ship!</h3>
    </template>
    <template #body>
      <ShipForm />
    </template>
  </Modal>
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
  setup() {
    const openModal = async () => {
      document.getElementById("shipForm").reset();
      Modal.getOrCreateInstance(
        document.getElementById("createShipModal")
      ).toggle();
    };
    onMounted(async () => {
      if (AppState.userShip == "") {
        logger.log(AppState.userShip);
        openModal();
      }
    });

    return {
      userShip: computed(() => AppState.userShip),

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
</style>
