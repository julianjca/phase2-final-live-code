<template>
  <div id="singletweet">
    <h2>{{tweet.user.name}}</h2>
    <p>{{tweet.tweet}}</p>
    <h3 id="delete" v-if="tweet.user._id===userId">Delete</h3>
  </div>
</template>

<script>
export default {
  name: `SingleTweet`,
  props: ['tweet'],
  computed: {
    user() {
      return this.$store.state.user._id
    },
    userId() {
      return this.$store.state.userId
    }
  }
}
</script>

<style scoped>
p {
  color: black;
}

#singletweet {
  border: 1px solid rgb(187, 187, 187);
  width: 80%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5px;
}

#delete {
  background-color: red;
  color: white;
  border-radius: 10px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
</style>
