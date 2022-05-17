<template>
  <div class="component">
    <div class="container">
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
        <div class="mb-3">
          <label for="power" class="form-label"></label>
          <input
            type="number"
            class="form-control"
            name="power"
            id="power"
            aria-describedby="helpId"
            min="1"
            max="5"
            v-model="editable.power"
            required
          />
        </div>
        <div class="mb-3">
          <label for="hull" class="form-label"></label>
          <input
            type="number"
            class="form-control"
            name="hull"
            id="hull"
            aria-describedby="helpId"
            min="1"
            max="5"
            v-model="editable.hull"
            required
          />
        </div>
        <div class="mb-3">
          <label for="speed" class="form-label"></label>
          <input
            type="number"
            class="form-control"
            name="speed"
            id="speed"
            aria-describedby="helpId"
            min="1"
            max="5"
            v-model="editable.speed"
            required
          />
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
          console.error("[error prefix]", error.message);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
