export default defineComponent({
  props: {
    is: {
      type: String,
      required: true,
    },
  },
  setup({ is: component }) {
    const icon = defineAsyncComponent(async () => {
      return import('@ant-design/icons-vue').then(module => module[<AntIcon>component])
    })
    return () => h(icon)
  },
})
