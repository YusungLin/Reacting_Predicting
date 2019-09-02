import { userInfo } from '@/firebase'
import History from '../History/History'
import Profile from '../Profile/Profile'

export default {
  props: {
    // three things to check: 1 bit for each => if all donw, it should be 7
    userInfoLoaded: {
      type: Number,
      default: 0
    },
    setDisplayComp: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      btnLabel: ['個人資料', '訓練', '歷史紀錄', '登出'],
      btnListener: [this.profile, this.training, this.history, this.logout],
      showHistory: false,
      showProfile: false
    }
  },
  methods: {
    training () {
      if (~(this.userInfoLoaded ^ 7)) {
        this.$router.push({path: './training'})
      }
    },
    profile () {
      if (!this.showProfile && ~(this.userInfoLoaded ^ 7)) {
        this.setDisplayComp(Profile)
        this.showProfile = true
        this.showHistory = false
      } else {
        this.setDisplayComp(null)
        this.showProfile = false
      }
    },
    history () {
      if (!this.showHistory && ~(this.userInfoLoaded ^ 7)) {
        this.setDisplayComp(History)
        this.showHistory = true
        this.showProfile = false
      } else {
        this.setDisplayComp(null)
        this.showHistory = false
      }
    },
    logout () {
      let user = this.$cookies.get('session')
      userInfo.doc(user).update({Login: false}) // on the server-side
      if ( user ) {
        this.$cookies.remove('session')         // on the client-side
      }
      this.$router.push('/login')
    }
  },
  components: {
    History,
    Profile
  }
}
