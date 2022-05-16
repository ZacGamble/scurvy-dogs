<template>
  <div class="">
    <div class="row">
      <div class="col-md-8">
        <button @click="createShip()" class="btn btn-secondary">
          <h3>Create Ship</h3>
        </button>
        <Boss />
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
.offcanvas {
  width: 50%;
}
</style>
