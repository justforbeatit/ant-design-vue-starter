<script setup lang="ts">
import type {FormItemSelectOption, FormItemType} from '@/utils/types/ant'
import type {MaybeRef} from '@vueuse/shared';

const props = withDefaults(defineProps<{
  is: FormItemType,
  name: string,
  label?: string,
  modelValue?: string | undefined,
  options?: MaybeRef<FormItemSelectOption[]>,
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
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </a-form-item>
</template>
