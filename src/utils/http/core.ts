import type { BeforeFetchContext } from "@vueuse/core"
import { baseUrl, authorization, asResponseOk, handleFetchResult } from '@/utils/http'
import apis from '@/api'

type ApiResponseBase = { ok: boolean }

export type AllowedHttpMethods = 'get' | 'post' | 'put' | 'delete'

export interface ApiConfig {
  [prop: string]: {
    [prop: string]: { url: string, method: AllowedHttpMethods }
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

export function httpClient(url: string, method: AllowedHttpMethods, data: JsonData = {}) {
  return new Promise((resolve: CallableFunction) => {
    createFetch({
      baseUrl: baseUrl(),
      options: {
        beforeFetch({ options }: BeforeFetchContext) {
          return {
            options: {
              ...options,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
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

export function useRequest<R = ApiResponse>(): ApiMapped<typeof apis, R>

export function useRequest(): unknown {
  return new Proxy({
    httpClient
  }, {
    get(top, prop: string) {
      if (!(prop in apis)) {
        throw new Error(`The api ${prop} is not found, please ensure you have configured `)
      }
      return new Proxy((apis as ApiConfig)[prop], {
        get(current, api: string) {
          return (data: Json<unknown> = {}) => {
            const { method, url } = current[api]
            const params:Set<string> = new Set()
            const parseUrl = (url: string): string => {
              Object.entries(data).forEach(item => {
                const [key, value] = item
                const replacement = `{${key}}`
                if (url.includes(replacement)) {
                  url = url.replace(replacement, <string>value);
                } else {
                  params.add(`${key}=${value}`)
                }
              })
              const queryString = [...params].join('&');
              return method === 'get' && queryString ? `${url}?${queryString}` : url
            }
            return top.httpClient(parseUrl(url), <AllowedHttpMethods>method, data)
          }
        }
      })
    }
  })
}
