export default {
  props: {
    userInfo: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.decoder()
  },
  data () {
    return {
      roundWin: [],
      roundLoss: []
    }
  },
  methods: {
    decoder () {
      // "Rule: frozenset({'2B9'}) -> frozenset({'A'})",
      // cause[0]: 1:我方, 2:對方
      // cause[1]: F:正手, B:反手
      // cause[2]: 
      //   -------- 7  8  9
      //    6 5 4 | 10 11 12
      //    3 2 1 -----------
      let resultArr = []
      this.userInfo.battle.forEach(rule => {
        let tokens = rule.split('frozenset({\'')
        let cause = tokens[1].split('\'')[0]
        let result = tokens[2].split('\'')[0]
        if (cause.length === 3)
          resultArr.push({cause: cause, result: result})
      })
      resultArr.forEach(data => {
        let round = ''
        round += data.cause[0] === '1' ? '我方 / ' : '對方 / '
        round += `${data.cause[2]}號位 / `
        round += data.cause[1] === 'F' ? '正手' : '反手'
        if (data.result === 'A') {
          this.roundWin.push( round )
        } else {
          this.roundLoss.push( round )
        }
      })
      this.analysis()
    },
    analysis () {
      let lossArr = []
      this.roundLoss.forEach(ele => {
        let position = Number(ele.split(' / ')[1][0])
        if (position <= 6)
        lossArr.push( position )
      })
      this.userInfo.weakness = lossArr
    }
  }
}