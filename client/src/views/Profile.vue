<template>
  <div class="profile">
    <create-tweet v-if="isLogin"></create-tweet>
    <single-tweet v-for="(tweet,index) in tweets" :key="index" :tweet="tweet"></single-tweet>
  </div>
</template>

<script>
// @ is an alias to /src
import SingleTweet from '@/components/SingleTweet.vue'
import CreateTweet from '@/components/CreateTweet.vue'

export default {

  name: 'Profile',
  components: {
    SingleTweet, CreateTweet
  },

  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    userId () {
      return this.$store.state.userId
    },
    tweets () {
      const final = []
      for (let i = 0; i < this.$store.state.tweets.length; i++) {
        if (this.$store.state.tweets[i].user._id === this.userId) {
          final.push(this.$store.state.tweets[i])
        }
      }
      return final
    }
  },

  created () {
    this.$store.dispatch('getNewTweet')
  }
}
</script>

<style scoped>
.containerHomeItem {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
}

.middle {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
</style>
