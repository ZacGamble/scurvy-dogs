<template>
  <header><Navbar /></header>
  <main><router-view /></main>
  <footer></footer>
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
