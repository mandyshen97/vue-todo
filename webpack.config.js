// webpack.config.js

// path是nodejs中的一个基本包，用来处理路径的
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  // 编译目标是web平台
  target: 'web',
  // 声明入口,entry使用绝对路径，保证不出错误
  entry: path.join(__dirname, 'src/index.js'),
  mode: 'production',
  // 出口
  output: {
    // 输出打包文件名（将index.js以及其依赖的资源打包成bundle.js）
    filename: 'bundle.js',
    // 输出路径
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
    new VueLoaderPlugin()
  ]
}


