var path = require('path')
var pkg = require('./package.json')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CopyWebpackPlugin=require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    context: __dirname+'/app',
    entry: {
      app: path.resolve(__dirname, './app/js/index.js'),
    //  'vendor': Object.keys(pkg.dependencies),
    },
    output: {
        path: __dirname +'/build',
        filename: "js/index.js"
        //filename: "js/index.js"
    },

    resolve: {
        extensions: ['.js', '.json']
    },

    module: {
                rules: [
                    {
                        test: /\.js$/, //是一个正则，代表js或者jsx后缀的文件要使用下面的loader
                        loader: "babel-loader",
                        exclude: /node_modules/
                    },
                   {
        		test: /\.scss$/,
       			 use: [
         			 { loader: 'style-loader'},
         			 { loader: 'css-loader'},
         			 {
            				loader: 'postcss-loader',
           				 options: {
             					 plugins: () => [autoprefixer(
               					 { browsers: ['iOS >= 7', 'Android >= 4.1', 'last 10 Chrome versions', 'last 10 Firefox versions', 'Safari >= 6', 'ie > 8'] }
             					 )],
           				 },
         			 },
         			 'sass-loader'
       				 ]
     		   },
                   {
                        test: /\.less$/,
                        loader: ['style-loader','css-loader','less-loader'],
                    },
                    {
                        test: /\.css$/,
                        loader: ["style-loader","css-loader"],//添加对样式表的处理
                    },
            	{
               		 test: /\.(png|gif|jpg|jpeg|bmp)$/,
               		 loader:  'url-loader?limit=5000',
           	 },
            	{
                	test: /\.(png|woff|woff2|svg|ttf|eot)($|\?)/,
                	loader:  'url-loader?limit=5000',
            	},


        ],},
     plugins: [

        new webpack.LoaderOptionsPlugin({
            // test: /\.xxx$/, // may apply this only for some modules
            options: {
                postcss:  require('autoprefixer') //调用autoprefixer插件，例如 display: flex
            },
            eslint: {
                   configFile: '.eslintrc' // Rules for eslint
            },
        }),
        // html 模板插件
        new HtmlWebpackPlugin({
            //template: __dirname + '/app/js/index.tmpl.html'
            template: __dirname + '/app/views/index.ejs'
        }),
        new CopyWebpackPlugin([{
          from: __dirname + '/app/css',
          to: __dirname +'/build/css'
        }]),


        // 热加载插件
        new webpack.HotModuleReplacementPlugin(),

        // 打开浏览器
        new OpenBrowserPlugin({
            url: 'http://localhost:9000'
        }),

        // 提供公共代码
      //new webpack.optimize.CommonsChunkPlugin({
      //    name: 'vendor',
      //    filename: '/js/[name].js'
      //}),

        // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
	 new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        })
    ],
    devServer: {
        //colors: true, //终端中输出结果为彩色
        port : 9000,
        historyApiFallback: true, //不跳转，在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        inline: true, //实时刷新
        hot: true , // 使用热加载插件 HotModuleReplacementPlugin
        proxy: {//设置代理 以／get 访问的地址 将发送到 http://localhost:3000/get 的地址
            '/get': {
              target: 'http://localhost:3000',
              pathRewrite: {'^/column' : '/column'},
              changeOrigin: true
            }
         }
    }
}
