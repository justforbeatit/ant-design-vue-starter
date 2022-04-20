<script setup lang="ts">
import type {FormItem, FormItemSelectOption} from '@/utils/types/ant'

const { items, values, options } = withDefaults(defineProps<{
  items: FormItem[],
  values: JsonData
  labelCol?: { span: number },
  options?: FormItemSelectOption[],
}>(), {
  labelCol: () => ({ span: 4 }),
})

const state = ref(values)
const atNextRow = computed(() => items.length % 3 === 0)

const search = () => {
  console.info(state.value)
}
</script>

<template>
  <a-form
    :labelCol="labelCol"
    :model="state"
  >
    <a-row :gutter="24">
      <template v-for="item in items" :key="item.name">
        <a-col :span="8">
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
            :options="options"
            v-model="state[item.name]"
          />
        </a-col>
      </template>
      <a-col :span="8" v-if="!atNextRow">
        <a-form-item>
          <a-button type="primary" @click="search"><SearchOutlined style="font-size: large;"/></a-button>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row v-if="atNextRow">
      <a-col :span="24" style="text-align: right;">
        <a-form-item>
          <a-button type="primary" @click="search"><SearchOutlined style="font-size: large;"/></a-button>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>
