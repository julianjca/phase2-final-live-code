<template>
  <div class="random-user">
    <h3 @click="getNewRandom">refresh</h3>
    <random-card v-for="(user,index) in users" :key="index" :user="user"></random-card>
  </div>
</template>

<script>
import RandomCard from '@/components/RandomCard.vue'
export default {
  name: 'RandomUser',
  computed: {
    users () {
      return this.$store.state.randomUser
    }
  },
  components: {
    RandomCard
  },
  methods: {
    getNewRandom () {
      this.$store.dispatch('checkToken')
    }
  }
}
</script>

<style scoped>
h3 {
  cursor: pointer;
  border: 1px solid black;
  border-radius: 5px;
}
</style>
