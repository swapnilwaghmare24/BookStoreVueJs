// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    IsSignedIn: false
  },
  getters: {},
  mutations: {
    setsignedin (state, status) {
      state.IsSignedIn = status
    }
  },
  actions: {}
})
