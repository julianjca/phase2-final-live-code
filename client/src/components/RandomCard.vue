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
      text: 'Follow'
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
      let self = this
      axios({
        method: 'PUT',
        data: {
          followId: id,
          userId: this.userId
        },
        headers: {
          token: localStorage.getItem('token')
        },
        url: `http://localhost:3000/users/follow`
      })
        .then(response => {
          self.text = 'followed'
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
