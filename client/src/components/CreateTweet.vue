<template>
  <div>
    <textarea name="" id="" cols="30" rows="10" v-model="text"></textarea>
    <h2 @click="createTweet">submit</h2>
  </div>
</template>

<script>
export default {
  name: 'CreateTweet',
  data () {
    return {
      text: ''
    }
  },

  computed: {
    userId () {
      return this.$store.state.userId
    }
  },

  methods: {
    createTweet () {
      this.$store.dispatch('createTweet', this.text)
      this.text = ''
      setTimeout(() => {
        this.$store.dispatch('getNewTweet')
      }, 3000)
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
