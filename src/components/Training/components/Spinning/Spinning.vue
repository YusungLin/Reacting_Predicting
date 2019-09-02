<template>
  <div class="spinning">
    <div class="row">
      <h1 class="title">
        Q {{ videoId }} / {{ videoDB.length-1 }}
      </h1>
    </div>

    <div class="row">
      <h2 class="title-question">
        球路：
      </h2>
    </div>

    <div class="options-list row">
      <div
        v-for="(tag, index) in tagNames"
        :key="index"
        class="option"
      >
        <input
          v-model="pickedTag"
          type="radio"
          :name="'option' + index"
          :value="tag"
        >
        <label
          class="option"
          :for="'option' + index"
          @click="pickedTag = tag"
        >
          {{ tag }}
        </label>
      </div>
    </div>

    <div class="row btn-row">
      <mybutton
        class="mybtn"
        :width="'100%'"
        :height="'100%'"
        font-size="200%"
        @click="nextVideo"
      >
        Next
      </mybutton>
    </div>
  </div>
</template>

<script src="./spinning.js"></script>

<style src="./spinning.css" scoped></style>