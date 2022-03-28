<script setup lang="ts">
import { ref, toRaw } from 'vue'
import { useRouter } from 'vue-router';
import { Form } from 'ant-design-vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import type { FormItem, FormItemSize, FormItemButton, FormItemButtonType, FormItemRule } from '@/types/antd'
import { success } from '@/utils/message';

const loading = ref(false)
const router = useRouter()

const props = withDefaults(defineProps<
  {
    items: Array<FormItem>,
    values: JsonData,
    rules?: FormItemRule,
    labelCol?: { span: number },
    wrapperCol?: { span: number },
    button?: FormItemButton | null,
    submit?: (payload: JsonData) => PromiseResponse,
    jumpTo?: { name: string, params?: JsonData } | null,
  }
>(), {
    rules: () => ({}),
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

const emits = defineEmits<
  {
    (e: 'onValidated', payload: JsonData): void,
  }
>()

const state = ref(props.values)
const rules = ref(props.rules)

const { validate, validateInfos } = Form.useForm(state, rules)

const onSubmit = () => {
  const { button, submit, jumpTo } = props
  validate().then(() => {
    loading.value = true
    setTimeout(async () => {
      emits('onValidated', toRaw(state.value))
      if (submit) {
        const { ok, msg } = await submit(toRaw(state.value))
        if (!ok) {
          return
        }
        success(msg ?? `${button?.text || ''}成功`)
        jumpTo && router.push(jumpTo)
      }
      loading.value = false
    }, 2000)
  }).catch(() => {
    loading.value = false
  })
}
</script>

<template>
  <a-form :labelCol="labelCol" :wrapperCol="wrapperCol">
    <template v-if="items?.length > 0">
      <a-form-item
        v-for="(item, index) in items"
        :key="index"
        :label="item?.label || ''"
        v-bind="validateInfos[item.name]"
      >
        <a-input
          v-if="item.type === 'input'"
          :placeholder="item?.placeholder ? item.placeholder : item?.label ? `请输入${item.placeholder}` : '' "
          :size="item.size as FormItemSize || 'default'"
          v-model:value="(state as any)[item.name]"
        >
          <template #prefix v-if="item.prefix && item.prefix.type === 'icon'">
            <UserOutlined v-if="item.prefix?.value === 'UserOutlined'" class="icon-gray" />
            <LockOutlined v-if="item.prefix?.value === 'LockOutlined'" class="icon-gray" />
          </template>
        </a-input>
        <slot name="custom" v-if="item.type === 'custom'" :item="item" :state="state"></slot>
      </a-form-item>
    </template>
    <template v-if="button">
      <a-form-item>
        <a-button
          :type="(button as FormItemButton).type as FormItemButtonType"
          :size="(button as FormItemButton).size as FormItemSize"
          :block="(button as FormItemButton).block"
          :loading="loading"
          @click="onSubmit"
        >
          {{(button as FormItemButton).text}}
        </a-button>
      </a-form-item>
    </template>
  </a-form>
</template>

<style scoped>
.icon-gray {
  color: #ccc;
}
</style>
