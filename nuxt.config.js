module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '到喜啦',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'bnhcp project' }
    ],
    link: [
      { rel: 'stylesheet', href: '/common/common.css' }
    ]
  },
  env: {
    HOST_URL: process.env.HOST_URL || 'http://localhost:6600'
  },
  /*
  ** Customize the progress-bar colornuxt
  */
  loading: { color: '#3B8070' },
  // or
  cache: {
    max: 1000,
    maxAge: 900000
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios', 'babel-polyfill'],
    /*
    ** Run ESLINT on save
    */
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

