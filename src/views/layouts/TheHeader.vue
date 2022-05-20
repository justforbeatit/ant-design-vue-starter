<script setup lang="ts">
import { useMenuStore } from '@/store/menu'
import { useUserStore } from '@/store/user'

const container = ref(null)
const router = useRouter()
const menu = useMenuStore()
const user = useUserStore()
const { isFullscreen, toggle: toggleFullscreen } = useFullscreen(container.value)
const username = ref()

const logout = () => {
  sure('确定退出登录？').then(async () => {
    const { ok } = await useRequest().auth.logout()
    if (ok) {
      user.removeAccessToken()
      router.push({ name: 'auth-login' })
    }
  })
}

onMounted(async () => {
  const userinfo = await user.getUserInfo()
  username.value = userinfo?.name
})
</script>

<template>
  <a-layout-header class="layout-header">
    <div class="layout-header-toggle">
      <MenuUnfoldOutlined v-if="menu.collapsed" class="trigger" @click="menu.toggle" />
      <MenuFoldOutlined v-else class="trigger" @click="menu.toggle" />
    </div>
    <div class="layout-header-actions">
      <FullscreenOutlined v-if="!isFullscreen" @click="toggleFullscreen" class="fullscreen" />
      <FullscreenExitOutlined v-else @click="toggleFullscreen" class="fullscreen" />
      <a-dropdown placement="bottomRight">
        <div style="display: inline-block;">
          <a-avatar style="background-color: #1890ff" size="small">
            <template #icon><UserOutlined /></template>
          </a-avatar>
          <span style="padding: 0.3rem;cursor: pointer;">{{ username ?? '--' }}</span>
          <DownOutlined style="cursor: pointer;" />
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <EditOutlined />
              <span> 修改密码</span>
            </a-menu-item>
            <a-menu-item>
              <LogoutOutlined />
              <span @click="logout"> 退出登录</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<style scoped>
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
  font-size: 1rem;
}
.trigger {
  font-size: 20px;
  cursor: pointer;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  margin-left: 1rem;
}
.trigger:hover {
  color: #1890ff;
}
.fullscreen {
  margin-right: 1rem;
  font-size: 1rem;
  cursor: pointer;
  line-height: 48px;
}
</style>
