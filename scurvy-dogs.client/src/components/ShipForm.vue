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
            <h5>Angry</h5>
            <img
              class="img-fluid"
              src="https://i.cbc.ca/1.6108621.1626722994!/fileImage/httpImage/image.jpg_gen/derivatives/original_780/flint-locke.jpg"
            />
          </div>
          <div class="col-md-6">
            <h5>Swift</h5>
            <img
              class="img-fluid"
              src="https://www.neh.gov/sites/default/files/styles/medium/public/2018-06/2017_01-Winter_Pirates_07.jpg?itok=4ATHF-NN"
            />
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
            <option
              value="https://www.neh.gov/sites/default/files/styles/medium/public/2018-06/2017_01-Winter_Pirates_07.jpg?itok=4ATHF-NN"
            >
              angry
            </option>
            <option
              value="https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/04/Tom-Kenny-as-Patchy-the-Pirate-in-SpongeBob-SquarePants.jpg?q=50&fit=crop&w=1788&dpr=1.5"
            >
              swift
            </option>
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
          console.error("[error prefix]", error.message);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
