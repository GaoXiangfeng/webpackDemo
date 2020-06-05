/*
    HMR功能: hot module replacement热模块替换/模块热替换
    作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有）
    
    样式文件：可以使用HMR功能，因为style-loader内部实现了，开始模式下使用style-loader
    js文件 ：默认没有HMR功能，(print.js文件中有实例)，只能处理非入口文件
    HTML文件：默认没有HMR功能，不能热更新，同时会导致html也不更新了
      解决办法：更改entry入口为一个数组 ['./src/js/index.js','./src/js/index.html'],将html文件引入
*/

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

/*
    运行打包指令
    webpack 会将打包结果输出
    npx webpack-dev-server 不会输出 只会在内存中


    设置nodejs的环境变量
    process.env.NODE_ENV = 'development'

    压缩css的插件：optimize-css-assets-webpack-plugin
*/

/*
    缓存：
        bable缓存：cacheDirectory: true,
        文件资源缓存：
            hash --> 每次webpack构建打包会生成的唯一的hash值
                问题：因为js和css用的是同一个hash值，如果有其中一个文件发生变化
                导致hash变化，缓存会失效
            chunkhash:根据chunk来生成hash，如果打包来自于一个chunk，那么hash值一样
                问题：js和css还是一样的hash值，因为css是在js中被引入的，所以同属于一个chunk 
            contenthash: 根据文件内容生成hash，不同内容生成不同的hash
*/

const commonCssLoader = [
    'style-loader',//开发模式下使用
    //MiniCssExtractPlugin.loader,//提取css文件成单独文件
    'css-loader',
    /*
        css兼容性处理:postcss-->postcss-loader, postcss-preset-env帮助
        postcss找到package.json中的broswerslist里面的配置，通过加载指定配置加载css兼容性样式
    
        1:使用loader默认配置
        'postcss-loader'
        2.修改loader配置
        开发环境-->设置node环境变量：process.env.NODE_ENV = development
        "development":[
            "last 1 chrome version",
            "last 1 firefox version",
            "last 1 safari version"
        ],
        默认是看生产环境
        "production":[
            ">0.2%",
            "not dead",
            "not op_mini all"
        ]
    */
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugin: () => [
                require('postcss-preset-env')
            ]
        }
    }
]

module.exports = {
    entry: ['./src/js/index.js', './src/index.html'],
    output: {
        filename: 'js/build.[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },

    module: {
        rules: [
            {
                /*
                    当一个文件被多个loader处理时，如js文件既被eslint-loader处理又被bable-loader处理，
                    一定要注意先后顺序，先eslint-loader再bable-loader，
                */

                /*
                    语法检查：eslint eslint-loader
                    注意：只检查自己的源代码，不检查第三方的库
                    设置检查规则：
                    package.json中的eslintConfig中设置
                        "eslintConfig":{
                            "extents": "airbnb-base"
                        }

                    使用规则: airbnb--> eslint-config-airbnb-base eslint eslint-plugin-import
                
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        //当一个文件被多个loader处理时，指定该loader优先执行，
                        enforce: 'pre',
                        loader: 'eslint-loader',
                        options: {
                            fix: true,//自动修复
                        }
                    },
                */
                /*
                    以下loader只会匹配一个
                    注意不能有两个配置处理同一种类型文件，多个loader处理同一种类型文件要提出来一个
                */
                oneOf: [
                    {
                        test: /\.less$/,
                        use: [
                            ...commonCssLoader,
                            'less-loader',
                        ],

                    },
                    {
                        test: /\.css$/,
                        use: [
                            //'style-loader',
                            ...commonCssLoader,
                        ]
                    },
                    {
                        test: /\.(jpg|png|gif)$/,
                        loader: 'url-loader',//只能处理样式中的图片资源，处理不了html中的图片资源
                        options: {
                            limit: 8 * 1024,
                            name: '[hash:10].[ext]',
                            esModule: false,//关闭esmode解析，打开commonMode
                            outputPath: '../img',
                        }
                    },
                    {
                        test: /\.html$/,
                        loader: 'html-loader',//专门处理html中的图片资源
                    },
                    {
                        exclude: /.(html|js|css|less|jpg|png|gif)$/,
                        loader: 'file-loader',
                        options: {
                            name: '[hash:10].[ext]',
                            outputPath: 'media'
                        }
                    },
                    /*
                        js兼容性处理：bable-loader @bable/core @bable/preset-env
                        1.基本js兼容性处理-->@bable/preset-env
                            只能转换基本语法，不能转化promise等
                        2.全部兼容性处理 --> @bable/polyfill (直接在代码中引用import '@bable/polyfill' 即可)
                            问题：我只要解决部分兼容问题，但是将所有兼容性代码全部引入，体积太大了
                        3.需要做兼容性处理：按需加载 --> corejs
                    */
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'bable-loader',
                        options: {
                            presets: [
                                [
                                    '@bable/preset-env',
                                    {
                                        useBuiltIns: 'usage',//按需加载
                                        //指定core-js的版本
                                        corejs: {
                                            version: 3
                                        },
                                        //指定兼容到哪个版本
                                        targets: {
                                            chrome: '60',
                                            ie: '9'
                                        }
                                    }
                                ]
                            ],
                            //开启bable缓存，第二次构建时，会读之前的缓存
                            cacheDirectory: true,
                        }
                    },
                ]
            }
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
        new MiniCssExtractPlugin({ //提取css代码为单独文件
            filename: 'css/build.[contenthash:10].css'
        }),
        new OptimizeCssAssetsWebpackPlugin(),//压缩css代码
    ],
    //mode: 'development',
    mode: 'production',//生产环境下自动压缩js代码
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true,
        //开启HMR功能
        //*当修改了webpack配置，新配置想要生效，一定重启webpack服务
        hot: true
    },

    devtool: 'source-map'
}

/*
    source-map: 是一种提供源代码到构建后代码映射的技术
        （如果构建后代码出错，通过映射我们可以追踪到源代码）
        错误代码准确信息，源代码的错误位置
    [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
    inline-source-map： 内联
        1.只生成一个sourcemap
    hidden-source-map： 外部
        错误代码、错误原因，但是没有错误位置
        不能追踪源代码错误，只能提示到构建后的代码位置
    eval-source-map： 内联
        2.每个文件生成一个sourcemap
        错误代码准确信息，源代码的错误位置
    nosources-source-map
        错误代码准确信息，但是没有任何源代码信息
    cheap-source-map
        错误代码准确信息，只能精确到行
    cheap-module-source-map
        错误代码准确信息，源代码的错误位置
        会将loader的sourcemap那进来
    内联和外部的区别: 1.外部生成了文件，内联没有 2.内联构建速度快

    开发环境：速度快，调试更友好
        （eval>inline>cheap>...）
        速度快
         eval-cheap-source-map
         eval-source-map
        调试更友好
         source-map
         cheap-module-source-map
         cheap-source-map

        -->eval-source-map(eval-cheap-module-source-map)

    生产环境：代码要不要隐藏
       nosource-source-map 全部隐藏
       hidden-source-map 只隐藏源代码，会提示构建后代码

       -->sourcemap
*/