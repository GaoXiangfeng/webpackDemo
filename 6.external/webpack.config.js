
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
    external: {
        //拒绝jQuery这个包被打包进来（可以在html中通过script标签引入进来），--> npm包名
        jquery: 'jQuery',
    }
}
