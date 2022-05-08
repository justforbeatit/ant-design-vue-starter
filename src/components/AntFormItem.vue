<script setup lang="ts">
import type {FormItemRule, FormItemSelectOption, FormItemSize} from '@/types/ant'
import icon from '@/composables/icon'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

const { is: component, name, options } = withDefaults(defineProps<{
  is: AntComponent,
  name: string,
  label?: string,
  placeholder?: string,
  size?: FormItemSize
  modelValue?: string | Object,
  options?: () => Promise<Array<FormItemSelectOption>>,
  rules?: FormItemRule,
  autocomplete?: boolean,
  prefixIcon?: string,
}>(), {
  label: '',
  autocomplete: false,
})

const hasSettedLocale = ref(false)
const selection = ref<{[name: string]: FormItemSelectOption[]}>({})

const emit = defineEmits<{
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
  importComponentStyle(component)
  return import('ant-design-vue').then(module => module[<AntComponent>component])
})

const change = (value: string | number) => {
  emit('update:modelValue', value)
  emit('change', value)
}

watchEffect(() => {
  if (!hasSettedLocale.value && ['DatePicker', 'RangePicker'].includes(component)) {
    dayjs.locale('zh-cn')
    hasSettedLocale.value = true
  }
})

onMounted(async () => {
  if (options && !selection.value[name]) {
    selection.value[name] = await options()
  }
})
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
      :options="selection[name] || []"
      :placeholder="placeholder ? placeholder
        : `请${component.startsWith('Input') ? '输入' : '选择'}${label}`
      "
      :size="size as FormItemSize || 'default'"
      :style="{ width: '100%' }"
      :autocomplete="autocomplete ? 'on' : 'off'"
      @input="$emit('update:modelValue', $event.target.value)"
      @change="change"
    >
      <template #prefix v-if="prefixIcon">
        <icon :is="prefixIcon as string" class="icon-gray" />
      </template>
    </component>
  </a-form-item>
</template>

<style scoped>
.icon-gray {
  color: #ccc;
}
</style>
