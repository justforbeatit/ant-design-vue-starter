import type { BeforeFetchContext } from "@vueuse/core"
import config from './config'
import apis from '@/api'

type ApiResponseBase = { ok: boolean }

type AllowedHttpMethod = ['get', 'post', 'put', 'delete'][number]

type AllowedSerializer = 'formData' | 'json' extends infer F ?  F : never

export type FetchResult = { data: any, response: Response | null, error: any }

export interface ApiConfig {
  [prop: string]: {
    [prop: string]: {
      path: string, method: AllowedHttpMethod, serializeTo?: AllowedSerializer
    }
  }
}

export interface ApiResponse<T = JsonData[] | []> extends ApiResponseBase {
  code: string | number,
  msg: string,
  data: T,
  total?: number
}

export interface RequestConfig {
  baseUrl: string,
  headers: () => ({ Authorization: string }),
  serializeTo: AllowedSerializer,
  asFetchSuccess: (response: ApiResponse) => boolean,
  handleFetchError: (result: FetchResult) => void
}

export type ApiMapped<T, R, F> = {
  [P in keyof T]: T[P] extends infer U
    ? { [K in keyof U]: (params?: Record<string, string | number>) =>
      R extends infer X
        ? X extends false ? Promise<F> : Promise<ApiResponse<R>>
        : never
      }
    : never
}

export function defineApiConfig<T extends ApiConfig>(apis: T): T {
  return apis
}

export function defineRequestConfig<T extends RequestConfig>(options: T): T {
  return options
}

function $fetch(url: string, method: AllowedHttpMethod, data: JsonData = {}, to: AllowedSerializer | undefined) {
  const { baseUrl, headers, asFetchSuccess, handleFetchError, serializeTo } = config

  const playload = (): URLSearchParams | JsonData | undefined => {
    if (method === 'get') return undefined
    return (to ?? serializeTo) === 'formData' ? new URLSearchParams(data) : data
  }

  return new Promise((resolve: CallableFunction) => {
    createFetch({
      baseUrl: baseUrl,
      options: {
        beforeFetch({ options }: BeforeFetchContext) {
          return {
            options: {
              ...options,
              headers: headers()
            }
          }
        },
        onFetchError(ctx: FetchResult) {
          handleFetchError(ctx)
          return ctx
        }
      },
    })(url)[method](playload()).json().then(result => {
      resolve({ok: asFetchSuccess(result.data.value), ...result.data.value})
    })
  })
}

export function useRequest<R = JsonData[] | [], F = false>(): ApiMapped<typeof apis, R, F>

export function useRequest(): unknown {
  return new Proxy({
    $fetch
  }, {
    get(top, prop: string) {
      if (!(prop in apis)) {
        throw new Error(`The api ${prop} is not found, please ensure you have configured `)
      }
      return new Proxy((apis as ApiConfig)[prop], {
        get(current, api: string) {
          return (data: Json<unknown> = {}) => {
            const { method, path, serializeTo } = current[api]
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
            return top.$fetch(parseUrl(path), <AllowedHttpMethod>method, data, serializeTo)
          }
        }
      })
    }
  })
}
