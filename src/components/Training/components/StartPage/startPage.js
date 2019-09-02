import { userTraining } from '@/firebase'

export default {
  props: {
    videoInfoLoaded: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    startTraining () {
      if (this.videoInfoLoaded) {
        userTraining.doc(this.$cookies.get('session')).set({})
        this.$router.replace({path: '/training/videopage/1'})
      } else {
        // insert a loading page
      }
    }
  }
}