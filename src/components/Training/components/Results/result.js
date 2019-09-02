import { userTraining, userHistory } from '@/firebase'
import XLSX from 'xlsx'
import FileSaver from 'file-saver'

export default {
  props: ['videoDB', 'userInfo'],
  data () {
    return {
      // array for table header
      tagList: ['上旋', '下旋', '不轉', '右側上旋', '右側下旋', '左側上旋', '左側下旋'],
      tableHeaders: ['題目', '選擇', '正解', '誤差（cm）', '水平誤差', '垂直誤差', '耗時（秒）'],

      numberOfVideos: 0,
      // array for dataset
      userAnswers: [],
      correctAnswers: [],
      distances: [],
      deltaXs: [],
      deltaYs: [],
      durations: [],
    }
  },
  async mounted () {
    // calculating data for rendering
    // get the user data from the server
    let trainingDoc = await userTraining.doc(this.$cookies.get('session')).get()
    let submission = trainingDoc.data()
    let totalLength = Object.keys(submission).length
    // the number of rows in the table showing results
    this.numberOfVideos = totalLength
    let xId = this.videoDB[0].indexOf('X')
    let yId = this.videoDB[0].indexOf('Y')
    let spinId = this.videoDB[0].indexOf('Spin')

    this.videoDB.slice(1, totalLength+1).forEach((ans, index) => {
      // index iterates through 0~end; submission is labeled as 1~end+1
      this.userAnswers.push(submission[index + 1].spinning)
      // ans is labeled as 1~7; tagList is referenced as 0~6
      this.correctAnswers.push(this.tagList[ ans[spinId]-1 ])
      this.deltaXs.push( Math.round( Math.abs(submission[index + 1].x - ans[xId]) * 10) / 10 )
      this.deltaYs.push( Math.round( Math.abs(submission[index + 1].y - ans[yId]) * 10) / 10 )
      this.distances.push( Math.round( Math.sqrt( Math.abs(this.deltaXs[index]**2 - this.deltaYs[index]**2)) * 10) / 10 )
      this.durations.push(submission[index + 1].timer)
    });

    // calculating data for statistics
    let userDoc = userHistory.doc(this.$cookies.get('session'))
    // calculating data about errors
    let numOfErr = 0
    let maxErr = []
    // generate an array of 7 0s
    let errOptions = [...Array(7).keys()].map((ele,index) => ele - index)
    // an array of true/false runs forEach
    this.userAnswers.map((choice, index) => choice === this.correctAnswers[index]).forEach((ele, index) => {
      // record the wrong choices and classify them according to correct answers
      if (!ele) {
        // the correctAnswer is labeled as 1~7; the errOptions is indexed as 0~6
        errOptions[ this.tagList.indexOf(this.correctAnswers[index]) ] += 1
      }
    })
    // get the highest from the seven spinning options
    errOptions.forEach((times, index) => {
      numOfErr += times
      maxErr = (!times || (maxErr.length && maxErr[0].times > times)) ?
        maxErr :
          (!maxErr.length || maxErr[0].times < times) ?
            [{spin:index, times:times}] :
            [...maxErr, {spin:index, times:times}]
    })
    maxErr = maxErr.map(spinObj => this.tagList[spinObj.spin])
    console.log(maxErr)

    // calculating data about time
    let time = 0
    this.durations.forEach(t => time += t)
    
    userDoc.update({
      TotalQues: this.userInfo.history.TotalQues + this.numberOfVideos,
      TotalErr: this.userInfo.history.TotalErr + numOfErr,
      AveErrRate: Math.round((this.userInfo.history.TotalErr + numOfErr) / (this.userInfo.history.TotalQues + this.numberOfVideos) * 10) / 10,
      PrevErrRate: Math.round(numOfErr / this.numberOfVideos * 10) / 10,
      MostErr: maxErr,
      TotalTime: this.userInfo.history.TotalTime + time,
      AveTime: Math.round((this.userInfo.history.TotalTime + time) / (this.userInfo.history.TotalQues + this.numberOfVideos) * 10) / 10,
      PrevTime: time,
      TimePerQues: Math.round(time / this.numberOfVideos * 10) / 10,
      TrainingTimes: this.userInfo.history.TrainingTimes + 1
    })
  },
  methods: {
    savefile () {
      // save the data to the database on the server
      // userHistory...

      // workbook is a xlsx file, and worksheet is a page in it
      // let workbook = XLSX.utils.table_to_book(this.$refs.rawTableResults, {sheet: "Training Results"})
      let workbook = XLSX.utils.book_new();
      workbook.SheetNames.push('訓練結果')
      let worksheetResult = XLSX.utils.table_to_sheet(this.$refs.rawTableResults)
      workbook.Sheets['訓練結果'] = worksheetResult
      // (TBC...)
      // or it can be added as a worksheet to an existing workbook
      // workbook.SheetNames.push('訓練統計資料')
      // let worksheetStat = XLSX.utils.aoa_to_sheet([['hello', 'world']])
      // workbook.Sheets['訓練統計資料'] = worksheetStat

      let wbStream = XLSX.write(workbook, {bookType:'xlsx', type:'binary'})
      function converter(stream) {
        // convert stream to ArrayBuffer
        let streamBuff = new ArrayBuffer(stream.length)
        //create uint8array as viewer
        let view = new Uint8Array(streamBuff)
        //convert to octet
        for (let i = 0; i < stream.length; ++i)
          view[i] = stream.charCodeAt(i) & 0xFF
        return streamBuff
      }
      let blob = new Blob([converter(wbStream)], {type:"application/octet-stream"})
      FileSaver.saveAs(blob, `${this.$cookies.get('session')}'s result.xlsx`)
    },
    leave () {
      this.$router.replace({path: '/overview'})
    }
  }
}
