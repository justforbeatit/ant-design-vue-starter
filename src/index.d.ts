import { ApiRequestMethods } from './api/type'
import { useStorage } from '@/utils/storage'

declare global {
  type Json<T> = {
    [prop: string | number]: T
  }
  type JsonData = Json<any>
  type PromiseResponse = Promise<JsonData>
}

declare module '@/utils/http/core' {
  export function useRequest(): ApiRequestMethods
}

declare module '@/utils/store' {
  export function useStorage(): {
    token: (value?: undefined | null | string) => string | void
  }
}
