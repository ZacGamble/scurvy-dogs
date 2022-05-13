<template>
  <nav class="sidebar px-3 text-dark">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex text-dark">Ye Scurvy Dogs!</div>
    </router-link>

    <router-link :to="{ name: 'Ships' }" class="btn selectable text-uppercase">
      <button
        class="text-dark"
        type="button"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        Ship Details
      </button>
    </router-link>
    <div class="" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li></li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.sidebar {
  margin-top: 20%;
  margin-left: 10%;
}
</style>
