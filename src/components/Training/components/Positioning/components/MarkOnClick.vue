<template>
  <div
    class="marker"
    :style="`
      top: ${ypos}px;
      left: ${xpos}px;
      background-color: ${color};
    `"
  />
</template>

<script>
export default {
  props: {
    xpos: {
      type: Number,
      default: 0
    },
    ypos: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: 'white'
    }
  }
}
</script>

<style scoped>
.marker {
  position: absolute;
  width: 0.5em;
  height: 0.5em;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
</style>