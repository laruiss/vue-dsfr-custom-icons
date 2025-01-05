import { icons as riCollection } from '@iconify-json/ri'
import { addCollection } from '@iconify/vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router/index'

import '@gouvfr/dsfr/dist/core/core.main.min.css'
import '@gouvfr/dsfr/dist/component/component.main.min.css'

import '@gouvfr/dsfr/dist/utility/utility.main.min.css'
import '@laruiss/vue-dsfr/styles'

// J'utilisais les conf suivantes pour m'assurer qu'il n'y ai pas d'appels qui partent mais ça devrait fonctionner sans normalement
// addAPIProvider('', { resources: [] })
// setCustomIconLoader((prefix, icon) => {
//   console.warn(`Tentative de chargement externe bloquée pour : ${prefix}:${icon}`)
//   return null
// }, '')
// setCustomIconsLoader((prefix, icon) => {
//   console.warn(`Tentative de chargement externe bloquée pour : ${prefix}:${icon}`)
//   return null
// }, '')

import '@gouvfr/dsfr/dist/scheme/scheme.min.css'
import '@gouvfr/dsfr/dist/utility/icons/icons.min.css'

import './main.css'

addCollection(riCollection)

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
