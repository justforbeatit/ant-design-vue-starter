import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import type {ComponentResolverFunction} from 'unplugin-vue-components/types'

export default function() {
  return [
    Components({
      dirs: ['src/components'],
      resolvers: [
        AntDesignVueResolver(),
        ((name: string)  => {
          if (name.endsWith('Outlined')) {
            return { importName: name, path: '@ant-design/icons-vue' }
          }
        }) as ComponentResolverFunction
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
          '@/utils/modal': [
            'sure'
          ]
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
