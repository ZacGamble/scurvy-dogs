<template>
  <div
    class="offcanvas offcanvas-end bg-primary"
    tabindex="-1"
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Pirate Shop</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div>
        <div class="row d-flex m-3">
          <div class="col-4">
            <div class="box">
              <img
                class="img-fluid"
                src="https://cdn-icons-png.flaticon.com/512/108/108988.png"
              />
            </div>
          </div>
          <div class="col-4">
            <div class="box">
              <img
                class="img-fluid"
                src="https://cdn-icons-png.flaticon.com/512/108/108988.png"
              />
            </div>
          </div>
          <div class="col-4">
            <div class="box">
              <img
                class="img-fluid"
                src="https://cdn-icons-png.flaticon.com/512/108/108988.png"
              />
            </div>
          </div>
          <div class="col-4">
            <div class="box">
              <img
                class="img-fluid"
                src="https://cdn-icons-png.flaticon.com/512/108/108988.png"
              />
            </div>
            <h6>$12</h6>
          </div>
          <div class="col-4">
            <div class="box">
              <img
                class="img-fluid"
                src="https://cdn-icons-png.flaticon.com/512/108/108988.png"
              />
            </div>
            <h6>$12</h6>
          </div>
          <div class="col-4">
            <div class="box">
              <img
                class="img-fluid"
                src="https://cdn-icons-png.flaticon.com/512/108/108988.png"
              />
            </div>
            <h6>$12</h6>
          </div>
          <div class="col-4">
            <div class="box">
              <img
                class="img-fluid"
                src="https://cdn-icons-png.flaticon.com/512/108/108988.png"
              />
            </div>
            <h6>$12</h6>
          </div>
          <div class="col-4">
            <div class="box">
              <img
                class="img-fluid"
                src="https://cdn-icons-png.flaticon.com/512/108/108988.png"
              />
            </div>
            <h6>$12</h6>
          </div>
          <div class="col-4">
            <div class="box">
              <img
                class="img-fluid"
                src="https://cdn-icons-png.flaticon.com/512/108/108988.png"
              />
            </div>
            <h6>$12</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.box {
  background: #8e8574;
  border-radius: 4px;
  border: #c9baa1 10px solid;
  margin: 5%;
}
</style>
