<template>
  <div id="app">
    <div id="cover"></div>
    <Header/>
    <Todo/>
    <Footer/>
  </div>
</template>

<script>
  import Header from './components/Header.vue';
  import Footer from './components/Footer.jsx';
  import Todo from './components/Todo.vue';

  export default {
    components: {
      Header,
      Footer,
      Todo
    }
  }
</script>

<style scoped>
  #app {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  /* 实现虚化效果*/
  #cover {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #999;
    opacity: .6;
    z-index: -1;
  }
</style>