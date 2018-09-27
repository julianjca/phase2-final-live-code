<template>
  <div class="card">
    <h3>Recently Followed</h3>
    <h4 v-for="(username,index) in userData.following" :key="index">{{username.username}}</h4>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      text: 'Follow',
      alreadyFollowed: false
    }
  },
  name: 'RecentlyFollowed',
  computed: {
    userData () {
      return this.$store.state.user
    }
  },

  methods: {

  }
}
</script>

<style scoped>
h5 {
  color: white;
  background-color: #0384b4;
  padding: 3px 3px;
  border-radius: 5px;
}
</style>
