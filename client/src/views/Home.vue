<template>
  <div class="home">
    <div class="containerHomeItem">
      <div >
        <user-card v-if="isLogin"></user-card>
        <search-tweet v-if="isLogin"></search-tweet>
        <recently-followed v-if="isLogin"></recently-followed>
      </div>
      <div class="middle">
        <create-tweet v-if="isLogin"></create-tweet>
        <show-tweet></show-tweet>
      </div>
      <div>
        <random-user v-if="isLogin"></random-user>
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
import RecentlyFollowed from '@/components/RecentlyFollowed.vue'

export default {
  name: 'home',
  components: {
    CreateTweet,
    ShowTweet,
    UserCard,
    SearchTweet,
    RandomUser,
    RecentlyFollowed
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
  width: 100%;
}
</style>
