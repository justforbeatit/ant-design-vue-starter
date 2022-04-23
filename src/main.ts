import { createApp } from 'vue'
import { createPinia } from 'pinia'
//import App from './App.vue'
import app from './app'
import router from './router'
import MakeitCaptcha from 'makeit-captcha'
import 'makeit-captcha/dist/captcha.min.css'

createApp(app)
  .use(createPinia())
  .use(router)
  .use(MakeitCaptcha)
  .mount('#app')
