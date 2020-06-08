# webpack性能优化
* 开发环境性能优化
* 生产环境性能优化

##开发环境性能优化
* 优化打包构建速度
    * HMR功能
* 优化调试功能
    * source-map

##生产环境性能优化
* 优化打包构建速度
    * oneOf
    * bable缓存
    * 多进程打包
    * externals（让某些库不打包，在html中通过CDN script引入）
    * dll
* 优化代码运行性能
    * 缓存 ( hash-chunkhash-contenthash )
    * tree-shaking(去除应用程序中无用代码)
    * code split(单入口-->optimization{node_module打包成一个文件，其他一个文件，node_module又可以用dll进行单独打包},import(),多入口)
    * 懒加载/预加载（import(),预加载是等其他文件加载完悄悄加载）
    * pwa （离线访问技术）
    