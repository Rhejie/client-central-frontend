const webpack = require('webpack');
const path = require('path');

module.exports = {
  // proxy API requests to Valet during development
  devServer: {
    proxy: {
      '^/api': {
        target: process.env.BASE_URL,
        changeOrigin: true,
      },
    },
  },

  assetsDir: 'client',

  outputDir: (process.env.VUE_APP_NODE_ENV === 'local')
    ? `../${process.env.VUE_APP_BACKEND_FOLDER}/public`
    : '../public',

  indexPath:
    process.env.VUE_APP_NODE_ENV === 'production'
      ? '../resources/views/index-client.blade.php'
      : '../resources/views/dev-client.blade.php',
  
  publicPath: ['local'].includes(process.env.VUE_APP_NODE_ENV) ? '/' : `${process.env.ASSET_URL}/`,


  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery',
        jQuery: 'jquery',
      }),
    ]
  },
  chainWebpack: config => config.resolve.symlinks(false)
}
