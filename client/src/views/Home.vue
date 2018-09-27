<template>
  <div class="home">
    <div class="containerHomeItem">
      <div v-if="isLogin">
        <user-card ></user-card>
        <search-tweet></search-tweet>
      </div>
      <div class="middle">
        <create-tweet v-if="isLogin"></create-tweet>
        <show-tweet></show-tweet>
      </div>
      <div v-if="isLogin">
        <random-user></random-user>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateTweet from '@/components/CreateTweet.vue'
import ShowTweet from '@/components/ShowTweet.vue'
import UserCard from '@/components/UserCard.vue'
import SearchTweet from '@/components/SearchTweet.vue'
import RandomUser from '@/components/RandomUser.vue'

export default {
  name: 'home',
  components: {
    CreateTweet,
    ShowTweet,
    UserCard,
    SearchTweet,
    RandomUser
  },

  created () {
    this.$store.dispatch('getRandomUser')
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
