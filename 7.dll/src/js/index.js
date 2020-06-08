console.log('index.js文件被加载')

import $ from 'jquery'

console.log($)


//import { mul } from './test'


document.getElementById('btn').onclick = function(){
    //懒加载：当文件使用时，才加载
    //预加载 webpackPrefetch：true,会在使用之前，
    //预加载 webpackPrefetch提前加载js文件，等浏览器空闲了再偷偷加载其他资源（兼容性差，只能在一些标准浏览器中使用）
    //正常加载：可以认为是并行加载（同一时间加载多个文件）
    import(/* webpackChunkName: 'test',webpackPrefetch: true */'./test').then(({mul})=>{
        console.log(mul(4,5))
    })
}
