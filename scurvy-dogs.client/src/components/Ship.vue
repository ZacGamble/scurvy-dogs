<template>
  <div class="col-3">
    <div class="user-ship">
      <div class="user-ship-span">
        <h5 class="text-warning text-center">{{ ship.name }}</h5>
        <h6 class="text-success text-center">
          Durability:{{ ship.durability }}
        </h6>
        <h6 class="text-danger text-center">Power: {{ ship.power }}</h6>
      </div>
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
.user-ship-span {
  background-color: rgba(0, 0, 0, 0.383);
  border-radius: 1em;
}
</style>
