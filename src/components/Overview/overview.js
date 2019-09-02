import { userInfo, userHistory, userTraining, recorderServer } from '@/firebase'
import Sidebar from './components/Sidebar/Sidebar'

export default {
  props: {
    // pass in from the main component through <view-router />
    userInfo: {
      type: Object,
      default: {
        level: 10,
        info: null,
        history: null,
        battle: [
          "Rule: frozenset({'2B9'}) -> frozenset({'A'})",
          "Rule: frozenset({'2B9', '0'}) -> frozenset({'A'})",
          "Rule: frozenset({'1F1'}) -> frozenset({'A'})",
          "Rule: frozenset({'1F1', '0'}) -> frozenset({'A'})",
          "Rule: frozenset({'2B1'}) -> frozenset({'A'})",
          "Rule: frozenset({'2B1', '0'}) -> frozenset({'A'})",
          "Rule: frozenset({'A'}) -> frozenset({'A'})",
        ]
      }
    }
  },
  mounted () {
    // get the user data from the firebase
    userInfo.doc(this.$cookies.get('session')).get().then(doc => {
      this.userInfo.level = doc.data().Level
      this.userInfoLoaded |= 1
    }).catch(err => console.log('in overview userInfo, ', err))

    // userHistory records the statistic data from the history
    userHistory.doc(this.$cookies.get('session')).get().then(doc => {
      this.userInfo.history = doc.data()
      this.userInfoLoaded |= 2
    })

    // get the user data from self-defined server
    if (this.$cookies.get('session') === 'haha') {
      console.log('requsting for data...')
      let config = {timeout: 3*1000}
      this.$http.get(recorderServer, config).then(response => {
        this.userInfo.battle = response.body
        this.userInfoLoaded |= 4
        console.log('data received!!')
      }, err => {
        console.log('error occurred: ', err)
        this.userInfoLoaded |= 4
      });
    }
  },
  data () {
    return {
      userInfoLoaded: 0,
      userBattle: [],
      displayComp: null
    }
  },
  methods: {
    setDisplayComp (comp) {
      this.displayComp = comp
    }
  },
  components: {
    Sidebar
  }
}
