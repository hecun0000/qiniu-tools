// vue.config.js
const path = require('path')
// 打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// gzip
const CompressionPlugin = require('compression-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        'appId': 'com.example.app',
        'productName': 'qiniu-tools', // 项目名，也是生成的安装文件名，即aDemo.exe
        'copyright': 'Copyright © 2020', // 版权信息
        'directories': {
          'output': './dist'// 输出文件路径
        },
        'win': {// win相关配置
          // 'icon': './icon.png', // 图标，当前图标在根目录下，注意这里有两个坑
          'target': [
            {
              'target': 'nsis', // 利用nsis制作安装程序
              'arch': [
                'x64' // 64位
              ]
            }
          ]
        },
        'nsis': {
          'oneClick': false, // 是否一键安装
          'allowElevation': true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          'allowToChangeInstallationDirectory': true, // 允许修改安装目录
          // 'installerIcon': './icon.png', // 安装图标
          // 'uninstallerIcon': './icon.png', // 卸载图标
          // 'installerHeaderIcon': './icon.png', // 安装时头部图标
          'createDesktopShortcut': true, // 创建桌面图标
          'createStartMenuShortcut': true, // 创建开始菜单图标
          'shortcutName': '七牛云上传工具' // 图标名称
        }
      }

    }
  },
  // 使用运行时编译器的 Vue 构建版本
  runtimeCompiler: true,

  // 开启生产环境SourceMap，设为false打包时不生成.map文件
  productionSourceMap: false,

  // 关闭ESLint，如果你需要使用ESLint，把lintOnSave设为true即可
  lintOnSave: process.env.NODE_ENV !== 'production',

  devServer: {
    // showEslintErrorsInOverlay: true,
    open: true, // 是否自动打开浏览器页面
    host: '0.0.0.0', // 指定使用一个 host，默认是 localhost
    port: 8080, // 端口地址
    https: false, // 使用https提供服务
    // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    proxy: 'http://api.zhuishushenqi.com',
    overlay: {
      warnings: true,
      errors: true
    }
  },

  chainWebpack: (config) => {
    // #region svg-config
    const rule = config.module.rule('svg')
    rule.exclude.add(path.resolve('./src/assets/icons/svg'))
    const svgRule = config.module.rule('auto-svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule
      .test(/\.(svg)(\?.*)?$/)
      .include
      .add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    // #endregion svg-config

    // 路径添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))

    // 这里是对环境的配置，不同环境对应不同的BASE_URL，以便axios的请求地址不同
    config.plugin('define').tap(args => {
      args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
      return args
    })

    // #region 启用GZip压缩
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('compression')
        .use(CompressionPlugin, {
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          cache: true
        })
        .tap(args => { })

      // #region 图片压缩
      config.module
        .rule('images')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .exclude
        .add(path.resolve('src/assets/icons/svg'))
        .end()
        .use('img-loader')
        .loader('img-loader').options({
          plugins: [
            require('imagemin-jpegtran')(),
            require('imagemin-pngquant')({
              quality: [0.75, 0.85]
            })
          ]
        })
      // 分析打包体积
      if (process.env.IS_ANALYZE) {
        config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
          {
            analyzerMode: 'static'
          }
        ])
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
                @import "@/styles/mixin.scss";
                @import "@/styles/_var.scss";
                `
      }
    }
  },
  configureWebpack: () => ({
    devtool: 'source-map',
    resolve: {
      alias: {
        '~styles': path.resolve('./src/assets/styles'),
        '~images': path.resolve('./src/assets/images')
      }
    },
    // 关闭文件超过244kb提示
    performance: {
      hints: false
    }
  })
}
