module.exports = {
    // debug 相关的配置
    env: {
        debug: {
            sourceMap: true,
            retainLines: true,
        },
    },

    presets: ['@vue/cli-plugin-babel/preset'],
    plugins: [
        [
            'component',
            {
                libraryName: 'element-ui',
                styleLibraryName: 'theme-chalk',
            },
        ],
    ],
};
