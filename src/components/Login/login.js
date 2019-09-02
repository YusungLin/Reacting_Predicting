import { userInfo } from '@/firebase'

export default {
  name: 'Login',
  data () {
    return {
      userid: '',
      passwd: '',
      currAccounts: [],
      currSession: null
    }
  },
  async mounted () {
    // get all the registered accounts when the page is loaded
    let docs = await userInfo.get()
    docs.forEach(doc => {
      this.currAccounts[doc.id] = doc.data()
    })
  },
  methods: {
    login () {
      // remove the previous login session if there is any
      let user = this.$cookies.get('session')
      if (user) {
        userInfo.doc(user).update({Login: false}) // on the server-side
        this.$cookies.remove('session')           // on the client-side
      }

      // check login account/passwd
      if (this.userid === '') {
        alert('請輸入使用者名稱')
        this.userid = this.passwd = ''
      }
      else if (this.currAccounts[this.userid] && this.passwd === this.currAccounts[this.userid].Passwd) {
        // check if the account is being used (suspended! TBC)
        // if (!this.currSession[this.userid].login) {
          // let halfHour = 30*60
        this.$cookies.set('session', this.userid)
        userInfo.doc(this.userid).update({Login: true})
        this.$router.push({path: '/overview'})
        // } else {
        //   alert('這個帳號正在使用中')
        // }
      } else {
        alert('使用者名稱或密碼錯誤')
        this.userid = this.passwd = ''
      }
    },
    register () {
      this.$router.push({path: '/register'})
    }
  }
}
