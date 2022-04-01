<script setup lang="ts">
const title = import.meta.env.VITE_APP_TITLE
const theme = import.meta.env.VITE_APP_THEME
const container = ref(null)
const collapsed = ref(false)
const selectedKeys = ref(['1'])

const toggleSider = () => collapsed.value = !collapsed.value

const { toggle: toggleFullscreen } = useFullscreen(container.value)
</script>

<template>
  <a-layout ref="container">
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
      <a-layout-header class="layout-header">
        <div class="layout-header-toggle">
          <MenuUnfoldOutlined v-if="collapsed" class="trigger" @click="toggleSider" />
          <MenuFoldOutlined v-else class="trigger" @click="toggleSider" />
        </div>
        <div class="layout-header-actions">
          <FullscreenOutlined
            @click="toggleFullscreen"
            style="margin-right: 1.4rem;font-size: 1rem;cursor: pointer;"
          />
          <a-dropdown>
            <span>
              <UserOutlined /> 管理员
              <DownOutlined style="cursor: pointer;" />
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <LogoutOutlined />
                  <span>退出登录</span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '80vh' }">
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
.layout-header {
  background: #fff;
  padding: 0;
  display: flex;
  justify-content: space-between;
}
.layout-header-actions {
  margin-right: 24px;
}
</style>
