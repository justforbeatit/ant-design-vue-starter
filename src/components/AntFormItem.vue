<script setup lang="ts">
import type {Ref} from 'vue'
import type {FormItemRule, FormItemSelectOption, FormItemSize} from '@/utils/types/ant'

const props = withDefaults(defineProps<{
  is: AntComponent,
  name: string,
  label?: string,
  placeholder?: string,
  size?: FormItemSize
  modelValue?: string | undefined,
  options?: Ref<FormItemSelectOption[]>,
  rules?: FormItemRule,
  autocomplete?: boolean,
  prefixIcon?: string | undefined,
}>(), {
  label: '',
  autocomplete: false,
  prefixIcon: undefined
})

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | number): void,
  (e: 'change', value: string | number): void
}>()

const importComponentStyle = (component: AntComponent) => {
  if (component.startsWith('Input')) {
    import('ant-design-vue/lib/input/style/index.css')
  } else if (component === 'Select') {
    import('ant-design-vue/lib/select/style/index.css')
  } else if (component === 'DatePicker') {
    import('ant-design-vue/lib/date-picker/style/index.css')
  }
}

const currentComponent = defineAsyncComponent(async () => {
  const { is: component } = props
  importComponentStyle(component)
  return import('ant-design-vue').then(module => module[<AntComponent>component])
})

const change = (value: string | number) => {
  emits('update:modelValue', value)
  emits('change', value)
}
</script>

<template>
  <a-form-item
    :name="name"
    :label="label"
    :rules="rules"
  >
    <component
      :is="currentComponent"
      :value="modelValue"
      :placeholder="`请${is.startsWith('Input') ? '输入' : '选择'}${placeholder ? placeholder : label}`"
      :options="options"
      :size="size as FormItemSize || 'default'"
      :style="{ width: '100%' }"
      :autocomplete="autocomplete ? 'on' : 'off'"
      @input="$emit('update:modelValue', $event.target.value)"
      @change="change"
    >
      <template #prefix v-if="prefixIcon">
        <ant-icon :is="prefixIcon" class="icon-gray" />
      </template>
    </component>
  </a-form-item>
</template>

<style scoped>
.icon-gray {
  color: #ccc;
}
</style>
