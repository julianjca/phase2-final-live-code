<template>
  <div id="containertweet">
    <single-tweet v-for="(tweet,index) in tweets" :key="index" :tweet="tweet" ></single-tweet>
  </div>
</template>

<script>
import axios from 'axios'
import SingleTweet from '@/components/SingleTweet.vue'

export default {
  name: `ShowTweet`,

  created () {
    axios({
      method: 'GET',
      url: `${this.baseUrl}/tweets`
    })
      .then(response => {
        this.$store.dispatch('getTweet', response.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  },

  methods: {
    getNewTweets () {
      axios({
        method: 'GET',
        url: `${this.baseUrl}/tweets`
      })
        .then(response => {
          this.$store.dispatch('getTweet', response.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },

  computed: {
    tweets () {
      return this.$store.state.tweets
    }
  },

  data () {
    return {
      baseUrl: `http://localhost:3000`
    }
  },

  components: {
    SingleTweet
  }
}
</script>

<style scoped>
#containertweet {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: block;
  width: 100%;
}
</style>
