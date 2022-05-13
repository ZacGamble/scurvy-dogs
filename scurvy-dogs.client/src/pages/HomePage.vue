<template>
  <div class="">
    <div class="row g-0">
      <div class="col-md-8 my-5">
        <Boss />
      </div>
      <div class="col-md-4 side-map">
        <SideBar />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped lang="scss">
.side-map {
  background-image: url("../assets/img/Side-map.svg");
  background-repeat: no-repeat;
  height: 100vh;
}
</style>
