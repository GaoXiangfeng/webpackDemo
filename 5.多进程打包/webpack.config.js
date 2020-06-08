
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    //多入口，又一个入口就会有一个bundle
    entry: './src/js/index.js',
    output: {
        //取文件名[name]
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    module:{
        rules:[
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //    use: [
            //    ***** thread-loader开启多进程打包，进程启动时间大概为600ms，
            //    ***** 进程通信也有消耗，只有工作时间比较长才需要多进程打包
            //     {
            //          loader: 'thread-loader',
            //          options:{
            //              workers: 2,//进程数量为2
            //          }
            //      },
            //     {
            //         loader: 'bable-loader',
            //         options: {
            //             presets: [
            //                 [
            //                     '@bable/preset-env',
            //                     {
            //                         useBuiltIns: 'usage',//按需加载
            //                         //指定core-js的版本
            //                         corejs: {
            //                             version: 3
            //                         },
            //                         //指定兼容到哪个版本
            //                         targets: {
            //                             chrome: '60',
            //                             ie: '9'
            //                         }
            //                     }
            //                 ]
            //             ],
            //             //开启bable缓存，第二次构建时，会读之前的缓存
            //             cacheDirectory: true,
            //         }
            //     }
            //    ],
            //     loader: 'bable-loader',
            //     options: {
            //         presets: [
            //             [
            //                 '@bable/preset-env',
            //                 {
            //                     useBuiltIns: 'usage',//按需加载
            //                     //指定core-js的版本
            //                     corejs: {
            //                         version: 3
            //                     },
            //                     //指定兼容到哪个版本
            //                     targets: {
            //                         chrome: '60',
            //                         ie: '9'
            //                     }
            //                 }
            //             ]
            //         ],
            //         //开启bable缓存，第二次构建时，会读之前的缓存
            //         cacheDirectory: true,
            //     }
            // },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            //形成一个html，以模板参数为模板
            template: './src/index.html',

            //压缩html代码
            minify: {
                //移除空格
                collapseWhitespace: true,
                //移除注释
                removeComments: true,
            }

        }),
       
    ],
    //可以将node_modules中的代码单独打包成一个文件
    //自动分析多入口chunk中，有没有公共文件，如果有，会打包成一个单独chunk
    optimization: {
        splitChunks:{
            chunks: "all"
        }
    },
    //mode: 'development',
    mode: 'production',//生产环境下自动压缩js代码
   
}
