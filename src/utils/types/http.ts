export type AllowedHttpMethods = 'get' | 'post' | 'put' | 'delete'

export interface ApiConfig {
  [prop: string]: {
    [prop: string]: { url: string, method: AllowedHttpMethods }
  }
}

type ApiResponseBase = { ok: boolean }

export interface ApiResponse<T = []> extends ApiResponseBase {
  code: string | number,
  msg: string,
  data: T
}
