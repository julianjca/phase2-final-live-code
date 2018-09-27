<template>
  <div class="userCard">
    <h2>@{{user.username}}</h2>
    <h3>{{user.name}}</h3>
    <h4>Tweets : {{user.tweets.length}}</h4>
    <h4>Following : {{user.following.length}}</h4>
    <h4>Followers : {{user.followers.length}}</h4>

  </div>
</template>

<script>
export default {
  name: 'UserCard',
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style>
</style>
