import 'video.js/dist/video-js.css'             // module necesary for vue-video-player
import { videoPlayer } from 'vue-video-player'  // module necessary for vue-video-player

export default {
  components: {
    videoPlayer
  },
  props: {
    videoId: {
      type: String,
      default: '1'
    },
    videoDB: {
      type: Array,
      default: []
    },
    videoInfoLoaded: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      testId: 0,
      // config for the vue-video-player component
      playerOptions: {
        autoplay: true,
        controls: false,
        muted: true,
        width: '800', // by default 1024*576
        height: '450',
        // language: 'en',
        // playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: ''
        }],
        // poster: "/static/images/author.jpg",
      }
    }
  },
  mounted () {
    if (!this.videoInfoLoaded) {
      this.$router.push('/Training')
    }
    this.playerOptions.sources[0].src = this.parseUrl(this.videoId)
  },
  // activated() {
  //   this.player.play()
  // },
  // deactivated() {
  //   this.playerOptions.sources[0].src = this.parseUrl(this.videoId+1)
  // },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    parseUrl (videoId) {
      if (videoId < this.videoDB.length-1) {
        let videoIndex = this.videoDB[0].indexOf('Drive Link')
        // return this.videoDB[this.videoId][videoIndex].split('open?').join('uc?export=open&')
        return this.videoDB[videoId][videoIndex].split('open?').join('uc?export=download&')
      }
    },
    playerReady () {
      // at this moment, the remainingTime is not computed yet
      // this.player.pause()
    },
    playerPlayed () {
      // this.player.currentTime( Math.round(this.player.remainingTime()*10)/10 - 5)
    },
    playerEnded () {
      this.$router.replace({path: '/training/positioning/' + this.videoId})
    }
  }
}