<template>
  <div id="app">
    <router-view :user-info="userInfo" />
  </div>
</template>

<script>
import Vue from 'vue'
import { initUserInfo, initUserHistory } from '@/firebase'

// module globally registered for future use
import MyButton from './components/common/MyButton/MyButton'

// vue plugin for future use
import VueCookies from 'vue-cookies'
import VueResource from 'vue-resource'

Vue.use(VueCookies)   // to access cookies
Vue.use(VueResource)  // to make http request

Vue.component('mybutton', MyButton)

export default {
  name: 'App',
  data () {
    return {
      userInfo: {
        level: initUserInfo.Level,
        info: initUserHistory,
        history: null,
        weakness: [],
        battle: [
          "Rule: frozenset({'2B9'}) -> frozenset({'A'})",
          "Rule: frozenset({'2B9', '0'}) -> frozenset({'A'})",
          "Rule: frozenset({'1F1'}) -> frozenset({'A'})",
          "Rule: frozenset({'1F1', '0'}) -> frozenset({'A'})",
          "Rule: frozenset({'2B1'}) -> frozenset({'B'})",
          "Rule: frozenset({'2B1', '0'}) -> frozenset({'B'})",
          "Rule: frozenset({'A'}) -> frozenset({'A'})",
        ]
      }
    }
  },
  watch: {
    '$route' (to, from) {
      if (!this.$cookies.get('session'))
        if (to.path !== '/register' && to.path !== '/login') {
          this.$router.push({path: '/login'}).catch(error => console.log('in watch property, ', error))
        }
    }
  },
  mounted () {
    if (this.$route !== '/login' && !this.$cookies.get('session')) {
      this.$router.push({path: 'login'})
    }
  }
}

</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-size: large;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  height: 100vh;
  width: 100vw;
  background-color: blanchedalmond;
}
</style>
