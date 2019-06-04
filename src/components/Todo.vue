<!--Todo.vue-->

<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="添加任务"
      @keyup.enter="addTodo"
    >
    <Item
      :todo="todo"
      v-for="todo in filteredTodos"
      :key="todo.id"
      @del="deleteTodo"
    />
    <Tabs
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllCompleted"
    />
  </section>
</template>

<script>
  import Item from './Item.vue';
  import Tabs from './Tabs.vue';
  let id = 0;
  export default {
    data(){
      return {
        todos: [],
        filter: "all"
      }
    },
    components: {
      Item,
      Tabs
    },
    computed: {
      filteredTodos(){
        // 如果 filter的状态为all，显示所有的todos
        if(this.filter === 'all'){
          return this.todos;
        }
        // 筛选的方法就是让this.filter等于todo.completed，
        // 但是filter是一个字符串，所以加下面这个条件判断，
        // 得到一个true或false的值，用它去过滤todos列表
        const completed = this.filter === 'completed';
        // filter的结果返回true则显示，返回false则不显示
        return this.todos.filter(todo => completed === todo.completed)
      }
    },
    methods: {
      addTodo(e) {
        this.todos.unshift({
          id: id++,
          content: e.target.value.trim(),
          completed: false
        });
        e.target.value = '';
      },
      deleteTodo(id){
        this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1);
      },
      toggleFilter(state){
        this.filter = state;
      },
      clearAllCompleted(){
        this.todos = this.todos.filter(todo => !todo.completed);
      }
    }
  }
</script>

<style scoped>
  .real-app {
    width: 600px;
    margin: 0 auto;
    box-shadow: 0 0 5px #666;
  }

  .add-input {
    position: relative;
    width: 100%;
    min-height: 40px;
    padding-left: 60px;
    line-height: 40px;
    font-size: 16px;
    border: 3px solid pink;
    box-sizing: border-box;
    background-color: ghostwhite;
  }
</style>