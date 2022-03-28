<script setup lang="ts">
import { SafetyOutlined } from '@ant-design/icons-vue'
import AntdForm from '@/components/antd/AntdForm.vue'
import type {FormItem} from '@/types/antd';
import {useRequest} from '@/utils/http/core';
import {success} from '@/utils/message';
import {useRouter} from 'vue-router';

const title = import.meta.env.VITE_APP_TITLE
const router = useRouter()

const items: FormItem[] = [{
  type: 'input',
  name: 'username',
  placeholder: '请输入用户名',
  size: 'large',
  prefix: { type: 'icon', value: 'UserOutlined' }
}, {
  type: 'input',
  name: 'password',
  placeholder: '请输入密码',
  size: 'large',
  prefix: { type: 'icon', value: 'LockOutlined' }
}, {
  type: 'custom',
  name: 'captcha',
  placeholder: '请输入验证码',
  size: 'large',
}]

const values = {
  username: '',
  password: '',
  captcha: '',
}

const rules = {
  username: [
    { required: true, message: '请输入用户名' },
    { min: 4, message: '用户名至少 4 个字符' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
  ],
  password: [
    { required: true, message: '请输入密码' },
    { min: 4, message: '密码至少 4 个字符' },
  ],
  captcha: [
    { required: true, message: '请输入验证码' },
  ],
}

const login = async (payload: JsonData) => {
  const { ok, data } = await useRequest().auth.login(payload)
  if (!ok) {
    console.info(data)
    return
  }
  success('登录成功')
  router.push({ name: 'home' })
}

</script>

<template>
  <div id="container">
    <header><label>{{ title }}</label></header>
    <main>
      <antd-form
        :label-col="{ span: 0 }"
        :wrapper-col="{ span: 24 }"
        :items="items"
        :values="values"
        :rules="rules"
        :button="{ text: '登录', type: 'primary', size: 'large', block: true }"
        @on-validated="login"
      >
        <template #custom ="{ item, state }">
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
        </template>
      </antd-form>
    </main>
  </div>
  <footer>
    <a-typography-text type="secondary">&copy;2022版权所有</a-typography-text>
  </footer>
</template>

<style scoped>
#container {
  width: 30rem;
  height: 20rem;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

header {
  height: 20%;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

header label {
  font-size: 1.4rem;
}

main {
  height: 80%;
  padding: 1rem;
}

footer {
  height: 4rem;
  font-size: 0.8rem;
  color: #ccc;
  position: absolute;
  width: 100%;
  bottom: 1px;
  text-align: center;
  line-height: 4rem;
  font-size: 1rem;
}
</style>
