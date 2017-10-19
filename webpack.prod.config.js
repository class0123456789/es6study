var pkg = require('./package.json')
var path = require('path')
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname+'/app',
  entry: {
    app: path.resolve(__dirname, 'app/js/index.js'),
    // 将 第三方依赖 单独打包
      // 将 第三方依赖（node_modules中的） 单独打包
      'vendor': Object.keys(pkg.dependencies),



  },
  output: {
       path: __dirname + "/build",
       filename: "js/index.js"
      //filename: "js/[name].[chunkhash:8].js"

  },

  resolve:{
      extensions:['.js','.json']
  },

  module: {
      rules: [
          {
              test: /\.js|jsx$/, //是一个正则，代表js或者jsx后缀的文件要使用下面的loader
              loader: "babel-loader"
          },
          {
              test: /\.scss$/,
              loader: 'style-loader!css-loader!sass-loader'
          },
          {
              test: /\.less$/,
              loader: 'style-loader!css-loader!less-loader'
          },
          {
              test: /\.css$/,
              loader: ["style-loader","css-loader"] //添加对样式表的处理
          },
          {
              test: /\.(png|gif|jpg|jpeg|bmp)$/,

              loader:  'url-loader?limit=5000&name=img/[name].[chunkhash:8].[ext]'
          },
          {
              test: /\.(png|woff|woff2|svg|ttf|eot)($|\?)/,

              loader:  'url-loader?limit=5000name=fonts/[name].[chunkhash:8].[ext]'
          }
      ],
  },

  plugins: [
    // webpack 内置的 banner-plugin
    new webpack.BannerPlugin("Copyright by class0123456789@qq.com."),

        //调用autoprefixer插件，例如 display: flex
        new webpack.LoaderOptionsPlugin({
         options: {
                 postcss: function() {
                 return [require('autoprefixer')];
                },
       	 }
        }),
    // html 模板插件
    new HtmlWebpackPlugin({
        template: __dirname + '/app/views/index.ejs',
        
        //template: __dirname + '/app/index.tmpl.html'
    }),

    // 定义为生产环境，编译 React 时压缩到最小
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),

    // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.optimize.UglifyJsPlugin({
        compress: {
          //supresses warnings, usually from module minification
          warnings: false
        }
    }),

      // 分离CSS和JS文件 ExtractTextPlugin
    new ExtractTextPlugin('/css/[name].[chunkhash:8].css'),

      // 提供公共代码
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: '/js/[name].[chunkhash:8].js'
    }),

    // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    })
  ]
}
