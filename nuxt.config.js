
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'theme-color', content: '#ffffff' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@rougetoken' },
      { name: 'og:url', content: 'http://faucet.rouge.network/' },
      { name: 'og:title', content: 'RGE faucet ÐApp - The Rouge Project' },
      { name: 'og:image', content: 'http://faucet.rouge.network/images/faucet-rge-testnet.png' },
      { name: 'og:description', content: 'RGE faucet ÐApp (the Rouge Project)' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/sass/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/font-awesome',
    'vue-ethereum/nuxt'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
  }
}
