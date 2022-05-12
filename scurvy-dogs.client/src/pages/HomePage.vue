<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="d-flex justify-content-center bg-grey">CHART YE COURSE</div>
      </div>
    </div>
    <div class="row bg-info">
      <div class="col-md-8">
        <div class="justify-content-center mx-3 my-3 boss-card">
          <div class="justify-content-center d-flex">
            <img
              src="https://thiscatdoesnotexist.com"
              alt="boss image"
              class="img-clamp img-fluid"
            />
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <span class="d-flex justify-content-between p-3">Davy Jones </span>
        <span> Difficulty: Very Hard </span>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="d-flex justify-content-center">LOBBY INFORMATION</div>
      </div>
    </div>
    <!-- Player statistics offcanvas? -->
  </div>
</template>


<script>
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.img-clamp {
  // width: 100%;
  // height: auto;
  border-radius: 16px;
}

.boss-card {
  height: 40%;
}
</style>