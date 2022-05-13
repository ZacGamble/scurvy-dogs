<template>
  <div class="row d-flex bg-light boss-card m-5">
    <div class="col-md-6">
      <span class="d-flex">
        <router-link :to="{ name: 'Battle' }">
          <div class="left-triangle"></div>
        </router-link>
        <i class="mdi mdi-skull fs-1"></i>
        <h4 class="mt-3">Mango Mangler</h4>
      </span>
      <h5 class="ps-5 mb-4">
        Diffictuly: <i class="mdi mdi-star"></i>
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
    <div class="col-6 p-2">
      <img
        class="img-fluid"
        src="http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/9a18959b9113741.png"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    boss: {
      type: Object,
      required: false,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.left-triangle {
  height: 0;
  width: 0;
  border-top: 5em red solid;
  border-right: 5em transparent solid;
}

.boss-card {
  outline: 0.1em rgb(0, 0, 0) solid;
  border: 1em rgb(255, 255, 255) solid;
}
</style>
