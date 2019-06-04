# webpack+vue�todoӦ��

- Ŀ�ģ�
  - �ǰ�˹��̻���Ŀ`webpack`+`vue`

- Ŀ�꣺
  - ���ÿ���ʱǰ�˹���
  - ʵ��һ���򵥵�TODOӦ��
  - �Ż����ôﵽ���߱�׼

- �����汾��

```
"vue": "^2.6.10",
"vue-loader": "^15.7.0",
"vue-template-compiler": "^2.6.10",
"webpack": "^4.32.2",
"webpack-dev-server": "^3.5.1"��
"webpack-cli": "^3.3.2"
```

- ������

```
"dependencies": {
    "autoprefixer": "^9.5.1",
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-plugin-syntax-jsx": "^6.18.0",
    "babel-plugin-transform-vue-jsx": "^3.7.0",
    "babel-preset-env": "^1.7.0",
    "cross-env": "^5.2.0",
    "css-loader": "^2.1.1",
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "file-loader": "^3.0.1",
    "html-webpack-plugin": "^3.2.0",
    "postcss-loader": "^3.0.0",
    "style-loader": "^0.23.1",
    "stylus": "^0.54.5",
    "stylus-loader": "^3.0.2",
    "url-loader": "^1.1.2",
    "vue": "^2.6.10",
    "vue-loader": "^15.7.0",
    "vue-template-compiler": "^2.6.10",
    "webpack": "^4.32.2",
    "webpack-dev-server": "^3.5.1"
  },
  "devDependencies": {
    "webpack-cli": "^3.3.2"
  }
```

# `vue+webpack`��Ŀ��������

## ����`webpack`��Ŀ

### ��Ŀ��ʼ��

- ������Ŀ�ļ��У����ն�

```cmd
npm init
```

���� `package.json`

- ��װ��������

```cmd
npm install webpack vue vue-loader
```

- ��װ������һЩ���ѣ��������Ѱ���Ҫ������װ��ȥ

```cmd
npm i css-loader vue-template-compiler 
```

��ʱ��Ŀ�ͳ�ʼ�����ˡ�

## `webpack`��Ŀ����

### ��д�����

- �����ļ��� `src` ���ļ���`src/assets`���ļ�`src/App.vue`������ļ�`src/index.js`

��`App.vue`��д���¼�������룺

```javascript
// App.vue

<template>
  <div id="test">{{text}}</div>
</template>

<script>
export default {
  data() {
    return {
      text: 'abcd'
    }
  }
}
</script>

<style>
  #test {
    color: red;
  }
</style>
```

��Ȼ���������޷����������ֱ�����еģ�����Ĳ���ʹ���������С�

- ��`index.js`�н�`App`������ص�`dom`�ڵ��С�

```javascript
// index.js

/**
 * ����ļ�
 */
import Vue from 'vue';
import App from './App.vue';

const root = document.createElement('div');
document.body.appendChild(root);

// ����Vue���󣬽�App������ص�root�ڵ�
new Vue({
  render: (h) => h(App)
}).$mount(root)
```

> `webpack`�ǰ����Ǵ��ǰ����Դ�ģ����ǵ�ǰ����Դ�кܶ����ͣ�����˵`javascript` , `css `,`images`������ȣ���Щ����Ҫͨ��`http`����ȥ���ص����ݡ�

- �� `package.json`ͬ��λ�ý���`webpack.config.js`�ļ���

```javascript
// webpack.config.js

// path��nodejs�е�һ������������������·����
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  // �������,entryʹ�þ���·������֤��������
  entry: path.join(__dirname, 'src/index.js'),
  mode: 'production',
  // ����
  output: {
    // �������ļ�������index.js�Լ�����������Դ�����bundle.js��
    filename: 'bundle.js',
    // ���·��
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /.css$/,
        loader:['css-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
```

- ��`package.json`�����`build`:

> ֻ��������������`webpack`���Ż�������ǰ�װ����Ŀ�����`webpack`���������������ӣ�ֱ���������������䣬��ʹ�õ���ȫ�ֵ�`webpack`���汾���ܲ�һ����Ӧ����������ӡ�

```json
// package.json

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
+   "build": "webpack --config webpack.config.js"
  },
```

- ����

```cmd
npm run build
```

��ʱ����Ŀ�ļ���������`dist`�ļ��м�`dist/bundle.js`

### һЩ`loader`����

- �� `webpack.config.js`������������ݣ�

```javascript
module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader:  'url-loader',
            options: {
              limit: 1024,
              name: '[name]-aaa.[ext]'
            }
          }
        ]
      }
    ]
  }
```

��װ�����Ӧ��`loader`

```cmd
npm i style-loader url-loader file-loader
```

- �� `assets`�ļ����д���`assets/images`,`assets/styles`

- �� `styles`�´���`test.css`

```css
body{
     color: red;
     background-image: url('../images/do.jpg');
 }
```

- ��`index.js`��`import`���`test.css`��ͼƬ�ļ�

```javascript
// index.js

import './assets/styles/test.css';
import './assets/images/bg.jpg';
```

- ִ��

```cmd
npm run build
```

���Կ���ͼƬ���������`dist�ļ�����`��`bundle.js`��Ҳ����`test.css`������.

- �� `webpack.config.js`��moduleģ���rules�����cssԤ�������Ĺ���

```javascript
{
  test: /\.styl/,
  use: [
  	'style-loader',
  	'css-loader',
  	'stylus-loader'
	]
}
```

```cmd
npm i stylus-loader stylus
```

- �� `styles`Ŀ¼���½�`test-stylus.styl`�ļ�

```stylus
// test-stylus.styl

body
  font-size 20px
```

- �� `index.js`������`test-stylus.styl`

```javascript
import './assets/styles/test-stylus.styl';
```

- ����

```cmd
npm run build
```

��ʱ��Ŀ��Ŀ¼�ṹ���£�
![](./media/Ŀ¼�ṹ1.png)

## ����`webpack-dev-server`

- `webpack-dev-server`��һ��`webpack`�İ������ܷǳ�ǿ�󣬿���ȥ`webpack`����<https://webpack.docschina.org/configuration/>�鿴��ϸ���á����Ȱ�װ��

```cmd
npm i webpack-dev-server
```

- ��`package.json`�����"dev"

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.config.js",
+   "dev": "webpack-dev-server --config webpack.config.js"
  },
```

�޸�`webpack.config.js`����������Ӧ`webpack-dev-server`�Ŀ���ģʽ��

```javascript
module.exports = {
  // ����Ŀ����webƽ̨
+ target: 'web',
```

��Ϊ�ڲ�ͬ��ƽ̨�����û��������ķ�ʽ�ǲ�һ���ģ�ʹ��`cross-env`���ڲ�ͬ�Ļ�����ʹ��ͬ���Ľű���

```cmd
npm i cross-env
```

�޸�`package.json`

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
-   "build": "webpack --config webpack.config.js",
+   "build": "cross-env NODE_ENV=production webpack --config webpack.config.js",
-   "dev": "webpack-dev-server --config webpack.config.js",
+   "dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js"
  },
```

��`webpack.config.js`���жϣ�

```javascript
// webpack.config.js
// path��nodejs�е�һ������������������·����
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

- module.exports = {
+ const isDev = process.env.NODE_ENV === 'development';

+ const config = {
  ...
}

+ if(isDev){
+  config.devServer = {
    // �˿�
    port: 8080,
    // ����
    host: '0.0.0.0',
    // ʹwebpack������ʾ��ҳ����
    overlay: {
      error: true,
    }
  }
}


```

- ���`html`�ļ�ʹ��Ŀ����������ܴ򿪡�
- ���`html`���

```cmd
npm i html-webpack-plugin
```

���ò����

```javascript
+ const HTMLPlugin = require('html-webpack-plugin');

plugins: [
+   new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
+   new HTMLPlugin()
  ]
```

���У� 

```cmd
npm run dev
```

��������з��ʣ�<http://127.0.0.1:8080/>��<http://localhost:8080/>

��ʱ�ı�ҳ�����ݣ�**����**�����������ʾ�����Զ�ˢ�£���

- ������滻��`devtool`

```javascript
// ����ǿ���ģʽ���������������
if(isDev){
  // �����Ƿ����ɣ��Լ�������� source map
+ config.devtool = '#cheap-module-eval-source-map';
  config.devServer = {
    // �˿�
    port: 8080,
    // ����
    host: '0.0.0.0',
    // ʹwebpack������ʾ��ҳ����
    overlay: {
      error: true,
    },
    // �Զ��������
    // open: true,
    // ģ�����滻��ֻ���¸��ĵĲ���
+   hot: true
  };
  // ��Ӳ��
+ config.plugins.push(
    // ��ģ���滻���
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
}
```

- ����

```cmd
npm run dev
```

�ı����ݣ�ҳ��ֲ�ˢ�¡�

### �������

��ʱ���ļ����ݣ�

```javascript
// webpack.config.js

// path��nodejs�е�һ������������������·����
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';

const config = {
  // ����Ŀ����webƽ̨
  target: 'web',
  // �������,entryʹ�þ���·������֤��������
  entry: path.join(__dirname, 'src/index.js'),
  mode: 'production',
  // ����
  output: {
    // �������ļ�������index.js�Լ�����������Դ�����bundle.js��
    filename: 'bundle.js',
    // ���·��
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader:  'url-loader',
            options: {
              limit: 1024,
              name: '[name]-aaa.[ext]'
            }
          }
        ]
      },
      {
        test: /\.styl/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin()
  ]
}

// ����ǿ���ģʽ���������������
if(isDev){
  // �����Ƿ����ɣ��Լ�������� source map
  config.devtool = '#cheap-module-eval-source-map';
  config.devServer = {
    // �˿�
    port: 8080,
    // ����
    host: '0.0.0.0',
    // ʹwebpack������ʾ��ҳ����
    overlay: {
      error: true,
    },
    // �Զ��������
    // open: true,
    // ģ�����滻��ֻ���¸��ĵĲ���
    hot: true
  };
  // ��Ӳ��
  config.plugins.push(
    // ��ģ���滻���
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
}

module.exports = config;
```

��ʱ���ļ����ݣ�

```json
// package.json

{
  "name": "vue-todo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "cross-env NODE_ENV=production webpack --config webpack.config.js",
    "dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cross-env": "^5.2.0",
    "css-loader": "^2.1.1",
    "file-loader": "^3.0.1",
    "html-webpack-plugin": "^3.2.0",
    "style-loader": "^0.23.1",
    "stylus": "^0.54.5",
    "stylus-loader": "^3.0.2",
    "url-loader": "^1.1.2",
    "vue": "^2.6.10",
    "vue-loader": "^15.7.0",
    "vue-template-compiler": "^2.6.10",
    "webpack": "^4.32.2",
    "webpack-dev-server": "^3.5.1"
  },
  "devDependencies": {
    "webpack-cli": "^3.3.2"
  }
}
```

����ʱΪֹ����Ŀ���û�����ɣ�֮��дҵ���߼���

# `vue`���ܺ���Ŀʵս

vue��һ�����ݰ󶨵�������Ŀ��

���ݰ�

vue�ļ�������ʽ

render����

API�ص㣺

- �������ڷ���

- computed

## ����`vue`��`jsx`д���Լ�`postcss`

- ����ʽ����֮ǰ����װ����������

```cmd
npm i postcss-loader autoprefixer babel-loader babel-cor
```

- ����Ŀ��Ŀ¼�½������������ļ���`.babelrc`��`postcss.config.js`

```cmd
npm i babel-preset-env babel-plugin-transform-vue-jsx
```

```javascript
// postcss.config.js

const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer()
  ]
};
```

```javascript
// .babelrc

{
  "presets": [
    "env"
  ],
  "plugins": [
    "transform-vue-jsx"
  ]
}
```

- ��`webpack.config.js`������

```javascript
{
  test: /\.jsx$/,
  loader: 'babel-loader'
},
```

## ʵ��`todo`Ӧ�ý���

��`src`Ŀ¼���½�`src/components`Ŀ¼���½�`Header.vue`��`Todo.vue`��`Item.vue`��`Tabs.vue`��`Footer.jsx`��Щ�����`global.styl`��

Ŀ¼�ṹ���£�
![](./media/Ŀ¼�ṹ2.png)

```javascript
// index.js

/**
 * ����ļ�
 */
import Vue from 'vue';
import App from './App.vue';

import '../src/assets/styles/global.styl';

const root = document.createElement('div');
document.body.appendChild(root);

// ����Vue���󣬽�App������ص�root�ڵ�
new Vue({
  render: (h) => h(App)
}).$mount(root);
```

```vue
<!-- Header.vue-->

<template>
  <header class="main-header">
    <h1>ToDo</h1>
  </header>
</template>

<style lang="stylus" scoped>
  .main-header {
    text-align: center;

    h1 {
      font-size: 100px;
      color: palevioletred;
      font-weight: 100px;
      margin: 50px;
    }
  }
</style>
```

```vue
<!--Todo.vue-->

<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="�������"
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
        // ��� filter��״̬Ϊall����ʾ���е�todos
        if(this.filter === 'all'){
          return this.todos;
        }
        // ɸѡ�ķ���������this.filter����todo.completed��
        // ����filter��һ���ַ��������Լ�������������жϣ�
        // �õ�һ��true��false��ֵ������ȥ����todos�б�
        const completed = this.filter === 'completed';
        // filter�Ľ������true����ʾ������false����ʾ
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
```

```vue
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
        // �����¼�,�ڸ��������@del="deleteTodo"�ķ�ʽ������
        // ʵ�ָ���������¼��Ľ���
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
```

```vue
<!--Tabs.vue-->

<template>
  <div class="helper">
    <span class="left">{{unFinishedTodoLength}} items left</span>
    <span class="tabs">
      <span
        v-for="state in states"
        :key="state"
        :class="[state, filter === state ? 'actived' : '']"
        @click="toggleFilter(state)"
      >
        {{state}}
      </span>
    </span>
    <span class="clear" @click="clearAllCompleted">Clear completed</span>
  </div>
</template>

<script>
  export default {
    props: {
      filter: {
        type: String,
        required: true,
      },
      todos: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        states: ['all', 'active', 'completed']
      }
    },
    computed: {
      unFinishedTodoLength() {
        return this.todos.filter(todo => !todo.completed).length;
      }
    },
    methods: {
      toggleFilter(state) {
        this.$emit('toggle', state);
      },
      clearAllCompleted() {
        this.$emit('clearAllCompleted');
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .helper {
    font-family: Georgia, serif;
    font-weight: 100;
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    line-height: 30px;
    background-color: #fff;
    font-size: 14px;
  }

  .left, .clear, .tabs {
    padding: 0 10px;
    box-sizing: border-box;
  }

  .left, .clear {
    width: 150px;
  }

  .left {
    text-align: left;
  }

  .clear {
    text-align: right;
    cursor: pointer;
  }

  .tabs {
    width: 200px;
    display: flex;
    justify-content: space-around;

    * {
      display: inline-block;
      padding 0 10px;
      cursor: pointer;
      border: 1px solid rgba(175, 47, 47, 0);

      &.actived {
        border-color: rgba(175, 47, 47, 0.4);
        border-radius: 5px;
      }
    }
  }
</style>
```

```vue
<!--App.vue-->

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

  /* ʵ���黯Ч��*/
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
```

```jsx
// Footer.jsx

import '../assets/styles/footer.styl';

export default {
  data() {
    return {
      author: 'MandyShen'
    }
  },
  render() {
    return (
      <div id="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
};
```

```stylus
//footer.styl

#footer{
  margin-top 40px
  text-align center
  color mediumvioletred
  font-size 18px
  text-shadow 0 1px 0 #2b81af
}
```

# `webpack`�����Ż�

## `webpack`����`css`����������

```cmd
npm i extract-text-webpack-plugin
```

�����ǽ���`javascript`�������Դ���������һ����̬��Դ�ļ���

- ��`webpack.config.js`������

```js
// webpack.config.js

const ExteactPlugin = require('extract-text-webpack-plugin');
```

## `webpack`���ִ�������뼰`hash`�Ż�

```js
// webpack.config.js

// path��nodejs�е�һ������������������·����
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
  // ����Ŀ����webƽ̨
  target: 'web',
  // �������,entryʹ�þ���·������֤��������
  entry: path.join(__dirname, 'src/index.js'),
  // mode: 'production',
  // ����
  output: {
    // �������ļ�������index.js�Լ�����������Դ�����bundle.js��
    filename: 'bundle.[hash:8].js',
    // ���·��
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name]-aaa.[ext]'
            }
          }
        ]
      },

    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin()
  ]
}

// ����ǿ���ģʽ���������������
if (isDev) {
  config.module.rules.push({
    test: /\.styl/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        }
      },
      'stylus-loader'
    ]
  });
  // �����Ƿ����ɣ��Լ�������� source map
  config.devtool = '#cheap-module-eval-source-map';
  config.devServer = {
    // �˿�
    port: 8080,
    // ����
    host: '0.0.0.0',
    // ʹwebpack������ʾ��ҳ����
    overlay: {
      error: true,
    },
    // �Զ��������
    // open: true,
    // ģ�����滻��ֻ���¸��ĵĲ���
    hot: true
  };
  // ��Ӳ��
  config.plugins.push(
    // ��ģ���滻���
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
} else {
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  };
  config.output.filename = '[name].[chunkhash:8].js';
  config.module.rules.push(
    {
      test: /\.styl/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          'stylus-loader'
        ]
      })
    },
  );
  config.plugins.push(
    new ExtractPlugin('styles.[hash:8].css')
  );
  config.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2, maxInitialRequests: 5,
          minSize: 0
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    },
    runtimeChunk: true
  }
}

module.exports = config;
```

