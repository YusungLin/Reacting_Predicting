<template>
  <div class="positioning">
    <div class="row">
      <h1 class="title">
        Q {{ videoId }} / {{ videoDB.length-1 }}
      </h1>
    </div>

    <div class="row">
      <div
        ref="tennisTable"
        class="tennis-table"
        @click="markPos"
      >
        <div class="middle-line" />
        <component
          :is="marker"
          :xpos="markerPosX"
          :ypos="markerPosY"
        />
        <component
          :is="ansMarker"
          :xpos="ansMarkerPosX"
          :ypos="ansMarkerPosY"
          :color="'orange'"
        />
      </div>
    </div>

    <div class="row btn-row">
      <mybutton
        v-if="!submit"
        class="mybtn"
        :width="'100%'"
        font-size="150%"
        @click="showAnswer"
      >
        Answer
      </mybutton>
      <mybutton
        v-else
        class="mybtn"
        :width="'100%'"
        font-size="150%"
        @click="nextQuesiton"
      >
        Next
      </mybutton>
    </div>
  </div>
</template>

<script src="./positioning.js"></script>

<style scoped src="./positioning.css"></style>