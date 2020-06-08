/*
    使用dll技术，对某些库(第三方库vue,react,jquery...）进行打包

        当运行webpack时候，默认会查找webpack.config.js配置文件，
        需求： 需要运行webpack.dll.js
        --> webpack --config webpack.dll.js
*/

const { resolve } = require('path')
const webpack = require('webpack')

module.exports = {
    entry:{
        /*
            最终打包生成[name]-->jquery
            ['jquery']要打包的是jquery
        */
        jquery: ['jquery'],
        
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dll'),
        library: '[name]_[hash]',//打包库里向外暴露的出去的内容叫什么名字
    },
    plugins: [
        //打包生成一个manifest.json文件 --> 提供和jquery的映射关系
        new webpack.DllPlugin({
            name :'[name]_[hash]',
            path: resolve(__dirname, 'dll/manifest.json'),
        })
    ],
    mode: 'production'
}