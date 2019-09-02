<template>
  <div class="my-button">
    <button
      class="btn"
      :style="`
        width: ${width};
        height: ${height};
        font-size: ${fontSize};
        font-style: ${fontStyle}
        text-decoration: ${textDecoration};
      `"
      @click="$emit('click')"
    >
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      // default: '100%'
      default: 'fit-content'
    },
    height: {
      type: String,
      default: 'fit-content'
    },
    fontSize: {
      type: String,
      default: '300%'
    },
    fontStyle: {
      type: String,
      default: 'none'
    },
    textDecoration: {
      type: String,
      default: 'none'
    }
  }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/earlyaccess/cwtexkai.css);

.btn,
.btn:visited {
  background-color: rgb(255, 30, 0);
  border: none;
  border-radius: 50%;
  padding: 6% 16%;
  display: inline-block;
  
  font-size: 300%;
  font-family: "cwTeXKai", 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-weight: 400;
  color: rgb(49, 49, 49);
  user-select: none;
}

/* there is no need for this on mobiles and tablets */
/* .btn:hover {
    background-color: rgb(255, 60, 60);
} */
</style>