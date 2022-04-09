import type { ApiResponse } from "@/utils/types/http"

export interface ApiRequestMethods {
  auth: {
    login: (payload: LoginInfo) => Promise<ApiResponse<{ token: string }>>,
    logout: () => Promise<ApiResponse>,
  },
  menu: {
    query: () => Promise<ApiResponse<MenuItem[]>>
  },
}
