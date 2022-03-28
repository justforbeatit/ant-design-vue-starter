import { useRequest } from '@/utils/http/core'
import { ApiRequestMethods } from './api/type'

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
