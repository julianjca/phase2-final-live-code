<template>
  <div>
    <input type="text" v-model="keyword">
    <h2 @click="findTweet">submit</h2>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SearchTweet',
  data () {
    return {
      keyword: ''
    }
  },

  computed: {
    userId () {
      return this.$store.state.userId
    }
  },

  methods: {
    findTweet () {
      let self = this
      axios({
        method: 'POST',
        url: `http://localhost:3000/tweets/search`,
        data: {
          keyword: this.keyword
        }
      })
        .then(response => {
          this.$store.dispatch('showSearchResult', response.data)
          self.keyword = ''
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
h2 {
  font-size: 20px;
  background-color: #0384b4;
  color: white;
  border-radius: 10px;
  width: 80px;
  padding: 5px 0;
  text-align: center;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
}

textarea {
  width: 500px;
  margin-left: auto;
  margin-right: auto;
}
</style>
