import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const baseUrl = `http://localhost:3000`

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    err: '',
    tweets: [],
    userId: ''
  },

  mutations: {
    changeLoginStatus (state) {
      state.isLogin = true
    },

    changeError (state) {
      state.err = 'username/password is wrong'
      setTimeout(() => {
        state.err = ''
      }, 1500)
    },

    logout (state) {
      state.isLogin = false
    },

    changeTweets (state, payload) {
      state.tweets = payload
    },

    getUserId (state, payload) {
      state.userId = payload
    }
  },

  actions: {
    sendLogin (context, obj) {
      axios({
        method: 'POST',
        url: `${baseUrl}/users/login`,
        data: obj
      })
        .then(response => {
          localStorage.setItem('token', response.data.token)
          context.commit('changeLoginStatus')
        })
        .catch(err => {
          console.log(err)
          context.commit('changeError')
        })
    },

    checkToken (context, obj) {
      const token = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: `${baseUrl}/users/auth`,
        headers: {
          token: token
        }
      })
        .then(response => {
          context.commit('changeLoginStatus')
          context.commit('getUserId', response.data.data._id)
        })
        .catch(err => {
          console.log(err)
          context.commit('changeError')
        })
    },

    sendLogout (context) {
      console.log('masuk')
      localStorage.removeItem('token')
      context.commit('logout')
    },

    getTweet (context, payload) {
      console.log(payload)
      console.log('masuk')
      context.commit('changeTweets', payload)
    },

    getNewTweet (context) {
      console.log('hahaha')
      axios({
        method: 'GET',
        url: `${baseUrl}/tweets`
      })
        .then(response => {
          context.commit('changeTweets', response.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    createTweet ({ commit, dispatch }, payload) {
      const token = localStorage.getItem('token')
      console.log('masuk')

      axios({
        method: 'POST',
        url: `${baseUrl}/tweets`,
        headers: {
          token: token
        },
        data: {
          tweet: payload
        }
      })
        .then(response => {
          console.log(response)
          setTimeout(() => {
            dispatch('getNewTweet')
          }, 1000)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
