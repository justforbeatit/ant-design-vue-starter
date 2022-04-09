export type AllowedHttpMethods = 'get' | 'post' | 'put' | 'delete'

export interface ApiConfig {
  [prop: string]: {
    [prop: string]: { url: string, method: AllowedHttpMethods }
  }
}

export interface ApiResponse<T = []> {
  ok: boolean,
  code: string | number,
  msg: string,
  data: T
}
