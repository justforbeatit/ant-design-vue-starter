<script setup lang="ts">
import type {MenuItem} from '@/utils/types/ant'

const title = import.meta.env.VITE_APP_TITLE
const theme = import.meta.env.VITE_APP_THEME
const copyright = import.meta.env?.VITE_APP_COPYRIGHT

const container = ref(null)
const collapsed = ref(false)
const selectedKeys = ref([1])
const activiteKey = ref('1')
const menus = ref<MenuItem[]>()

const panes = ref([
  { title: '工作台', key: '1' },
])

const toggleSider = useToggle(collapsed)

const { toggle: toggleFullscreen } = useFullscreen(container.value)

const onTabEdited = () => ({})

const onTabChanged = (key: string) => {
  activiteKey.value = key
}

onMounted(async () => {
  const { data }= await useRequest().menus.query()
  menus.value = data
})
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
        <span>
          <ant-logo />
          <template v-if="!collapsed">{{ title }}</template>
        </span>
      </div>
      <a-menu :theme="theme" mode="inline" v-model:selectedKeys="selectedKeys">
        <template v-for="menu in menus" :key="menu.key">
          <a-menu-item v-if="!menu.children" :key="menu.id">
            <ant-icon v-if="menu.icon" :is="menu.icon" />
            <span class="nav-text">{{ menu.name }}</span>
          </a-menu-item>
          <template v-else>
            <a-sub-menu :key="menu.id">
              <template #title>
                <span slot="title">
                  <ant-icon v-if="menu.icon" :is="menu.icon" />
                  <span class="nav-text">{{ menu.name }}</span>
                </span>
              </template>
              <a-menu-item v-for="submenu in menu.children" :key="submenu.id">
                <span class="nav-text">{{ submenu.name }}</span>
              </a-menu-item>
            </a-sub-menu>
          </template>
        </template>
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
        <div :style="{ paddingTop: '0.5rem', background: '#fff'}">
          <a-tabs :tabBarStyle="{ paddingLeft: '1rem' }"
            v-model:activiteKey="activiteKey"
            type="editable-card"
            @change="onTabChanged"
            @edit="onTabEdited"
            hideAdd
          >
            <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title">
              <template v-if="pane.key === activiteKey">
                <div id="content">
                  <router-view />
                </div>
              </template>
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
  line-height: 48px;
}
#content {
  height: 100vh;
  background: #f0f2f5;
}
</style>
