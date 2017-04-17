<template>
  <div>
    <p>当前计数值为：{{count}}</p>
  </div>
</template>

<script>
  export default {
    computed:{
      count(){
        return this.$store.state.count;
      }
    }
  }
</script>
