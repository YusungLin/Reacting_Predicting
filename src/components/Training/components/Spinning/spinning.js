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
    }
  },
  data () {
    return {
      testId: 0,
      tagNames: ['上旋', '下旋', '不轉', '右側上旋', '右側下旋', '左側上旋', '左側下旋'],
      pickedTag: '',
      updated: false,
      timerTime: 0
    }
  },
  methods: {
    nextVideo () {
      this.timerTime = this.timerTime ? this.timerTime : Math.round((+(new Date()) - this.timer)/1000 * 10) / 10
      if (this.pickedTag) {
        const userDoc = userTraining.doc(this.$cookies.get('session'))
        userDoc.get().then(doc => {
          userDoc.update({[this.videoId]: {
            x: doc.data()[this.videoId].x,
            y: doc.data()[this.videoId].y,
            spinning: this.pickedTag,
            timer: this.timerTime
          }}).then(() => {
            this.updated = true
          })
        })
        // we use implicit casting here
        if (this.videoId < 3) {//this.videoDB.length) {
          this.$router.replace({path: '/training/videopage/' + (Number(this.videoId)+1)})
        } else if (this.updated) {
          this.$router.replace({path: '/training/results/'})
        }
      }
    }
  }
}