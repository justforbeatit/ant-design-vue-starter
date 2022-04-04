<script setup lang="ts">
const activiteKey = ref('1')
const panes = ref([
  { title: '工作台', key: '1' },
])

const onTabEdited = () => ({})

const onTabChanged = (key: string) => {
  activiteKey.value = key
}
</script>

<template>
  <a-layout-content>
    <div :style="{ paddingTop: '0.5rem', background: '#fff'}">
      <a-tabs
        :tabBarStyle="{ paddingLeft: '1rem' }"
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
</template>

<style scoped>
#content {
  height: 100vh;
  background: #f0f2f5;
}
</style>
