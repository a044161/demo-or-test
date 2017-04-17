<template>
  <div class="hello">
    <show-count></show-count>
    <div>{{count}}</div>
    <div>{{name}}</div>
    <button @click="addCount">加1</button>
    <button @click="addCountAsync">异步加1</button>
    <ul>
      <li v-for="(item,index) in todo" v-if="item.done">{{item.text}}</li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import ShowCount from './ShowCount';
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    addCount(){
      this.$store.commit({
        type: 'increment',
        amount: 5
      });
    },
    addCountAsync(){
      this.$store.dispatch('incrementAsync');
    }
  },
  computed:{
    count(){
      return this.$store.state.count;
    },
    ...mapState({
      name: state => state.name
    }),
    ...mapGetters({
      todo: 'doneTodos'
    })
  },
  components:{
    ShowCount
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
