import '../media/iconfont.css'
import '../css/index.less'
import print from './print.js'

console.log('index.js被执行了')

print()

function add(x,y){
    return (x + y)
}

console.log(add(2,3))

//js文件热替换
if(module.hot){
    module.hot.accept('./print.js',function(){
        print()
    })
}