import { createStore } from 'vuex';

const defaultState = {
  count: 0,
  currentRoute: [],
  menuStatus: false,
}
const store = createStore({
  state () {
    return {
      ...defaultState
    }
  },
  mutations: {
    increment (state: typeof defaultState) {
      state.count++
    },
    setCurrentRoute(state, route) {
      state.currentRoute = route; // 将当前路由信息存储到 Vuex 中
    },
    setRoutesAdded(state,status){
      state.menuStatus = status;
    },
  }
})
export default store;