<template>
  <div class="sidebar">
    <mybutton
      v-for="(tag, index) in btnLabel"
      :key="index"
      class="mybtn"
      :width="'100%'"
      :height="'100%'"
      font-size="155%"
      @click="btnListener[index]"
    >
      {{ tag }}
    </mybutton>
  </div>
</template>

<script src="./sidebar.js"></script>

<style src="./sidebar.css" scoped></style>
