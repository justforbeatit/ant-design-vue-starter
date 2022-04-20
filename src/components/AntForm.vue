<script setup lang="ts">
import type { FormItem, FormItemButton, FormItemRule } from '@/utils/types/ant'
import type { ApiResponse } from "@/utils/types/http"

const props = withDefaults(defineProps<
  {
    items: Array<FormItem>,
    values: JsonData,
    rules?: FormItemRule,
    labelCol?: { span: number },
    wrapperCol?: { span: number },
    button?: FormItemButton | null,
    submit?: (payload: JsonData) => Promise<ApiResponse<JsonData>>,
    jumpTo?: { name: string, params?: JsonData } | null,
  }
>(), {
    values: undefined,
    labelCol: () => ({ span: 4 }),
    wrapperCol: () => ({ span: 20 }),
    button: () => ({
      text: '提交',
      type: 'primary',
      size: 'default',
      disabled: false,
      block: false,
    }),
})

const emits = defineEmits<
  {
    (e: 'on-finished', payload: JsonData): void,
  }
>()

const { values, button, submit, jumpTo } = props
const state = ref(values)
const loading = ref(false)
const router = useRouter()

const triggerSubmit = () => {
  loading.value = true
  setTimeout(async () => {
    emits('on-finished', toRaw(state.value))
    if (submit) {
      const { ok, msg } = await submit(toRaw(state.value))
      if (!ok) {
        return error(msg)
      }
      success(msg ?? `${button?.text || ''}成功`)
      jumpTo && router.push(jumpTo)
    }
  }, 2000)
}
</script>

<template>
  <a-form
    name="ant-form"
    :model="state"
    :labelCol="labelCol"
    :wrapperCol="wrapperCol"
    @finish="triggerSubmit"
  >
    <template v-for="item in items" :key="item.name">
      <a-form-item v-if="item.type === 'Custom'"
        :name="item.name"
        :label="item.label"
        :rules="item.required !== false
          ? [{ required: true, message: item?.placeholder }, ...(item.rules as FormItemRule || []) ]
          : []
        "
      >
        <slot name="custom" :item="item" :state="state"></slot>
      </a-form-item>
      <ant-form-item v-else
        v-model="state[item.name]"
        :is="item.type"
        :name="item.name"
        :label="item?.label || ''"
        :placeholder="item.placeholder"
        :autocomplete="item?.autocomplete"
        :prefixIcon="item.prefixIcon"
        :rules="item.required !== false
          ? [{ required: true, message: item?.placeholder }, ...(item.rules as FormItemRule || []) ]
          : []
        "
      />
    </template>
    <template v-if="button">
      <a-form-item>
        <a-button
          html-type="submit"
          :type="(button as FormItemButton).type"
          :size="(button as FormItemButton).size"
          :block="(button as FormItemButton).block"
          :loading="loading"
        >
          {{(button as FormItemButton).text}}
        </a-button>
      </a-form-item>
    </template>
  </a-form>
</template>
