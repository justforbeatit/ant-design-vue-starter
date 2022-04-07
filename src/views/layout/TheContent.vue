<script setup lang="ts">
import type {Ref} from 'vue'
import type {MenuItem} from '@/utils/types/ant'
import { useMenuStore } from '@/store/menu'

const activeKey = ref()
const panes = ref<Array<{key: string, title: string}>>([])
const menu = useMenuStore()
const router = useRouter()
const { current: currentMenu } = storeToRefs(menu)

const onTabEdited = (targetKey: string | MouseEvent, action: string) => {
  if (action === 'remove') {
    panes.value = panes.value.filter(pane => pane.key !== targetKey)
    const { key } = panes.value.at(-1)!
    tabChangeTo(key)
  }
}

const tabChangeTo = (key: string) => {
  activeKey.value = key
  router.push({ name: key })
}

watch(() => (currentMenu as Ref<MenuItem>).value, ({ name: title, route: key }) => {
  if (!key) return
  if (!panes.value.find(pane => pane.key === key)) {
    panes.value.push({ key, title })
  }
  activeKey.value = key
})
</script>

<template>
  <a-layout-content>
    <div :style="{ paddingTop: '0.5rem', background: '#fff'}">
      <a-tabs
        :tabBarStyle="{ paddingLeft: '1rem' }"
        v-model:activeKey="activeKey"
        type="editable-card"
        @change="tabChangeTo"
        @edit="onTabEdited"
        hideAdd
      >
        <a-tab-pane
          v-for="(pane, index) in panes"
          :key="pane.key"
          :tab="pane.title"
          :closable="index !== 0"
        >
          <template v-if="pane.key === activeKey">
            <div id="content">
              <router-view />
            </div>
          </template>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-layout-content>
</template>

<style scoped>
#content {
  height: 100vh;
  background: #f0f2f5;
}
</style>
