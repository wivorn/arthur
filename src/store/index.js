import Vue from 'vue'
import Vuex from 'vuex'
import data from '../data.json'

Vue.use(Vuex)

const UPDATE_TODAY = 'UPDATE_TODAY'
const UPDATE_SAVED = 'UPDATE_SAVED'
const UPDATE_RECOMMENDED = 'UPDATE_RECOMMENDED'
const SHOW_POPUP = 'SHOW_POPUP'
const HIDE_POPUP = 'HIDE_POPUP'

export const store = new Vuex.Store({
  state: {
    data: data,
    today: [data.resources.knowledge[5], data.resources.knowledge[0], data.resources.products[1], data.resources.services[0]],
    saved: [],
    recommended: [],
    popup: false,
    current: {}
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
    },
    [SHOW_POPUP] (state, data) {
      state.popup = true
      state.current = data
    },
    [HIDE_POPUP] (state) {
      state.popup = false
      state.current = {}
    }
  },
  actions: {
    saveItem ({ commit, state }, index) {
      var today = state.today
      var saved = state.saved
      saved.push(today.splice(index, 1)[0])
      commit(UPDATE_SAVED, saved)
      commit(UPDATE_TODAY, today)
    },
    recommendItem ({ commit, state }, index) {
      var saved = state.saved
      var recommended = state.recommended
      recommended.push(saved.splice(index, 1)[0])
      commit(UPDATE_SAVED, saved)
      commit(UPDATE_RECOMMENDED, recommended)
    },
    showPopup ({ commit, state }, data) {
      commit(SHOW_POPUP, data)
    },
    hidePopup ({ commit, state }) {
      commit(HIDE_POPUP)
    }
  }
})
