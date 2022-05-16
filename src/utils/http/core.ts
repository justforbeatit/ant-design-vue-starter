import type { BeforeFetchContext } from "@vueuse/core"
import { baseUrl, authorization, asResponseOk, handleFetchResult } from '@/utils/http'
import definedApi from '@/api'

type ApiResponseBase = { ok: boolean }

type AllowedHttpMethods = 'get' | 'post' | 'put' | 'delete'

type AllowedContentType = 'form' | 'json'

export interface ApiConfig {
  [prop: string]: {
    [prop: string]: {
      path: string, method: AllowedHttpMethods, contentType?: AllowedContentType
    }
  }
}

export interface ApiResponse<T = JsonData[] | []> extends ApiResponseBase {
  code: string | number,
  msg: string,
  data: T,
  total?: number
}

export type ApiMapped<T, R> = {
  [P in keyof T]: T[P] extends infer U
    ? { [K in keyof U]: (params?: Record<string, string | number>) => Promise<R> }
    : never
}

export function defineApiConfig<T extends () => ApiConfig>(apis: T): T {
  return apis
}

function useFetch(url: string, method: AllowedHttpMethods, data: JsonData = {}, type = 'form') {
  return new Promise((resolve: CallableFunction) => {
    createFetch({
      baseUrl: baseUrl(),
      options: {
        beforeFetch({ options }: BeforeFetchContext) {
          const contentType = (type: AllowedContentType) => {
            if (type === 'form') {
              return {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              }
            } else if (type === 'json') {
              return { 'Content-Type': 'application/json' }
            }
          }
          return {
            options: {
              ...options,
              headers: {
                ...contentType(type as AllowedContentType),
                ...authorization()
              }
            }
          }
        },
        onFetchError(ctx: { data: any, response: Response | null, error: any }) {
          handleFetchResult(ctx)
          return ctx
        }
      },
    })(url)[method](method !== 'get' ? data : undefined).json().then(result => {
      resolve({ok: asResponseOk(result.data.value), ...result.data.value})
    })
  })
}

const apis = definedApi()

export function useRequest<R = ApiResponse>(): ApiMapped<typeof apis, R>

export function useRequest(): unknown {
  return new Proxy({
    useFetch
  }, {
    get(top, prop: string) {
      if (!(prop in apis)) {
        throw new Error(`The api ${prop} is not found, please ensure you have configured `)
      }
      return new Proxy((apis as ApiConfig)[prop], {
        get(current, api: string) {
          return (data: Json<unknown> = {}) => {
            const { method, path } = current[api]
            const params:Set<string> = new Set()
            const parseUrl = (path: string): string => {
              Object.entries(data).forEach(item => {
                const [key, value] = item
                const replacement = `{${key}}`
                if (path.includes(replacement)) {
                  path = path.replace(replacement, <string>value);
                } else {
                  params.add(`${key}=${value}`)
                }
              })
              const queryString = [...params].join('&');
              return method === 'get' && queryString ? `${path}?${queryString}` : path
            }
            return top.useFetch(parseUrl(path), <AllowedHttpMethods>method, data)
          }
        }
      })
    }
  })
}
