<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="row bg-primary justify-content-center">
          <div class="col-md-5">
            <img
              class="boss-img"
              src="https://thiscatdoesnotexist.com"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="row justify-content-around py-5 my-5 bg-dark">
          <img class="ship-img" src="https://thiscatdoesnotexist.com" alt="" />
          <img class="ship-img" src="https://thiscatdoesnotexist.com" alt="" />
          <img class="ship-img" src="https://thiscatdoesnotexist.com" alt="" />
          <img class="ship-img" src="https://thiscatdoesnotexist.com" alt="" />
          <img class="ship-img" src="https://thiscatdoesnotexist.com" alt="" />
          <img class="ship-img" src="https://thiscatdoesnotexist.com" alt="" />
          <img class="ship-img" src="https://thiscatdoesnotexist.com" alt="" />
        </div>
      </div>
    </div>
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
.ship-img {
  border-radius: 50%;
  max-inline-size: 10em;
  box-shadow: inset;
  animation: bounce 2s alternate infinite;
}
.ship-img:nth-child(2) {
  animation-delay: 0.16s;
}
.ship-img:nth-child(3) {
  animation-delay: 0.32s;
}
.ship-img:nth-child(4) {
  animation-delay: 0.64s;
}
.ship-img:nth-child(5) {
  animation-delay: 1.28s;
}
.ship-img:nth-child(6) {
  animation-delay: 1.42s;
}

.ship-img:nth-child(7) {
  animation-delay: 1.84s;
}
.boss-img {
  animation: sway 0.5s alternate infinite;
  animation-duration: 1.2s;
}
@keyframes sway {
  from {
    margin-left: 4%;
    transform: translateX(0);
  }
  to {
    margin-left: -2%;
    transform: translateY(10%) translateX(10%) scaleX(1);
  }
}

@keyframes bounce {
  from {
    margin-left: 2%;
  }
  to {
    margin-left: 0;
    transform: translateY(20%) scaleX(1);
  }
}
</style>