<script setup lang="ts">
import type { FormItem, FormItemButton, FormItemRule } from '@/types/ant'
import type { ApiResponse } from "@/utils/http/core"

const { values, button, submit, jumpTo } = withDefaults(defineProps<
  {
    items: Array<FormItem>,
    values?: JsonData,
    rules?: FormItemRule,
    labelCol?: { span: number },
    wrapperCol?: { span: number },
    button?: FormItemButton | null,
    submit?: (payload: JsonData) => Promise<ApiResponse<JsonData>>,
    jumpTo?: { name: string, params?: JsonData } | null,
  }
>(), {
    values: () => ({}),
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

const emit = defineEmits<
  {
    (e: 'on-submit', payload: JsonData): void,
  }
>()

const state = ref(values)
const loading = ref(false)
const router = useRouter()

const isMultipleItems = (_: FormItem | FormItem[]): boolean => {
  return Object.prototype.toString.call(_) === '[object Array]'
}

const triggerSubmit = () => {
  loading.value = true
  setTimeout(async () => {
    emit('on-submit', toRaw(state.value))
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
    <a-row :gutter="24" v-for="(_, index) in items" :key="index">
      <a-col
        v-for="(item, index) in (isMultipleItems(_) ? _ : [_])"
        :key="index"
        :span="(item as FormItem)?.wrapperCol?.span || 24"
        :offset="(item as FormItem)?.wrapperCol?.offset || 0"
      >
        <a-form-item v-if="(item as FormItem).type === 'Custom'"
          :name="(item as FormItem).name"
          :label="(item as FormItem).label"
          :rules="(item as FormItem).rules as FormItemRule || []"
        >
          <slot name="custom" :item="item" :state="state"></slot>
        </a-form-item>
        <ant-form-item v-else
          v-model="state[(item as FormItem).name]"
          :is="(item as FormItem).type"
          :name="(item as FormItem).name"
          :label="(item as FormItem)?.label || ''"
          :placeholder="(item as FormItem).placeholder"
          :autocomplete="(item as FormItem)?.autocomplete"
          :size="(item as FormItem)?.size || 'default'"
          :prefixIcon="(item as FormItem).prefixIcon"
          :options="(item as FormItem).options"
          :rules="(item as FormItem).required !== false
            ? [{
              required: true,
              message: (item as FormItem)?.placeholder
                ? (item as FormItem).placeholder
                : `请${(item as FormItem).type.startsWith('Input')
                  ? '输入' : '选择'}${(item as FormItem).label}`
            }, ...((item as FormItem).rules as FormItemRule || [])]
            : []
          "
        />
      </a-col>
    </a-row>
    <a-form-item>
      <slot name="button" :loading="loading">
        <a-button
          html-type="submit"
          :type="(button as FormItemButton).type"
          :size="(button as FormItemButton).size"
          :block="(button as FormItemButton).block"
          :loading="loading"
        >
          {{(button as FormItemButton).text}}
        </a-button>
      </slot>
    </a-form-item>
  </a-form>
</template>
