import Vue from 'vue'
import Vuex from 'vuex'
import data from '../data.json'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    data: data,
    user: [data.resources.knowledge[0], data.resources.products[1], data.resources.services[2]]
  }
})
