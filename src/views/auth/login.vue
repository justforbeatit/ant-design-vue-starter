<script setup lang="ts">
import logo from '@/composables/logo'
import type { FormItem } from '@/types/ant'

const router = useRouter()
const { VITE_APP_TITLE, VITE_APP_COPYRIGHT } = import.meta.env

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
  <div id="container">
    <header>
      <logo width="60px" height="60px" />
      <label>{{ VITE_APP_TITLE }}</label>
    </header>
    <main>
      <ant-form
        :label-col="{ span: 0 }"
        :wrapper-col="{ span: 24 }"
        :items="items"
        :button="{ text: '登录', type: 'primary', size: 'large', block: true}"
        @on-finished="login"
      >
        <template #custom>
          <!--
          <a-row v-if="item.name === 'captcha'">
            <a-col :span="16">
              <a-input :size="item.size" :placeholder="item.placeholder" v-model:value="state[item.name]">
                <template #prefix>
                  <SafetyOutlined style="color: #ccc;"/>
                </template>
              </a-input>
            </a-col>
            <a-col :span="7" :offset="1">
              <img src="https://n5gm.wanyuenet.com/captcha/math?i23UYInH" style="height: 100%;width: 100%;">
            </a-col>
          </a-row>
          -->
          <img src="https://n5gm.wanyuenet.com/captcha/math?i23UYInH" style="height: 100%;width: 100%;">
        </template>
      </ant-form>
    </main>
  </div>
  <footer>
    <a-typography-text type="secondary" v-if="VITE_APP_COPYRIGHT">
      &copy;{{ VITE_APP_COPYRIGHT }}
    </a-typography-text>
  </footer>
</template>

<style scoped lang="less">
#container {
  width: 30rem;
  height: 20rem;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  header {
    height: 20%;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    label {
      font-size: 1.4rem;
    }
  }
  main {
    height: 80%;
    padding: 1rem;
  }
}
footer {
  height: 4rem;
  color: #ccc;
  position: absolute;
  width: 100%;
  bottom: 1px;
  text-align: center;
  line-height: 4rem;
  font-size: 1rem;
}
</style>
