import type {ApiResponseReturn} from "@/utils/http/types";
import type {AfterFetchContext, OnFetchErrorContext} from "@vueuse/core";
import {error, warning} from "../message";
import {useStorage} from "../storage";

export function useBaseUrl(): string {
  return import.meta.env.VITE_APP_URL
}

export function useHeaders() {
  return { Authorization: `Bearer ${useStorage().token()}` }
}

export function asResponseOk(response: ApiResponseReturn): boolean {
  return response?.code === 0
}

export function asUnauthorized(response: AfterFetchContext): boolean {
  return response.data?.code === 401
}

export function asServerError(response: OnFetchErrorContext): boolean {
  return response.data === null
}

export function onUnauthorized(): void {
  useStorage().token(null)
  warning("会话已失效，请重新登录")
  window.location.assign(`${useBaseUrl()}/auth/login`)
}

export function onServerError(): void {
  error('服务器繁忙，请稍后再试');
}
