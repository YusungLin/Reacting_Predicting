import MarkOnClick from './components/MarkOnClick'
import { userTraining } from '@/firebase'

export default {
  props: {
    videoId: {
      type: String,
      default: '1'
    },
    videoDB: {
      type: Array,
      default: []
    },
    timer: {
      type: Number,
      default: 0
    },
    setTimer: {
      type: Function,
      default: null
    }
  },
  mounted () {
    this.setTimer( +(new Date()) )
  },
  data () {
    return {
      testId: 0,
      clicked: false,
      submit: false,
      
      marker: null,
      markerPosX: 0,    // data binding to marker
      markerPosY: 0,
      returnPosX: 0,    // data returning to database
      returnPosY: 0,
      ansMarker: null,
      ansMarkerPosX: 0,
      ansMarkerPosY: 0,

      tableOffsetX: 0,  // offset of the tennis-table element (to reuse instead of re-calculating)
      tableOffsety: 0,
      tableHeight: 0,   // measure of the tennis-table element (to reuse instead of re-calculating)
      tableWidth: 0,
    }
  },
  methods: {
    markPos (event) {
      if (!this.submit) {
        // css styles of tennis-table
        this.tableOffsetX = this.$refs.tennisTable.getBoundingClientRect().x
        this.tableOffsetY = this.$refs.tennisTable.getBoundingClientRect().y
        this.tableHeight = window.getComputedStyle(this.$refs.tennisTable).height.split('px')[0]
        this.tableWidth = window.getComputedStyle(this.$refs.tennisTable).width.split('px')[0]

        // render the marker and keep the marker within the table
        this.marker = MarkOnClick
        let tableX = event.clientX - this.tableOffsetX
        let tableY = event.clientY - this.tableOffsetY
        this.markerPosX = tableX < 0 ? this.tableOffsetX : (tableX > this.tableWidth ? (this.tableOffsetX + this.tableWidth) : event.clientX)
        this.markerPosY = tableY < 0 ? this.tableOffsetY : (tableY > this.tableHeight ? (this.tableOffsetY + this.tableHeight) : event.clientY)

        // turn the unit from broswer into real-world tennis table (round to the 1st digit)
        const tableHeight = 137
        const tableWidth = 152.5
        this.returnPosX = Math.round( (this.markerPosX - this.tableOffsetX) * tableWidth/this.tableWidth * 10 )/10
        // the default origin is on the left-top corner, while we want it to be left-down corner
        this.returnPosY = Math.round( (this.tableHeight - (this.markerPosY - this.tableOffsetY)) * tableHeight/this.tableHeight * 10 )/10

        this.clicked = true
      }
    },
    showAnswer () {
      if (this.clicked) {
        // find the x, y index in our videoDB
        let xId = this.videoDB[0].indexOf('X')
        let yId = this.videoDB[0].indexOf('Y')
        xId = xId !== -1 ? xId : this.videoDB[0].indexOf('x')
        yId = yId !== -1 ? yId : this.videoDB[0].indexOf('y')
        
        // turn the unit from the real-world tennis table into browser
        const tableHeight = 137
        const tableWidth = 152.5
        let ansX = this.videoDB[this.videoId][xId]
        let ansY = this.videoDB[this.videoId][yId]
        this.ansMarkerPosX = Math.round( (ansX * this.tableWidth / tableWidth + this.tableOffsetX) * 10 ) / 10
        this.ansMarkerPosY = Math.round( ((137 - ansY) * this.tableHeight / tableHeight + this.tableOffsetY) * 10 ) / 10

        // render the marker
        this.ansMarker = MarkOnClick

        this.submit = true
      }
    },
    nextQuesiton () {
      if (this.submit) {
        const userDoc = userTraining.doc(this.$cookies.get('session'))
        userDoc.update({[this.videoId]: {
          x: this.returnPosX,
          y: this.returnPosY
        }})
        this.$router.replace({path: '/training/spinning/' + this.videoId})
      }
    }
  },
  components: {
    MarkOnClick
  }
}
