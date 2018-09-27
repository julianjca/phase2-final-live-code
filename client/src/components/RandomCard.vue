<template>
  <div class="card">
    <h4>username : {{user.username}}</h4>
    <h4>username : {{user.username}}</h4>
    <h5 @click="follow(user._id)">{{text}}</h5>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['user'],
  data () {
    return {
      text: 'Follow',
      alreadyFollowed: false
    }
  },
  name: 'RandomCard',
  computed: {
    userId () {
      return this.$store.state.userId
    }
  },

  methods: {
    follow (id) {
      console.log(id)
      let self = this
      axios({
        method: 'POST',
        data: {
          followId: id,
          userId: this.userId
        },
        url: `http://localhost:3000/users/follow`
      })
        .then(response => {
          self.text = 'followed'
          self.$store.dispatch('checkToken')
        })
        .catch(err => {
          console.log(err)
        })
    }
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
