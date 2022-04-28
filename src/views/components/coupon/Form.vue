<script setup lang="ts">
import type {FormItem} from '@/types/ant'

const items: Array<FormItem[]> = [
  [{
    type: 'Input',
    label: '姓名',
    name: 'name',
  },
  {
    type: 'Input',
    label: '年龄',
    name: 'age',
  }],
  [{
    type: 'Input',
    label: '邮箱',
    name: 'email',
  },
  {
    type: 'Input',
    label: '电话',
    name: 'phone',
  }],
]
</script>

<template>
  <ant-form
    :items="items"
  />
</template>
