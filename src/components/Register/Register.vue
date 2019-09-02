<template>
  <div class="register">
    <h1 class="title">
      Register
    </h1>

    <div class="layout">
      <form>
        <div class="row">
          <label for="userID">
            新使用者:
          </label>
          <input
            v-model="userid"
            type="text"
            name="userID"
            placeholder="新使用者"
          >
        </div>
        <div class="row">
          <label for="password">
            新密碼:
          </label>
          <input
            v-model="passwd"
            type="password"
            name="password"
            placeholder="新密碼"
          >
        </div>
        <div class="row">
          <label for="password2">
            再次輸入密碼:
          </label>
          <input
            v-model="passwd2"
            type="password"
            name="password2"
            placeholder="再次輸入密碼"
          >
        </div>
      </form>

      <div class="linking-comp">
        <mybutton
          class="mybtn"
          font-size="250%"
          @click="back"
        >
          返回
        </mybutton>
        <mybutton
          class="mybtn"
          font-size="250%"
          @click="confirm"
        >
          確認
        </mybutton>
      </div>
    </div>
  </div>
</template>

<script src="./register.js"></script>

<style src="./register.css" scoped></style>
