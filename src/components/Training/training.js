import StartPage from './components/StartPage/StartPage'
import VideoPage from './components/VideoPage/VideoPage'
import Positioning from './components/Positioning/Positioning'
import Spinning from './components/Spinning/Spinning'
import Results from './components/Results/Results'

import { database } from '@/firebase'

export default {
  props: ['userInfo'],
  created () {
    database.ref(`__VideoDB_Level${this.userInfo.level}`).once('value').then(doc => {
      this.videoDB = doc.val()

      // shuffle the questions pool
      let length = Object.keys(this.videoDB).length - 1
      for (let index = 0; index < length; ++index) {
        // the first element is the title and should be unchanged
        if (index) {
          let randomIndex = index
          while(randomIndex === index || randomIndex === 0)
            randomIndex = Math.ceil(Math.random() * 100) % length
          let temp = this.videoDB[index]
          this.videoDB[index] = this.videoDB[randomIndex]
          this.videoDB[randomIndex] = temp
        }
      }
      this.strengthen.call(this)
      
      this.videoInfoLoaded = true
    }).catch(err => console.log('in training.js', err))
  },
  data () {
    return {
      videoDB: null,
      videoInfoLoaded: false,
      timer: 0
    }
  },
  methods: {
    setTimer (time) {
      this.timer = time
    },
    strengthen () {
      function pick (x1, x2, y1, y2, count) {
        let xid = this.videoDB[0].indexOf('X')
        let yid = this.videoDB[0].indexOf('Y')
        for(let i = count; i < Object.keys(this.videoDB).length; ++i) {
          if (x1 <= this.videoDB[i][xid] && this.videoDB[i][xid] < x2 && y1 <= this.videoDB[i][yid] && this.videoDB[i][yid] <= y2) {
            let temp = this.videoDB[count]
            this.videoDB[count] = this.videoDB[i]
            this.videoDB[i] = temp
            break
          }
        }
      }
      if (this.userInfo.weakness.length) {
        let count = 1
        this.userInfo.weakness.forEach(pos => {
          switch (pos) {
            case 1:
              // x <= 51, y < 63
              pick.call(this, 0, 51, 0, 63, count)
              break;
            case 2:
              // 51 < x <= 102, y < 63
              pick.call(this, 51, 102, 0, 63, count)
              break;
            case 3:
              // 102 < x, y < 63
              pick.call(this, 102, 153, 0, 63, count)
              break;
            case 4:
              // x <= 51, 63 < y
              pick.call(this, 0, 51, 63, 127, count)
              break;
            case 5:
                // 51 < x <= 102, 63 < y
              pick.call(this, 51, 102, 63, 127, count)
              break;
            case 6:
                // 102 < x, 63 < y
              pick (102, 153, 63, 127, count)
              break;
          }
          ++count
        })
      }
    }
  },
  components: {
    StartPage,
    VideoPage,
    Positioning,
    Spinning,
    Results
  }
}