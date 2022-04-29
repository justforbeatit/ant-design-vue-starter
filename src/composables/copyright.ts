export default defineComponent({
  setup() {
    const { VITE_APP_COPYRIGHT } = import.meta.env

    if (!VITE_APP_COPYRIGHT) {
      return () => ({})
    }

    const copyright = computed(() => {
      const year = new Date().getFullYear()
      return `Copyright © ${year} ${VITE_APP_COPYRIGHT}`
    })

    return () => {
      return h(
        'p',
        { style: { color: 'rgba(0,0,0,.45)', fontSize: '14px' } },
        copyright.value
      )
    }
  }
})
