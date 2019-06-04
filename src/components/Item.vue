<!--Item.vue-->

<template>
  <div :class="['todo-item', todo.completed ? 'completed' : '']">
    <input
      type="checkbox"
      id="toggle"
      v-model="todo.completed"
    >
    <label>{{todo.content}}</label>
    <button class="del" @click="deleteTodo"></button>
  </div>
</template>

<script>
  export default {
    props: {
      todo: {
        type: Object,
        required: true,
      }
    },
    methods: {
      deleteTodo() {
        // 触发事件,在父组件中用@del="deleteTodo"的方式监听，
        // 实现父子组件间事件的解耦
        this.$emit('del', this.todo.id);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .todo-item {
    position: relative;
    background-color: white;
    font-size: 24px;
    border-bottom: 1px solid pink;

    &:hover {
      .del:after {
        content: 'x';
      }
    }

    label {
      white-space: pre-line;
      word-break: break-all;
      padding: 15px 60px 15px 15px;
      margin-left: 45px;
      display: block;
      line-height: 1.2;
      transition: color 0.4s;
    }

    &.completed {
      label {
        color: #d9d9d9;
        text-decoration: line-through;
      }
    }
  }

  #toggle {
    position: absolute;
    text-align: center;
    width: 20px;
    height: 20px;
    left: 10px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border: none;
    outline: none;
  }

  .del {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 10px;
    width: 40px;
    height: 40px;
    margin: auto 0;
    color: red;
    background-color: transparent;
    font-size: 30px;
    border-width: 0;
    cursor: pointer;
    outline: none;
  }
</style>