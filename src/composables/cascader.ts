import 'ant-design-vue/es/cascader/style/index.css'
import type { PropType } from "vue"
import type { CascaderProps } from 'ant-design-vue'
import { Cascader } from "ant-design-vue"

export default defineComponent({
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    placeholder: {
      type: String as PropType<string>,
      default: '请选择'
    },
    style: {
      type: Object as PropType<object>,
      default: () => ({ minWidth: '300px' })
    },
    fetchOptions: {
      type: Function as PropType<() => Promise<CascaderProps['options'][]>>,
      required: true
    },
    fetchData: {
      type: Function as PropType<(targetValue: number | string) => Promise<CascaderProps['options'][]>>,
      required: true
    }
  },
  emits: ['update:modelValue', 'change'],
  setup({ fetchOptions, fetchData, modelValue, placeholder, style }, { emit }) {
    /*
    const options = ref<CascaderProps['options']>([])

    const loadData: CascaderProps['loadData'] = async (selectedOptions) => {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true
      const data = await fetchData(<number | string>targetOption.value) as CascaderProps['options'][]
      targetOption.children = <CascaderProps['options']>data
      targetOption.loading = false
    }

    onMounted(async () => {
      options.value = await fetchOptions() as CascaderProps['options']
    })
    */

    return () => h(Cascader, {
      //modelValue,
      options: [{ label: '测试', value: '1' }],
      //loadData,
      //placeholder,
      //style,
      //'onUpdate:modelValue': (value: string) => emit('update:modelValue', value),
    })
  }
})
