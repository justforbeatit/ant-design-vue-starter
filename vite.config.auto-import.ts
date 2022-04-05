import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default function() {
  return [
    Components({
      resolvers: [
        AntDesignVueResolver(),
        (name) => {
          if (name.endsWith('Outlined')) {
            return { importName: name, path: '@ant-design/icons-vue' }
          }
        }
      ]
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          '@vueuse/core': [
            'createFetch',
            'useFullscreen',
            'useToggle',
            ['useStorage', 'vueuseStorage'],
            'StorageSerializers',
            'useEventListener',
          ],
          'pinia': [
            'storeToRefs'
          ],
          '@/utils/http/core': [
            'useRequest'
          ],
          '@/utils/storage': [
            'useStorage',
          ],
          '@/utils/message': [
            'success',
            'error',
            'warning'
          ],
        }
      ],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      dts: './auto-imports.d.ts',
    })
  ]
}
