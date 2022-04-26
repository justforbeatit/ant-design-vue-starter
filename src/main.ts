import { createApp } from 'vue'
import { createPinia } from 'pinia'
import app from './app'
import router from './router'

createApp(app)
  .use(createPinia())
  .use(router)
  .mount('#app')
