
function add(x,y){
    return (x + y)
}
/*
    通过js代码，让某个文件单独打包成一个chunk
    import()动态倒入语法，能将某个文件单独打包
*/
import(/* webpackChunkName: 'test' */'./test').then(()=>{
    console.log(mul)
}).catch(()=>{

})


console.log(add(2,3))