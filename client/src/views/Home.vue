<template>
  <div class="home">
    <div class="containerHomeItem">
      <div>hahahha</div>
      <div class="middle">
        <create-tweet v-if="isLogin"></create-tweet>
        <show-tweet></show-tweet>
      </div>
      <div>hahaha</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateTweet from '@/components/CreateTweet.vue'
import ShowTweet from '@/components/ShowTweet.vue'

export default {
  name: 'home',
  components: {
    CreateTweet,
    ShowTweet
  },

  created () {
    this.$store.dispatch('getTweet')
  },

  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
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
}
</style>
