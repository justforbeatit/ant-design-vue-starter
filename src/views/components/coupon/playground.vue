<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible class="sider">
      <div class="logo">
        <logo />
        <template v-if="!collapsed">xxx后台管理系统</template>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: collapsed ? '48px' : '200px' } ">
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
      >
        Content<br>
        Content<br>
        Content<br>
        Content<br>
        Content<br>
        Content<br>
        Content<br>
        Content<br>
        Content<br>
        Content<br>
        Content<br>
        Content<br>
        Content<br>
        Content<br>
        Content<br>
        Content<br>
        Content<br>
        Content<br>
        Content<br>
        Content<br>
        Content<br>
        Content<br>
        Content<br>
        Content<br>
        Content<br>
        Content<br>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';

import logo from '@/composables/logo';

export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    logo,
  },
  setup() {
    return {
      selectedKeys: ref<string[]>(['1']),
      collapsed: ref<boolean>(false),
    };
  },
});
</script>
<style lang="less">
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

.sider {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;

}

.logo {
  height: 32px;
  //background: rgba(255, 255, 255, 0.3);
  margin: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-weight: 600;
  color: #fff;
}

.site-layout-background {
  background: #fff;
}
</style>

