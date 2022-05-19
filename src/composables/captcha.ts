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
    secretKey: {
      type: String,
      default: ''
    },
    reload: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:secretKey', 'update:reload'],
  setup(props, { emit }) {
    const { title, style } = props
    const src = ref(defaultCaptchaImage)

    const loadCaptchaImage = async () => {
      const { key, img } = await useRequest<Captcha>().auth.captcha()
      src.value = img
      emit('update:secretKey', key)
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
