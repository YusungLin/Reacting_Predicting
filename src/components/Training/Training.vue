<template>
  <div class="training">
    <!-- <keep-alive :include="VideoPage"> -->
    <router-view
      :video-d-b="videoDB"
      :video-info-loaded="videoInfoLoaded"
      :user-info="userInfo"
      :timer="timer"
      :set-timer="setTimer"
    />
    <!-- </keep-alive> -->
  </div>
</template>

<script src="./training.js"></script>

<style scoped></style>
