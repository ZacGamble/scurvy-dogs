<template>
  <div class="component">
    <div class="container">
      <form @submit.prevent="create" id="shipForm" class="text-center">
        <div class="mb-3">
          <label for="name" class="form-label"></label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="name"
            aria-describedby="helpId"
            placeholder="Name..."
            v-model="editable.name"
            required
          />
        </div>
        <div class="mb-3">
          <label for="power" class="form-label"></label>
          <input
            type="number"
            class="form-control"
            name="power"
            id="power"
            aria-describedby="helpId"
            min="1"
            max="5"
            v-model="editable.power"
            required
          />
        </div>
        <button class="btn btn-info w-50 mt-3" type="submit">Submit</button>
      </form>
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

<style lang="scss" scoped></style>
