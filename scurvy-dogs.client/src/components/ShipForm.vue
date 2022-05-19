<template>
  <div class="component">
    <div class="container bg-light">
      <form @submit.prevent="create" id="shipForm" class="text-center">
        <div class="mb-3">
          <label for="name" class="form-label"></label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="name"
            aria-describedby="helpId"
            placeholder="Name..."
            v-model="editable.name"
            required
          />
        </div>
        <div class="row my-3">
          <div class="col-md-6">
            <h5>Swift</h5>
            <img class="img-fluid" src="../assets/img/2nd_ship_new_3.png" />
          </div>
          <div class="col-md-6">
            <h5>Heavy</h5>
            <img class="img-fluid" src="../assets/img/1stship_3.png" />
          </div>
        </div>
        <div class="input-group mb-3">
          <label class="form-label mx-2 fs-5" for="inputGroupSelect01"
            >Ship:</label
          >
          <select
            class="form-control"
            id="type"
            v-model="editable.img"
            required
          >
            <option selected>Choose...</option>
            <option value="src/assets/img/2nd_ship_new_3.png">Swift</option>
            <option value="src/assets/img/1stship_3.png">Heavy</option>
          </select>
        </div>

        <button class="btn btn-info w-50 mt-3" type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import { shipsService } from "../services/ShipsService";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { ref } from "@vue/reactivity";
export default {
  setup() {
    const editable = ref({});
    return {
      editable,
      async create() {
        try {
          await shipsService.createShip(editable.value);
          Modal.getOrCreateInstance(
            document.getElementById("createShipModal")
          ).toggle();
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
img {
  height: 12em;
  width: 9em;
}
img:hover {
  transform: translateY(-5px) translateZ(5px);
  box-shadow: 10em black;
}
</style>
