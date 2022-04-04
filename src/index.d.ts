import { ApiRequestMethods } from './api/type'
import { useStorage } from '@/utils/store'

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

declare module '@/utils/storage' {
  export function useStorage(): {
    token: (value?: undefined | null | string) => string | void
  }
}
