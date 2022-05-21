<script setup lang="ts">
import { icon } from '@/composables/icon'
</script>

<template>
  <ant-layout :has-breadcrumb="false">
    <template #header>
      <div class="header">
        <div class="item-left">
          <div>
            <p><icon is="icon-user-avatar" :style="{ fontSize: '50px' }"/></p>
          </div>
          <div style="margin-left: 1rem;">
            <p><h1>管理员</h1></p>
            <p><a-typography-text type="secondary">欢迎回来！</a-typography-text></p>
          </div>
        </div>
        <div class="item-right">
          <a-row>
            <a-col>
              <a-statistic title="订单数" :value="92032" class="sep" />
            </a-col>
            <a-col>
              <a-divider type="vertical" class="sep" style="height: 100%;" />
            </a-col>
            <a-col>
              <a-statistic title="商品数" :value="283292" class="sep" />
            </a-col>
            <a-col>
              <a-divider type="vertical" class="sep" style="height: 100%;" />
            </a-col>
            <a-col>
              <a-statistic title="入驻商家" :value="13323" />
            </a-col>
          </a-row>
        </div>
      </div>
    </template>
    <a-card title="快捷导航" :bordered="false">
      <p>Hello1</p>
    </a-card>
    <a-card title="操作日志" style="margin-top: 1.2rem" :bordered="false">
      <p>Hello2</p>
    </a-card>
    <a-card style="margin-top: 1.2rem;" :bordered="false">
      <p>Hello3</p>
    </a-card>
  </ant-layout>
</template>

<style scoped>
.header {
  margin-top: 1rem;
  height: 120px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}
.item-left {
  margin-left: 1rem;
  width: 40%;
  display: flex;
  align-items: center;
}
.item-right {
  margin-right: 1rem;
  display: flex;
}
.sep {
  padding-right: 2rem;
}
</style>
