<script setup lang="ts">
import type { ApiResponse } from '@/utils/http/core'
import type { CascaderProps } from 'ant-design-vue'

const { selected } = defineProps<{
  selected?: string[]
}>()

const emit = defineEmits<{
  (e: 'change', value: Array<number>): void
}>()

const fetchOptions = async (): Promise<CascaderProps['options'][]> => {
  const { data } = await useRequest<ApiResponse<CascaderProps['options'][]>>().common.provinces()
  return data
}

const fetchData = async (pid: number | string): Promise<CascaderProps['options'][]> => {
  const { data } = await useRequest<ApiResponse<CascaderProps['options'][]>>().common.areas({ pid })
  return data
}

const value = ref(selected || [])

const onChange = (value: number[]) => emit('change', value)

</script>

<template>
  <ant-cascader
    v-model="value"
    :fetchOptions="fetchOptions"
    :fetchData="fetchData"
    @change="onChange"
  />
</template>
