import { createStore } from 'vuex';

const store = createStore({
  state: {
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearToken(state) {
      state.token = '';
      localStorage.removeItem('token');
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    }
  },
  actions: {
    login({ commit }, { token, user }) {
      commit('SET_TOKEN', token);
      commit('SET_USER', user);
    },
    logout({ commit }) {
      commit('SET_TOKEN', null);
      commit('SET_USER', null);
    },
    loadUserFromLocalStorage({ commit }) {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken) {
        commit('setUser', JSON.parse(storedUser));
        commit('setToken', storedToken);
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    getUser: state => state.user
  }
});

store.dispatch('loadUserFromLocalStorage');

export default store;
