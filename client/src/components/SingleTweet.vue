<template>
  <div id="singletweet">
    <h2>{{tweet.user.name}}</h2>
    <p>{{tweet.tweet}}</p>
    <h3 id="delete" v-if="tweet.user._id===userId" @click="removeTweet(tweet._id)">Delete</h3>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: `SingleTweet`,
  props: ['tweet'],
  computed: {
    user () {
      return this.$store.state.user._id
    },
    userId () {
      return this.$store.state.userId
    }
  },
  methods: {
    removeTweet (id) {
      axios({
        method: 'DELETE',
        url: `http://localhost:3000/tweets/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          this.$store.dispatch('getNewTweet')
        })
        .catch(err => {
          console.log(err)
        })
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
