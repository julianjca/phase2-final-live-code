<template>
  <div class="card">
    <h4>username : {{user.username}}</h4>
    <h4>name : {{user.name}}</h4>
    <h5 @click="follow(user._id)" v-if="!alreadyFollowed">{{text}}</h5>
    <h5 v-else>{{text}}</h5>
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
    },
    userData () {
      return this.$store.state.user
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
  },

  mounted () {
    console.log(this.userData.following)
    for (let i = 0; i < this.userData.following.length; i++) {
      if (this.userData.following[i]._id === this.user._id) {
        this.alreadyFollowed = true
        this.text = 'followed'
      }
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
