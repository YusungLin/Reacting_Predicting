<template>
  <div class="overview">
    <Sidebar
      :user-info-loaded="userInfoLoaded"
      :user-battle="userBattle"
      :set-display-comp="setDisplayComp"
    />
    <component
      :is="displayComp"
      class="display"
      :user-info-loaded="userInfoLoaded"
      :user-info="userInfo"
      :set-display-comp="setDisplayComp"
    />
  </div>
</template>

<script src="./overview.js"></script>

<style scoped src="./overview.css"></style>
