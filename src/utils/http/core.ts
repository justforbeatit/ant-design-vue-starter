import type { AfterFetchContext, BeforeFetchContext, OnFetchErrorContext } from "@vueuse/core";
import {
  authorization, asResponseOk, useBaseUrl, asUnauthorized, onUnauthorized, asServerError, onServerError
} from '@/utils/http'
import apis from '@/api'

type ApiResponseBase = { ok: boolean }

export type AllowedHttpMethods = 'get' | 'post' | 'put' | 'delete'

export type PaginationResult = { total: number, data: JsonData[]}

export interface ApiConfig {
  [prop: string]: {
    [prop: string]: { url: string, method: AllowedHttpMethods }
  }
}

export interface ApiResponse<T = PaginationResult | []> extends ApiResponseBase {
  code: string | number,
  msg: string,
  data: T,
}

export function httpClient(url: string, method: AllowedHttpMethods, data: JsonData = {}) {
  return new Promise((resolve: CallableFunction) => {
    createFetch({
      baseUrl: useBaseUrl(),
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
        afterFetch(ctx: AfterFetchContext) {
          if (asUnauthorized(ctx)) {
            onUnauthorized()
          }
          return ctx
        },
        onFetchError(ctx: OnFetchErrorContext) {
          if (asServerError(ctx)) {
            onServerError()
          }
          return ctx
        }
      },
    })(url)[method](method !== 'get' ? data : undefined).json().then(result => {
      resolve({ok: asResponseOk(result.data.value), ...result.data.value})
    })
  })
}

export function useRequest(): JsonData {
  return new Proxy({
    httpClient
  }, {
    get(top, prop: string) {
      if (!(prop in apis)) {
        throw new Error(`The api ${prop} is not found, please ensure you have configured `)
      }
      return new Proxy(apis[prop], {
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
