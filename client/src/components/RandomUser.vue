<template>
  <div class="random-user">
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
  }
}
</script>

<style>
</style>
