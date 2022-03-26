<script setup lang="ts">
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <div id="container">
    <header><label>xxx后台管理系统</label></header>
    <main>
      <a-form>
        <a-form-item>
          <a-input placeholder="请输入用户名" size="large">
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-password type="password" size="large" placeholder="请输入密码">
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-row >
            <a-col :span="16">
              <a-input type="password" size="large" placeholder="请输入验证码">
                <template #prefix>
                  <SafetyOutlined />
                </template>
              </a-input>
            </a-col>
            <a-col :span="7" :offset="1">
              <img src="https://n5gm.wanyuenet.com/captcha/math?i23UYInH" style="height: 100%;width: 100%;">
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" size="large" block>
            登录
          </a-button>
        </a-form-item>
      </a-form>
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
  color: #fff;
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
