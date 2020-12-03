import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: "light",
    notLogged: true
  },
  mutations: {
    updateTheme(state, value) {
      this.state.theme = value
    },
    updateLoggedState(state, value) {
      this.state.notLogged = value
    }
  },
  actions: {
  },
  modules: {
  }
})
