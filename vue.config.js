
module.exports = {
    //devServer: {
    //    proxy: 'http://localhost:8000'
    //},

    publicPath: '/',
    productionSourceMap: false,

    css: {
        // 是否使用css分離外掛 ExtractTextPlugin
        extract: false,
        // 開啟 CSS source maps?
        sourceMap: false,
        // css預設器配置項
        loaderOptions: {},
        // 啟用 CSS modules for all css / pre-processor files.
        requireModuleExtension: true
    },
}
