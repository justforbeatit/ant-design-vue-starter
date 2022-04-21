<script setup lang="ts">
import type { FormItem } from '@/utils/types/ant'

const { items, values } = withDefaults(defineProps<{
  items: FormItem[],
  values?: JsonData
  labelCol?: { span: number },
}>(), {
  labelCol: () => ({ span: 4 }),
  values: () => ({})
})

const state = ref(values)

const shouldFormatItems = computed(() => {
  return items.filter(({ type }: FormItem) => [
      'DatePicker', 'RangePicker'
    ].includes(type)).map(_ => _.name)
})

const emits = defineEmits<{
  (e: 'on-search', values: JsonData): void
}>()

const search = () => {
  const data = Object.entries(state.value).filter(_ => _[1]).reduce((_, [k, v]) => {
    _[k] = shouldFormatItems.value.includes(k) ? v.format('YYYY-MM-DD') : v
    return _
  }, {} as JsonData)
  emits('on-search', data)
}
</script>

<template>
  <a-form
    :labelCol="labelCol"
    :model="state"
  >
    <a-row :gutter="24">
      <a-col :span="7" v-for="item in items" :key="item.name">
        <a-form-item v-if="item.type === 'Custom'"
        :name="item.name"
        :label="item.label"
        >
          <slot name="custom" :item="item" :state="state"></slot>
        </a-form-item>
        <ant-form-item v-else
          :is="item.type"
          :label="item.label"
          :name="item.name"
          :options="item.options"
          v-model="state[item.name]"
        />
      </a-col>
      <a-col :span="3">
        <a-form-item>
          <a-button type="primary" @click="search">
            <SearchOutlined style="font-size: large;"/>
          </a-button>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>
