<script setup lang="ts">
import type { CascaderProps } from 'ant-design-vue'

const { fetchOptions, fetchData } = withDefaults(defineProps<{
  modelValue?: Array<string>,
  placeholder?: string,
  style?: {
    minWidth: string,
  },
  fetchOptions: () => Promise<Array<CascaderProps['options']>>
  fetchData: (value: string | number) => Promise<Array<CascaderProps['options']>>
}>(), {
  modelValue: () => [],
  placeholder: '请选择',
  style: () => ({
    minWidth: '300px'
  }),
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Array<string>): void,
  (e: 'change', value: Array<string | number>): void
}>()

const options = ref<CascaderProps['options']>([])

const loadData: CascaderProps['loadData'] = async (selectedOptions) => {
  const targetOption = selectedOptions[selectedOptions.length - 1]
  targetOption.loading = true
  const data = await fetchData(<number | string>targetOption.value) as CascaderProps['options'][]
  targetOption.children = <CascaderProps['options']>data
  targetOption.loading = false
}

const onChange = (value: Array<string | number>, options: Array<JsonData>) => {
  emit('update:modelValue', options.map(_ => _.label))
  emit('change', value)
}

onMounted(async () => options.value = await fetchOptions() as CascaderProps['options'])
</script>

<template>
  <a-cascader
    :value="modelValue"
    :options="options"
    :load-data="loadData"
    :placeholder="placeholder"
    :style="style"
    @change="onChange"
  />
</template>
