import { addCollection } from '@iconify/vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import collections from './icon-collections.js'

import router from './router/index'
import '@gouvfr/dsfr/dist/core/core.main.min.css'

import '@gouvfr/dsfr/dist/component/component.main.min.css'
import '@gouvfr/dsfr/dist/utility/utility.main.min.css'

import '@laruiss/vue-dsfr/styles'
import '@gouvfr/dsfr/dist/scheme/scheme.min.css'

import '@gouvfr/dsfr/dist/utility/icons/icons.min.css'
import './main.css'

for (const collection of collections) {
  addCollection(collection)
}

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
