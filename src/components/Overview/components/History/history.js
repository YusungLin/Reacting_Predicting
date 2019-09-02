
export default {
  props: {
    userInfo: {
      type: Object,
      default: null
    },
    setDisplayComp: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      tableHeaders: ['訓練次數', '平均錯誤率', '上次錯誤率', '最常錯誤', '平均用時', '上次平均用時'],
      tableDataLabels: ['TrainingTimes', 'AveErrRate', 'PrevErrRate', 'MostErr', 'AveTime', 'TimePerQues']
    }
  },
  mounted () {
    if (this.userInfo.history['MostErr'].length === 0)
      this.userInfo.history['MostErr'] = '-'
  }
}