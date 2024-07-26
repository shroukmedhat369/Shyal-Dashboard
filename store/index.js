// store/index.js

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'; // Import Axios if used in mutations



export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    flag: localStorage.getItem('flag') === 'true' || false,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
      console.log('token is set');// Set authorization header
    },
    clearToken(state) {
      state.token = '';
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization']; // Remove authorization header
    },
    setFlag(state, flag) {
      state.flag = flag;
      localStorage.setItem('flag', flag);
      console.log('flag is set');
    }
  },
  actions: {
    login(context, { token }) {
      context.commit('setToken', token); // Commit the 'setToken' mutation
      context.commit('setFlag', true); // Commit the 'setFlag' mutation
    },
    logout(context) {
      context.commit('clearToken'); // Commit the 'clearToken' mutation
      context.commit('setFlag', false); // Commit the 'setFlag' mutation
    }
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getFlag(state) {
      return state.flag;
    }
  }
});
