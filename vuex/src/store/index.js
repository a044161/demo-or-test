import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    count: 0,
    name: 'andy',
    age: 0,
    todo: [
      {id:1, text: '完成', done: true},
      {id:2, text: '未完成', done: false}
    ]
  },
  getters:{
    doneTodos: (state, getters) => {
      return state.todo.filter(todo => todo.done)
    }
  },
  mutations: {
    increment(state,payload){
      payload.amount = payload.amount ? payload.amount : 1;
      state.count += payload.amount;
    }
  },
  actions: {
    incrementAsync({commit}){
      setTimeout(()=>{
        commit({
          type: 'increment',
          amount: 1
        })
      },1000)

    }
  }
})

export default store
