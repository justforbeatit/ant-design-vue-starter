<script setup lang="ts">
import {ref} from 'vue'

const title = import.meta.env.VITE_APP_TITLE
const theme = import.meta.env.VITE_APP_THEME
const selectedKeys = ref(['1'])
const collapsed = ref(false)

const toggleCollapse = () => collapsed.value = !collapsed.value
</script>

<template>
  <a-layout>
    <a-layout-sider
      collapsible
      v-model:collapsed="collapsed"
      :trigger="null"
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
      :theme="theme"
    >
      <div class="logo">
        <span v-if="!collapsed">{{ title }}</span>
        <span v-else>LOGO</span>
      </div>
      <a-menu :theme="theme" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <UserOutlined />
          <span class="nav-text">菜单一</span>
        </a-menu-item>
        <a-sub-menu key="2">
          <template #title>
            <span slot="title">
              <SettingOutlined />
              <span class="nav-text">菜单二</span>
            </span>
          </template>
          <a-menu-item key="2-1">
            <span class="nav-text">菜单二01</span>
          </a-menu-item>
          <a-menu-item key="2-2">
            <span class="nav-text">菜单二02</span>
          </a-menu-item>
          <a-menu-item key="2-3">
            <span class="nav-text">菜单二03</span>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="3">
          <UploadOutlined />
          <span class="nav-text">菜单三</span>
        </a-menu-item>
        <a-menu-item key="4">
          <BarChartOutlined />
          <span class="nav-text">菜单四</span>
        </a-menu-item>
        <a-menu-item key="5">
          <AppstoreOutlined />
          <span class="nav-text">菜单五</span>
        </a-menu-item>
        <a-menu-item key="6">
          <TeamOutlined />
          <span class="nav-text">菜单六</span>
        </a-menu-item>
        <a-menu-item key="7">
          <ShopOutlined />
          <span class="nav-text">菜单七</span>
        </a-menu-item>
        <a-menu-item key="8">
          <CloudOutlined />
          <span class="nav-text">菜单八</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: collapsed ? '80px' : '200px' }">
      <a-layout-header style="background: #fff; padding: 0;">
        <MenuUnfoldOutlined v-if="collapsed" class="trigger" @click="toggleCollapse" />
        <MenuFoldOutlined v-else class="trigger" @click="toggleCollapse" />
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
          <p>xxxxxxxxxx</p>
          <p>xxxxxxxxxx</p>
          <p>xxxxxxxxxx</p>
          <p>xxxxxxxxxx</p>
          <p>xxxxxxxxxx</p>
          <p>xxxxxxxxxx</p>
          <p>xxxxxxxxxx</p>
          <p>xxxxxxxxxx</p>
          <p>xxxxxxxxxx</p>
          <p>xxxxxxxxxx</p>
          <p>xxxxxxxxxx</p>
          <p>xxxxxxxxxx</p>
          <p>xxxxxxxxxx</p>
          <p>xxxxxxxxxx</p>
          <p>xxxxxxxxxx</p>
          <p>xxxxxxxxxx</p>
          <p>xxxxxxxxxx</p>
          <p>xxxxxxxxxx</p>
          <p>xxxxxxxxxx</p>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        &copy2022 北京万悦信息科技有限公司
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0.8rem;
  text-align: center;
  line-height: 32px;
  font-weight: 700;
  font-size: 1.2rem;
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
.trigger:hover {
  color: #1890ff;
}
</style>
