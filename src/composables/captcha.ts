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
      default: () => '换一张'
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
  emits: ['change', 'update:reload'],
  setup(props, { emit }) {
    const { title, style } = props
    const src = ref(defaultCaptchaImage)

    const loadCaptchaImage = async () => {
      const { key, img } = await useRequest<Captcha>().auth.captcha()
      src.value = img
      emit('change', { key, img })
    }

    watch(() => props.reload, (shouldReload: boolean) => {
      shouldReload && loadCaptchaImage()
      emit('update:reload', false)
    })

    onMounted(() => loadCaptchaImage())

    return () => h(
      'img',
      {
        src: src.value,
        title: title,
        style: style,
        onClick: loadCaptchaImage
      }
    )
  }
})
