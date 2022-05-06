import type { ApiResponse } from "@/utils/http/core"
import type { CascaderProps } from "ant-design-vue/lib/vc-cascader"

export interface ApiRequestMethods {
  auth: {
    captcha: () => Promise<{ sensitive: string, key: string, img: string }>
    login: (payload: JsonData) => Promise<ApiResponse<{ token: string }>>,
    logout: () => Promise<ApiResponse>,
  },
  menu: {
    query: () => Promise<ApiResponse<MenuItem[]>>
  },
  coupon: {
    query: (params: JsonData) => Promise<ApiResponse>,
  },
  common: {
    provinces: () => Promise<ApiResponse<CascaderProps['options'][]>>,
    areas: (params: { pid: number | string }) => Promise<ApiResponse<CascaderProps['options'][]>>,
  }
}
