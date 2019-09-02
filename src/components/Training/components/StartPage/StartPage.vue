<template>
  <div class="start-page">
    <div class="row">
      <h1 class="title">
        Speed and Accurarcy<br>Practicing Predicting
      </h1>
    </div>

    <div class="row btn-row">
      <mybutton
        class="mybtn"
        :font-size="'360%'"
        :font-style="'italic'"
        @click="startTraining"
      >
        開始
      </mybutton>
    </div>
  </div>
</template>

<script src="./startPage.js"></script>

<style src="./startPage.css" scoped></style>