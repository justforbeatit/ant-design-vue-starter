import { createApp } from 'vue'
import { createPinia } from 'pinia'
//import App from './App.vue'
import App from './App.vue'
import router from './router'
import MakeitCaptcha from 'makeit-captcha'
import 'makeit-captcha/dist/captcha.min.css'

createApp(App)
  .use(createPinia())
  .use(router)
  .use(MakeitCaptcha)
  .mount('#app')
