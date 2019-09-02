<template>
  <div class="video-page">
    <h1 class="title">
      Q {{ videoId }} / {{ videoDB.length-1 }}
    </h1>

    <video-player
      ref="videoPlayer"
      class="video-player-box"
      :options="playerOptions"
      @ready="playerReady"
      @play="playerPlayed"
      @ended="playerEnded"
    />
  </div>
</template>

<script src="./videoPage.js"></script>

<style src="./videoPage.css"></style>