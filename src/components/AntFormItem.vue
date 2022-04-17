<script setup lang="ts">
import type {Ref} from 'vue'
import type {FormItemRule, FormItemSelectOption, FormItemSize, FormItemType} from '@/utils/types/ant'

const props = withDefaults(defineProps<{
  is: FormItemType,
  name: string,
  label?: string,
  size?: FormItemSize
  modelValue?: string | undefined,
  options?: Ref<FormItemSelectOption[]>,
  rules?: FormItemRule,
  prefixIcon?: string,
}>(), {
  is: 'input',
  label: '',
  modelValue: undefined
})

const componentType = computed(() => props.is.replace(/^\S/, s => s.toUpperCase()))

const componentPlaceholder = computed(() => {
  return `${props.is === 'input' ? '请输入' : '请选择'}${props.label}`
})

const currentComponent = defineAsyncComponent(async () => {
  return import('ant-design-vue').then(module => {
    return module[componentType.value as keyof typeof import('ant-design-vue/lib/index')]
  })
})
</script>

<template>
  <a-form-item
    :name="name"
    :label="label"
  >
    <component
      :is="currentComponent"
      :value="modelValue"
      :placeholder="componentPlaceholder"
      :options="options"
      :size="size as FormItemSize || 'default'"
      :rules="rules"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <template #prefix>
        <ant-icon :is="prefixIcon" />
      </template>
    </component>
  </a-form-item>
</template>
