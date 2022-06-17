<template>
  <div class="container-fluid">
    <div
      v-if="!gameStarted"
      class="row bg-primary boss-card m-5 rounded justify-content-center"
    >
      <div class="col-md-6 p-0">
        <span class="d-flex">
          <div
            @click="openBattle(), (gameStarted = true)"
            class="left-triangle action"
            title="Fight the Boss!"
          >
            <p class="boss-text">Fight!</p>
          </div>

          <i class="mdi mdi-skull fs-1"></i>
          <h4 class="mt-3">Mango Mangler</h4>
        </span>
        <h5 class="ps-5 mb-4">
          Diffictuly:
          <i class="mdi mdi-star"></i>
          <i class="mdi mdi-star"></i>
          <i class="mdi mdi-star"></i>
        </h5>
        <h5 class="d-flex ps-5">
          Power:
          <p class="text-danger fw-bold">14</p>
        </h5>
        <h5 class="d-flex ps-5">
          Hull:
          <p class="text-danger fw-bold">14</p>
        </h5>
        <h5 class="d-flex ps-5">
          Reward Level:
          <p class="text-warning fw-bold">RARE</p>
        </h5>
      </div>
      <div class="col-6 p-2 mt-5">
        <img
          class="img-fluid"
          src="http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/9a18959b9113741.png"
        />
      </div>
    </div>
    <div v-else class="startBar">
      <h1 class="begin-text p-2">Get Ready Ye Scurvy Dogs!</h1>

      <div class="row d-flex p-5">
        <div class="col-4">
          <img
            class="img-fluid my-ship"
            src="../assets/img/2nd_ship_new_3.png"
          />
        </div>
        <div class="col-4">
          <img src="https://i.gifer.com/3iCN.gif" alt="" />
        </div>
        <div class="col-4">
          <img
            class="img-fluid bad-ship pt-2"
            src="http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/9a18959b9113741.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { router } from "../router";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { lobbiesService } from "../services/LobbiesService.js";
import { entriesService } from "../services/EntriesService.js";
import { AppState } from "../AppState";
import { onMounted } from "@vue/runtime-core";
export default {
  props: {
    boss: {
      type: Object,
      required: false,
    },
  },
  props: {
    gameStarted: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    return {
      async openBattle() {
        if (!AppState.activeShip) {
          Pop.toast("Ye must use a living ship!", "warning");
          return;
        }
        try {
          const id = await lobbiesService.create();
          const newEntry = { lobbyId: id, shipId: AppState.activeShip.id };
          await entriesService.create(newEntry);
          await entriesService.delay(3);
          router.push({ name: "Battle", params: { id } });
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
.left-triangle {
  height: 0;
  width: 0;
  border-top: 7em #e8d8bd solid;
  border-right: 7em transparent solid;
  box-shadow: -2px -2px 2px rgba(0, 0, 0, 0.584);
}

.left-triangle:hover {
  height: 0;
  width: 0;
  border-top: 7em #2f2115 solid;
  border-right: 7em transparent solid;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.584);
  transition-duration: 80ms;
  content: "Fight Boss";
}

.begin-text {
  font-size: 8em;
}
.sea-water {
  top: 0;
  z-index: 4;
  width: 100vw;
  margin-left: -1%;

  position: absolute;
}
.boss-card {
  outline: 0.1em rgb(0, 0, 0) solid;
  border: 1em #2f2115 solid;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.577);
}

.my-ship {
  transform: scaleX(-1);
}

.boss-text {
  overflow: hidden;
  position: absolute;
  z-index: 2;
  top: 10vh;
  left: 7vw;
  transform: rotate(-45deg);
  font-weight: bold;
  transition-duration: 80ms;
}

.startBar {
  width: 60%;
  height: 40%;
  margin-top: 5%;
  position: absolute;
  background-color: #e8d8bd;
  z-index: 5;
  left: -100em;
  background-image: url("https://thumbs.gfycat.com/PassionateEvenArgusfish-max-1mb.gif");
  background-position: bottom;
  background-repeat: repeat-x;
  background-size: 15em 15em 15em;
}

.left-triangle:hover > .boss-text {
  font-size: 9em;
  transition-duration: 80ms;
  color: rgb(127, 108, 0);
}

.startBar {
  animation: fightStart 1000ms forwards;
}

.left-triangle:active > .boss-card {
  outline: 1em gold solid;
  border: 1em gold solid;
}

@keyframes fightStart {
  0% {
  }
  90% {
    left: 10%;
  }
  100% {
    left: 10%;
    width: 80%;
    height: 70%;
  }
}
</style>
