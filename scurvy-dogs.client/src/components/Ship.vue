<template>
  <div class="col-3">
    <div class="user-ship">
      <h5>{{ ship.name }}</h5>
      <h6>{{ ship.durability }}</h6>
      <img :src="ship.img" class="img-fluid" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ship: {
      type: Object,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.user-ship {
  outline: 1em black solid;
}
</style>
