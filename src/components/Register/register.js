import { userInfo, userHistory, initUserInfo, initUserHistory } from '@/firebase'

export default {
  data () {
    return {
      userid: '',
      passwd: '',
      passwd2: '',
      currAccounts: []
    }
  },
  async mounted () {
    // get all the registered accounts when the page is loaded
    let docs = await userInfo.get()
    docs.forEach(doc => {
      this.currAccounts.push(doc.id)
    })
  },
  methods: {
    back () {
      this.$router.push({path: '/login'})
    },
    confirm () {
      // failed registered
      if (this.userid === '') {
        alert('請輸入使用者名稱')
        this.userid = this.passwd = this.passwd2 = ''
        return
      }
      else if (this.currAccounts.indexOf(this.userid) !== -1) {
        alert('這個使用者名稱已被使用')
        this.userid = this.passwd = this.passwd2 = ''
        return
      } else if (this.passwd !== this.passwd2) {
        alert('密碼輸入錯誤，請重新輸入')
        this.userid = this.passwd = this.passwd2 = ''
        return
      }

      // successfully registered
      userInfo.doc(this.userid).set(initUserInfo)
      userInfo.doc(this.userid).update({Passwd: this.passwd})
      userHistory.doc(this.userid).set(initUserHistory)
      this.back()
    }
  }
}
