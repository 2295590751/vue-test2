const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,

    // 关闭ESLINT校验工具
    lintOnSave: false,

    //配置代理跨域
    devServer: {
        proxy: {
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn',
            },
        },
    },

    //dubug相关的配置
    //sourceMaps	默认是启用的，对于打包的调试
    productionSourceMap: false,
    configureWebpack: {
        devtool: 'source-map',
    },
});
