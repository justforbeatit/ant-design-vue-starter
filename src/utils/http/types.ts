export type AllowedHttpMethods = 'get' | 'post' | 'put' | 'delete'

export interface ApiConfigOptions {
  [prop: string]: {
    [prop: string]: { url: string, method: AllowedHttpMethods }
  }
}

export interface ApiResponseReturn {
  code: string | number,
  msg: string,
  // eslint-disable-next-line
  data: Json<unknown> | Array<Json<unknown>>
}
