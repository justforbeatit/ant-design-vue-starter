import { useStorage } from '@/utils/store'

declare global {
  type Json<T> = {
    [prop: string | number]: T
  }
  type JsonData = Json<any>
  type AntComponent = keyof typeof import('ant-design-vue/lib/index')
  type EndWithOutlined<T extends string> = T extends `${infer P}Outlined` ? T : never
  type AntIcon = EndWithOutlined<keyof typeof import('@ant-design/icons-vue')>
}

declare module '@/utils/storage' {
  export function useStorage(): {
    token: (value?: undefined | null | string) => string | void
  }
}
