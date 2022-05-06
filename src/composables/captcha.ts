import defaultCaptchaImage from '@/assets/captcha.png'

export default defineComponent({
  props: {
    style: {
      type: Object,
      default: () => ({ width: '100%', height: '100%', cursor: 'pointer' })
    }
  },
  emits: ['change'],
  setup({ style }, { emit }) {
    const src = ref(defaultCaptchaImage)

    const loadCaptchaImage = async () => {
      const { key, img } = await useRequest().auth.captcha()
      emit('change', { key, img })
      src.value = img
    }

    loadCaptchaImage()

    return () => h(
      'img',
      {
        src: src.value,
        style,
        onClick: loadCaptchaImage
      }
    )
  }
})
