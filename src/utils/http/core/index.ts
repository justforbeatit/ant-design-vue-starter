import type { AfterFetchContext, OnFetchErrorContext } from "@vueuse/core";
import { createFetch } from "@vueuse/core";
import {
  useHeaders, asResponseOk, useBaseUrl, asUnauthorized, onUnauthorized, asServerError, onServerError
} from '@/utils/http'
import type {AllowedHttpMethods} from "@/utils/http/types";
import apis from '@/api'

const httpClient = (url: string, method: AllowedHttpMethods, data: Json<unknown> = {}) => {
  return new Promise((resolve: CallableFunction) => {
    createFetch({
      baseUrl: useBaseUrl(),
      options: {
        beforeFetch( { options }) {
          return { options: {...options, headers: useHeaders()} }
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

// eslint-disable-next-line
export function useRequest(): Json<any> {
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
                if (url.includes(key)) {
                  url = url.replace(key, <string>value);
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
