<script setup lang="ts">
import '@/assets/login.less'
import logo from '@/composables/logo'
import captcha from '@/composables/captcha'
import copyright from '@/composables/copyright'
import type { FormItem } from '@/types/ant'
import type { ApiResponse } from '@/utils/http/core'

const { VITE_APP_TITLE } = import.meta.env
const router = useRouter()
const captchaKey = ref('')

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

const setCaptchaKey = ({ key }: { key: string }) => captchaKey.value = key

const login = async (params: JsonData) => {
  const payload = { ...params, key: captchaKey.value }
  const result = await useRequest<ApiResponse<{ token: string}>>().auth.login(payload)

  if (!result.ok) {
    return error(result.msg)
  }
  useStorage().token(result.data.token)
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
            <captcha v-if="item.name === 'captcha_img'" @change="setCaptchaKey"/>
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
