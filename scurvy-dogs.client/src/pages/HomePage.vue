<template>
  <div class="">
    <div class="row">
      <div class="col-md-8">
        <button @click="createShip()" class="btn btn-secondary">
          <h3>Create Ship</h3>
        </button>
        <Boss />
      </div>
    </div>
  </div>
  <Modal id="createShipModal">
    <template #title>
      <h3>Create Project</h3>
    </template>
    <template #body>
      <ShipForm />
    </template>
  </Modal>
</template>

<script>
import { shipsService } from "../services/ShipsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
export default {
  name: "Home",
  setup() {
    return {
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
