<template>
  <div id="singletweet">
    <h2>{{tweet.user.name}}</h2>
    <p>{{tweet.tweet}}</p>
  </div>
</template>

<script>
export default {
  name: `SingleTweet`,
  props: ['tweet']
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
</style>
