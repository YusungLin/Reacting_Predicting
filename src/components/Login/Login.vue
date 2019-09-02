<template>
  <div class="login">
    <h1 class="title">
      Login
    </h1>

    <div class="layout">
      <form>
        <div class="row">
          <label for="userID">
            使用者:
          </label>
          <input
            v-model="userid"
            type="text"
            name="userID"
            placeholder="輸入使用者"
          >
        </div>
        <div class="row">
          <label for="password">
            密碼:
          </label>
          <input
            v-model="passwd"
            type="password"
            name="password"
            placeholder="輸入密碼"
          >
        </div>
      </form>

      <div class="linking-comp">
        <mybutton
          class="mbtn"
          font-size="250%"
          @click="login"
        >
          登入
        </mybutton>
        <mybutton
          class="mbtn"
          font-size="250%"
          @click="register"
        >
          註冊
        </mybutton>
      </div>
    </div>
  </div>
</template>

<script src="./login.js"></script>

<style src="./login.css" scoped></style>
