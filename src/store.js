import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    companies: []
  },
  getters: {
    companies(state) {
      return state.companies;
    }
  },
  mutations: {
    initStore(state, data) {
      state.companies = data;
    },
    addCompany(state, data) {
      state.companies.push(data);
    },
    removeCompany(state, inn) {
      for (let i = 0; i < state.companies.length; i++) {
        if (inn == state.companies[i].inn) {
          state.companies.splice(i, 1);
          break;
        } else {
          continue;
        }
      }
    },
    changeCompany(state, payload) {
      for (let i = 0; i < state.companies.length; i++) {
        if (payload.inn == state.companies[i].inn) {
          Object.keys(payload.newData).forEach(key => {
            if (payload.newData[key]) {
              let a = payload.newData[key];
              state.companies[i][key] = a;
            }
          });
          break;
        } else {
          continue;
        }
      }
    }
  },
  actions: {
    initStore(state) {
      if (window.localStorage.getItem("companies") != null) {
        let arr = window.localStorage.getItem("companies");
        state.commit("initStore", JSON.parse(arr));
      }
    },
    addCompany(state, payload) {
      state.commit("addCompany", payload);
      state.dispatch("updateLocalStorage");
    },
    removeCompany(state, inn) {
      state.commit("removeCompany", inn);
      state.dispatch("updateLocalStorage");
    },
    changeCompany(state, payload) {
      state.commit("changeCompany", payload);
      state.dispatch("updateLocalStorage");
    },
    updateLocalStorage(state) {
      let array = JSON.stringify(state.getters.companies);
      window.localStorage.setItem("companies", array);
      state.dispatch("initStore");
    }
  }
});
