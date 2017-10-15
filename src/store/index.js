import Vue from 'vue'
import Vuex from 'vuex'
import data from '../data.json'

Vue.use(Vuex)

const UPDATE_TODAY = 'UPDATE_TODAY'
const UPDATE_SAVED = 'UPDATE_SAVED'
const UPDATE_RECOMMENDED = 'UPDATE_RECOMMENDED'

export const store = new Vuex.Store({
  state: {
    data: data,
    today: [data.resources.knowledge[5], data.resources.knowledge[0], data.resources.products[1], data.resources.services[0]],
    saved: [],
    recommended: []
  },
  mutations: {
    [UPDATE_TODAY] (state, today) {
      state.today = today
    },
    [UPDATE_SAVED] (state, saved) {
      state.saved = saved
    },
    [UPDATE_RECOMMENDED] (state, recommended) {
      state.recommended = recommended
    }
  },
  actions: {
    saveItem ({ commit, state }, index) {
      var today = state.today
      var saved = state.saved
      saved.push(today.splice(index, 1)[0])
      commit(UPDATE_SAVED, saved)
      commit(UPDATE_TODAY, today)
    }
  }
})
