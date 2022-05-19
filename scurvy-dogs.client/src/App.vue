<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-8"><router-view /></div>
        <div class="col-4"><SideBar /></div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
import Navbar from "./components/Navbar.vue";
export default {
  components: { Navbar },
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState),
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
