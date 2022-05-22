<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8"><router-view /></div>
        <div class="col-md-4 side-stuff"><SideBar /></div>
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

.side-stuff {
  height: 100vh;
  background-image: linear-gradient(
    to right,
    #2f2115,
    #402e1d,
    #483320,
    #402e1d,
    #2f2115
  );
}
</style>
