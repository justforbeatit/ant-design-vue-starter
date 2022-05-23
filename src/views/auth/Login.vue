<script setup lang="ts">
import '@/assets/login.less'
import sha256 from 'crypto-js/sha256'
import logo from '@/composables/logo'
import captcha from '@/composables/captcha'
import copyright from '@/composables/copyright'
import { useUserStore, type UserContext } from '@/store/user'
import type { FormItem } from '@/types'

const { VITE_APP_TITLE } = import.meta.env
const router = useRouter()
const store = useUserStore()
const captchaKey = ref('')
const reloadCaptcha = ref(false)
const { user, permissions } = storeToRefs(store)

const items: Array<FormItem | FormItem[]> = [{
  type: 'Input',
  name: 'username',
  placeholder: '请输入用户名',
  size: 'large',
  prefixIcon: 'UserOutlined',
}, {
  type: 'InputPassword',
  name: 'password',
  placeholder: '请输入密码',
  size: 'large',
  prefixIcon: 'LockOutlined',
}, [{
  type: 'Input',
  name: 'captcha',
  placeholder: '请输入验证码',
  size: 'large',
  prefixIcon: 'SafetyOutlined',
  wrapperCol: { span: 16 },
}, {
  type: 'Custom',
  name: 'captcha_img',
  wrapperCol: { span: 8 },
}]]

const login = async (params: Record<string, string>) => {
  const payload = {
    ...params,
    password: sha256(params.password).toString(),
    key: captchaKey.value
  }
  const result = await useRequest<UserContext>().auth.login(payload)

  if (!result.ok) {
    reloadCaptcha.value = true
    return error(result.msg)
  }
  store.setAccessToken(<string>result.data.token)
  user.value = result.data.user
  permissions.value = result.data.permissions || []
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
          <template #itemRender="{ item }">
            <captcha
              v-if="item.name === 'captcha_img'"
              v-model:reload="reloadCaptcha"
              v-model:secretKey="captchaKey"
            />
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
      <copyright />
    </footer>
  </div>
</template>
