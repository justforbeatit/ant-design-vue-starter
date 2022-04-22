import type { ApiRequestMethods } from './api/type'
import { useStorage } from '@/utils/store'

declare global {
  type Json<T> = {
    [prop: string | number]: T
  }
  type JsonData = Json<any>
  type AntComponent = keyof typeof import('ant-design-vue/lib/index')
  type AntIcon = keyof typeof import('@ant-design/icons-vue')
}

declare module '@/utils/http/core' {
  export function useRequest(): ApiRequestMethods
}

declare module '@/utils/storage' {
  export function useStorage(): {
    token: (value?: undefined | null | string) => string | void
  }
}
