<script setup lang="ts">
import '@/assets/login.less'
import logo from '@/composables/logo'
import type { FormItem } from '@/types/ant'

const { VITE_APP_TITLE, VITE_APP_COPYRIGHT } = import.meta.env
const router = useRouter()

const items: Array<FormItem | FormItem[]> = [{
  type: 'Input',
  name: 'username',
  placeholder: '请输入用户名',
  size: 'large',
  prefixIcon: 'UserOutlined',
  rules: [
    { min: 4, message: '用户名至少 4 个字符' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
  ]
}, {
  type: 'InputPassword',
  name: 'password',
  placeholder: '请输入密码',
  size: 'large',
  prefixIcon: 'LockOutlined',
  rules: [
    { min: 6, message: '密码至少 6 个字符' },
  ]
}, [{
  type: 'Input',
  name: 'captcha',
  placeholder: '请输入验证码',
  size: 'large',
  prefixIcon: 'SafetyOutlined',
  wrapperCol: { span: 16 },
}, {
  type: 'Custom',
  name: 'captchaimg',
  wrapperCol: { span: 8 },
}]]

const login = async (payload: LoginInfo) => {
  const { ok, msg, data: { token } } = await useRequest().auth.login(payload)
  if (!ok) {
    return error(msg)
  }
  useStorage().token(token)
  success('登录成功')
  router.push({ name: 'index' })
}
</script>

<template>
  <div class="login-container">
    <div class="login-content">
      <header>
        <logo width="60px" height="60px" />
        <label>{{ VITE_APP_TITLE }}</label>
      </header>
      <main>
        <ant-form
          :label-col="{ span: 0 }"
          :wrapper-col="{ span: 24 }"
          :items="items"
          @on-submit="login"
        >
          <template #custom="{ item }">
            <img v-if="item.name === 'captchaimg'"
              src="https://n5gm.wanyuenet.com/captcha/math?i23UYInH"
              style="height: 100%;width: 100%;"
            >
          </template>
          <template #button="{ loading }">
            <a-button html-type="submit" type="primary" size="large" block :loading="loading">
              登录
            </a-button>
          </template>
        </ant-form>
      </main>
    </div>
    <footer>
      <a-typography-text type="secondary" v-if="VITE_APP_COPYRIGHT">
        &copy;{{ VITE_APP_COPYRIGHT }}
      </a-typography-text>
    </footer>
  </div>
</template>
