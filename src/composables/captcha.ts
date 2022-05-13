import defaultCaptchaImage from '@/assets/captcha.png'

export interface Captcha {
  key: string,
  img: string
  sensitive?: boolean,
}

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '换一张'
    },
    style: {
      type: Object,
      default: () => ({ width: '100%', height: '100%', cursor: 'pointer' })
    },
    reload: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const { title, style, reload } = toRefs(props)
    const src = ref(defaultCaptchaImage)

    const loadCaptchaImage = async () => {
      const { key, img } = await useRequest<Captcha>().auth.captcha()
      src.value = img
      emit('change', { key, img })
    }

    watch(reload, (shouldReload: boolean) => shouldReload && loadCaptchaImage())

    onMounted(() => loadCaptchaImage())

    return () => h(
      'img',
      {
        src: src.value,
        title,
        style,
        onClick: loadCaptchaImage
      }
    )
  }
})
