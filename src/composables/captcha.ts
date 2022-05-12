import defaultCaptchaImage from '@/assets/captcha.png'

interface Captcha {
  sensitive: boolean,
  key: string,
  img: string
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
    }
  },
  emits: ['change'],
  setup({ title, style }, { emit }) {
    const src = ref(defaultCaptchaImage)

    const loadCaptchaImage = async () => {
      const { key, img } = await useRequest<Captcha>().auth.captcha()
      src.value = img
      emit('change', { key, img })
    }

    loadCaptchaImage()

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
