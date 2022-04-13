import colors from 'vuetify/es5/util/colors'

export default {
  components: true,
  head: {
    titleTemplate: '%s - Face NFT',
    title: 'Home',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: ['~/assets/main'],
  plugins: ['@/plugins/web3.client'],
  buildModules: ['@nuxtjs/vuetify'],
  modules: ['@nuxtjs/axios', '@nuxtjs/toast', 'nuxt-clipboard'],
  publicRuntimeConfig: {
    contractAddress: process.env.CONTRACT_ADDRESS,
    contentId: process.env.PINATA_CONTENT_ID,
  },
  axios: {
    baseURL: '/',
  },
  clipboard: {
    autoSetContainer: true,
  },
  toast: {
    position: 'bottom-right',
    duration: 5000,
    keepOnHover: true,
    iconPack: 'mdi',
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  build: {},
}
