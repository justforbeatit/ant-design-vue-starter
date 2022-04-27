<script setup lang="ts">
import type { FormItemButton } from '@/types/ant'

withDefaults(defineProps<{
  title: string,
  button?: FormItemButton,
  size?: 'default' | 'large',
}>(), {
  size: 'large',
  button: () => ({
    type: 'primary',
    size: 'default',
    disabled: false,
    block: false,
  }),
})

const visible = ref(false)
</script>

<template>
  <a-button :type="button.type || 'primary'" @click="visible = true">
    {{ button.text || title }}
  </a-button>
  <a-drawer
    :title="title"
    :size="size"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    :closable="false"
    :mask-closable="true"
    @close="visible = false"
  >
    <slot></slot>
    <template #extra>
      <a-space>
        <close-outlined class="close-icon" @click="visible = false" />
      </a-space>
    </template>
  </a-drawer>
</template>

<style scoped>
.close-btn {
  color: gray;
  font-size: 1rem;
  cursor: pointer;
}
</style>
