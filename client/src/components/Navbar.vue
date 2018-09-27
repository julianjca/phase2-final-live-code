<template>
  <div class="navbar">
      <h1 @click="goToHome">Tuiter</h1>
      <div id="logininput">
        <input type="text" placeholder="username/email" v-model="user" v-if="!isLogin">
        <input type="password" placeholder="password" v-model="password" v-if="!isLogin">
        <span id="err">{{err}}</span>
        <h2 @click="sendLogin" v-if="!isLogin">Login</h2>
        <h2 @click="goToProfile" v-if="isLogin" id="profile">Profile</h2>
        <h2 @click="sendLogout" v-if="isLogin" id="logout">Logout</h2>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Navbar',
  data () {
    return {
      user: '',
      password: '',
      baseUrl: 'http://localhost:3000'
    }
  },
  methods: {
    sendLogin () {
      const obj = {
        user: this.user,
        password: this.password
      }
      this.user = ''
      this.password = ''
      this.$store.dispatch('sendLogin', obj)
    },
    sendLogout () {
      console.log('hehehe')
      this.$store.dispatch('sendLogout')
    },

    goToHome () {
      axios({
        method: 'GET',
        url: `${this.baseUrl}/tweets`
      })
        .then(response => {
          this.$store.dispatch('getTweet', response.data.data)
        })
        .catch(err => {
          console.log(err)
        })
      this.$router.push('/')
    },

    goToProfile () {
      this.$store.dispatch('getTweet', this.user.tweets)
    }
  },

  computed: {
    err () {
      return this.$store.state.err
    },
    isLogin () {
      return this.$store.state.isLogin
    },
    userData () {
      return this.$store.state.user
    }
  }
}
</script>

<style scoped>
.navbar {
  display: grid;
  grid-template-columns: 1fr 3fr;
  color: #0384b4;
}
#logininput {
  padding-top: 5px;
  display: inline-block;
}
#logininput input {
  display: inline-block;
  margin-right: 30px;
  height: 25px;
  width: 180px;
}
#logininput h2 {
  display: inline-block;
}

h2 {
  font-size: 20px;
  background-color: #0384b4;
  color: white;
  border-radius: 10px;
  width: 80px;
  padding: 5px 0;
  text-align: center;
  cursor: pointer;
}

#err,
span {
  color: red !important;
}

#logout {
  margin-top: 30px;
  margin-left: 50px;
}

#profile {
  margin-left: 500px;
}

h1 {
  cursor: pointer;
}
</style>
