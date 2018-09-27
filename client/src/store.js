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
    userId: '',
    user: {},
    randomUser: []
  },

  mutations: {
    changeLoginStatus (state) {
      state.isLogin = true
    },

    changeError (state) {
      state.err = 'username/password is wrong'
      setTimeout(() => {
        state.err = ''
      }, 500)
    },

    logout (state) {
      state.isLogin = false
      state.userId = ''
      state.user = {}
    },

    changeTweets (state, payload) {
      state.tweets = payload
    },

    getUserId (state, payload) {
      state.userId = payload
    },

    getUserData (state, payload) {
      state.user = payload
    },

    changeRandomUser (state, payload) {
      state.randomUser = payload
    }
  },

  actions: {
    sendLogin ({ commit, dispatch }, obj) {
      axios({
        method: 'POST',
        url: `${baseUrl}/users/login`,
        data: obj
      })
        .then(response => {
          localStorage.setItem('token', response.data.token)
          commit('changeLoginStatus')

          setTimeout(() => {
            dispatch('checkToken')
          }, 500)
        })
        .catch(err => {
          console.log(err)
          commit('changeError')
        })
    },

    checkToken (context) {
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
          const obj = {
            username: response.data.data.username,
            name: response.data.data.name,
            following: response.data.data.following,
            followers: response.data.data.followers,
            tweets: response.data.data.tweets
          }
          context.commit('getUserId', response.data.data._id)
          context.commit('getUserData', obj)
          axios({
            method: 'GET',
            url: `${baseUrl}/users/random`
          })
            .then(resp => {
              console.log(resp)
              const result = []
              for (let i = 0; i < resp.data.response.length; i++) {
                if (resp.data.response[i]._id !== response.data.data._id) {
                  result.push(resp.data.response[i])
                }
              }
              context.commit('changeRandomUser', result)
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
          context.commit('changeError')
        })
    },

    sendLogout ({ commit, dispatch }) {
      console.log('masuk')
      localStorage.removeItem('token')
      commit('logout')
      dispatch('getNewTweet')
    },

    getTweet (context, payload) {
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
            dispatch('checkToken')
          }, 1000)
        })
        .catch(err => {
          console.log(err)
        })
    },

    showSearchResult (context, payload) {
      context.commit('changeTweets', payload)
    }
  }
})
