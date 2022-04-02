<script setup lang="ts">
const title = import.meta.env.VITE_APP_TITLE
const theme = import.meta.env.VITE_APP_THEME
const copyright = import.meta.env.VITE_APP_COPYRIGHT

const container = ref(null)
const collapsed = ref(false)
const selectedKeys = ref(['1'])
const activiteKey = ref('1')

const panes = ref([
  { title: 'Workspace1', content: 'Content of Tab 1', key: '1' },
  { title: 'Workspace2', content: 'Content of Tab 2', key: '2' },
])

const toggleSider = useToggle(collapsed)

const { toggle: toggleFullscreen } = useFullscreen(container.value)

const onTabEdited = () => ({})

const onTabChanged = (key: string) => {
  activiteKey.value = key
}

</script>

<template>
  <a-layout ref="container">
    <a-layout-sider
      collapsible
      :collapsedWidth="48"
      v-model:collapsed="collapsed"
      :trigger="null"
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
      :theme="theme"
    >
      <div class="logo">
        <span v-if="!collapsed"><ant-logo />{{ title }}</span>
        <span v-else ><ant-logo /></span>
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
    <a-layout :style="{ marginLeft: collapsed ? '48px' : '200px' }">
      <a-layout-header class="layout-header">
        <div class="layout-header-toggle">
          <MenuUnfoldOutlined v-if="collapsed" class="trigger" @click="toggleSider" />
          <MenuFoldOutlined v-else class="trigger" @click="toggleSider" />
        </div>
        <div class="layout-header-actions">
          <FullscreenOutlined
            @click="toggleFullscreen"
            style="margin-right: 1rem;font-size: 1rem;cursor: pointer;"
          />
          <a-dropdown placement="bottomRight">
            <span>
              <UserOutlined /> 管理员
              <DownOutlined style="cursor: pointer;" />
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <EditOutlined />
                  <span>修改密码</span>
                </a-menu-item>
                <a-menu-item>
                  <LogoutOutlined />
                  <span>退出登录</span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content>
        <div :style="{ paddingTop: '0.5rem', minHeight: '90vh', background: '#fff'}">
          <a-tabs :tabBarStyle="{ paddingLeft: '1rem' }"
            v-model:activiteKey="activiteKey"
            type="editable-card"
            @change="onTabChanged"
            @edit="onTabEdited"
            hideAdd
          >
            <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title">
              <template v-if="pane.key === activiteKey">{{ pane.content }}</template>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        <a-typography-text type="secondary" v-if="copyright">&copy;{{ copyright }}</a-typography-text>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
  font-weight: 700;
  font-size: 1.1rem;
  color: #fff;
}
.trigger {
  font-size: 1.2rem;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
.trigger:hover {
  color: #1890ff;
}
.layout-header {
  background: #fff;
  padding: 0 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  z-index: 9;
  box-shadow:0 1px 4px rgb(0 21 41 / 8%);
}
.layout-header-toggle {
  height: 100%;
  display: flex;
  align-items: center;
}
.layout-header-actions {
  height: 100%;
  margin-right: 24px;
  display: flex;
  align-items: center;
}
</style>
